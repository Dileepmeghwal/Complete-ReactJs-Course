import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [advice, setAdvice] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getAdvice();
  }, []);

  async function getAdvice() {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    console.log(data.slip.advice);
    setAdvice(data.slip.advice);
    setCount((prev) => prev + 1);
  }

  return (
    <>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>Get Advice</button>
      <Message count={count} />
    </>
  );
}

export default App;

const Message = ({ count }) => {
  return (
    <p>
      You have read{" "}
      <span>
        <b>${count}</b>
      </span>{" "}
      piece of code.
    </p>
  );
};
