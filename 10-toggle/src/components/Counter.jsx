import React from "react";

const Counter = ({ count, setCount, handleIncrement }) => {
  function increment() {
    // setCount((preCount) => preCount + 1);
    handleIncrement((prev) => prev + 1);
  }

  function decrement() {
    if (count <= 0) return;
    setCount((prev) => prev - 1);
  }
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      {/* <button onClick={decrement}>Decrement</button> */}
    </div>
  );
};

export default Counter;
