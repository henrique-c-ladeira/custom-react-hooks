import React, { useState } from 'react';
import { useUpdateEffect } from '../hooks/useUpdateEffect';

export const UseUpdateEffectExample = () => {
  const [count, setCount] = useState(10);
  useUpdateEffect(() => alert(count), [count]);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(c => c + 1)}> Increment </button>
    </div>
  )
}