import { useState } from "react"

export const useArray = (defaultValue) => {
  const [array, setArray] = useState(defaultValue);

  const push = (value) => {
    setArray([...array, value]);
  };

  const filter = (callback) => {
    setArray(prev => prev.filter(callback));
  };

  const update = (index, value) => {
    setArray(a => [
      ...a.slice(0, index),
      value,
      ...a.slice(index + 1, a.length - 1)
    ]);
  };

  const remove = (index) => {
    setArray(a => [
      ...a.slice(0, index),
      ...a.slice(index + 1, a.length - 1)
    ]);
  }

  const clear = () => {
    setArray([])
  };

  return { array, set: setArray, push, filter, update, remove, clear };

}