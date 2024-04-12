import logo from "./logo.svg";
import "./App.css";
import { memo, useCallback, useState } from "react";

function App() {
  return (
    <>
      <Test />
    </>
  );
}

export default memo(App);

function Test() {
  const [count, setCount] = useState(0);

  return (
    <div>
      count : {count}
      <button onClick={() => setCount((c) => c + 1)}>Count</button>
      <SlowComponent />
    </div>
  );
}

const SlowComponent = memo(() => {
  const word = Array.from({ length: 30000 }, () => "WORDs");

  return (
    <ul>
      {word.map((w, i) => (
        <li>
          {i} {w}
        </li>
      ))}
    </ul>
  );
}, []);
