import React from "react";
import { useCounter } from "../hooks/useCounter";

const Counterv2 = () => {
  const [counter, increment, decrement] = useCounter(0);
  return (
    <div>
      <h1>useCounter {counter}</h1>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  );
};

export default Counterv2;
