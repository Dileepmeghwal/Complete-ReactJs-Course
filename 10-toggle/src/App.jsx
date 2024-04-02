import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Counter from "./components/Counter";
import Counterv2 from "./components/Counterv2";


function App() {
  const [count, setCount] = useState(0);

  function increment(value) {
    setCount(value);
  }

  

  return (
    <>
      {/* <Counter count={count} setCount={setCount} /> */}
      <Counter count={count} handleIncrement={increment} />

      {/* useCounter */}
      <Counterv2 />
    </>
  );
}

export default App;
