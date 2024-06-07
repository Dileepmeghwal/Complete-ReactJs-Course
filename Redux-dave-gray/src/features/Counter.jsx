import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "./counterSlice";

export const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <section>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(decrement())}>Dec</button>
        <button onClick={() => dispatch(increment())}>Inc</button>
        <button onClick={() => dispatch(incrementByAmount())}>IncrementByAmount</button>
      </div>
    </section>
  );
};
