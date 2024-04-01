import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useGatCurrency } from "./hooks/getCurrency";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");

  const { rate, isLoading, convertCurrency } = useGatCurrency(amount, from, to);

  return (
    <>
      <div className="app">
        <Amount amount={amount} setAmount={setAmount} />
        <Converter from={from} setFrom={setFrom} to={to} setTo={setTo} />
        <ConvertedAmount
          rate={rate}
          onConvert={convertCurrency}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}

export default App;

const Amount = ({ amount, setAmount }) => {
  return (
    <div className="amount">
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        name=""
        id=""
      />
    </div>
  );
};

const Converter = ({ from, setFrom, to, setTo }) => {
  const { currency } = useGatCurrency();

  return (
    <div className="converter">
      <Dropdown onChangeValue={setFrom} value={from} currency={currency} />
      <Dropdown onChangeValue={setTo} value={to} currency={currency} />
    </div>
  );
};

const ConvertedAmount = ({ rate, onConvert, isLoading }) => {
  const rates = rate;
  return (
    <div className="message">
      <h2>{isLoading ? "wait..." : rates}</h2>

      <button onClick={onConvert}>Convert</button>
    </div>
  );
};

const Dropdown = ({ value, onChangeValue, currency }) => {
  return (
    <select
      name=""
      id=""
      value={value}
      onChange={(e) => onChangeValue(e.target.value)}
    >
      {currency?.map((cur) => (
        <option value={cur} key={cur}>
          {cur}
        </option>
      ))}
    </select>
  );
};
