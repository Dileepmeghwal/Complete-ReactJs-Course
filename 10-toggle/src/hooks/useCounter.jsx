import { useState } from "react";

export const useCounter = (value) => {
  const [counter, setCounter] = useState(value);

  function increment() {
    setCounter((c) => c + 1);
  }
  function decrement() {
    if (counter <= 0) return;
    setCounter((d) => d - 1);
  }

  return [counter, increment, decrement];
};
