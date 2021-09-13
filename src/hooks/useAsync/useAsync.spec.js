import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { useAsync } from './useAsync';

console.error = () => null;

const promiseResolve = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve('valid_response');
  });
})

const promiseReject = () => new Promise((_resolve, reject) => {
  setTimeout(() => {
    reject('error_response');
  });
})

const makeSut = 
  (
    asyncFunction = promiseResolve,
    immediate = false,
  ) => {

  const TargetComponent = () => {
    const { execute, status, value, error } = useAsync(asyncFunction, immediate);

    return (
      <div>

        <div data-testid='status'>
          {status}
        </div>

        <div data-testid='value' value={value}>
          {value}
          {!value && 'empty'}
        </div>

        <div data-testid='error'>
          {error}
          {!error && 'empty'}
        </div>

        <button onClick={execute} disabled={status === "pending"} />

      </div>
    )
  }

  return ({
    TargetComponent,
  })
}

describe('useAsync hook', () => {
  describe('status', () => {
    it('Should start with idle status if immediate = false', () => {
      const { TargetComponent } = makeSut();
      const { queryByTestId } = render(<TargetComponent />);
      expect(queryByTestId('status')).toHaveTextContent('idle');
    })

    it('Should start with pending status if immediate = true', () => {
      const { TargetComponent } = makeSut(promiseResolve, true);
      const { queryByTestId } = render(<TargetComponent />);
      expect(queryByTestId('status')).toHaveTextContent('pending');
    })

    it('Should set status to pending when called and value and error to null', async () => {
      const { TargetComponent } = makeSut();
      const { getByRole, queryByTestId } = render(<TargetComponent />);
      userEvent.click(getByRole('button'));
      expect(queryByTestId('status')).toHaveTextContent('pending');
      await waitFor(() => expect(queryByTestId('value')).toHaveTextContent('empty'));
      await waitFor(() => expect(queryByTestId('error')).toHaveTextContent('empty'));
    })

    it('Should set status to success on successfully fetching the data', async () => {
      const { TargetComponent } = makeSut();
      const { getByRole, queryByTestId } = render(<TargetComponent />);
      userEvent.click(getByRole('button'));
      await waitFor(() => expect(queryByTestId('status')).toHaveTextContent('success'));
    })

    it('Should set status to error when fail to fetch the data', async () => {
      const { TargetComponent } = makeSut(promiseReject);
      const { getByRole, queryByTestId } = render(<TargetComponent />);
      userEvent.click(getByRole('button'));
      await waitFor(() => expect(queryByTestId('status')).toHaveTextContent('error'));
    })
  })

  describe('value & error', () => {
    it('Should show value and set error to null when successfully fetching the data', async () => {
      const { TargetComponent } = makeSut();
      const { getByRole, queryByTestId } = render(<TargetComponent />);
      userEvent.click(getByRole('button'));
      await waitFor(() => expect(queryByTestId('value')).toHaveTextContent('valid_response'));
      await waitFor(() => expect(queryByTestId('error')).toHaveTextContent('empty'));
    })

    it('Should show error and set value to null when fail to fetch the data', async () => {
      const { TargetComponent } = makeSut(promiseReject);
      const { getByRole, queryByTestId } = render(<TargetComponent />);
      userEvent.click(getByRole('button'));
      await waitFor(() => expect(queryByTestId('error')).toHaveTextContent('error_response'));
      await waitFor(() => expect(queryByTestId('value')).toHaveTextContent('empty'));
    })
  })
})