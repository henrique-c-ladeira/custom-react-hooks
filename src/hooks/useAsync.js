import { useCallback, useEffect, useState } from "react"

const IDLE = 'idle';
const PENDING = 'pending';
const SUCCESS = 'success';
const ERROR = 'error';

export const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState(IDLE);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(() => {
    setStatus(PENDING);
    setValue(null);
    setError(null);

    return asyncFunction()
      .then((response) => {
        setValue(response);
        setStatus(SUCCESS);
      })
      .catch((error) => {
        setError(error);
        setStatus(ERROR);
      })
  }, [asyncFunction]);

  useEffect(() => {
    immediate && execute();
  }, [execute, immediate]);

  return { execute, status, value, error };

}