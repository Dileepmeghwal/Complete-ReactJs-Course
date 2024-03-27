import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const message = [
  "Learn  React 👨‍💻",
  "Apply for jobs 👏",
  "Invest your new income 🎉🎊🍾",
];
export default function App() {
  return (
    <>
      <Step />
    
    </>
  );
}
function Step() {
  const [step, setStep] = useState(1);
  // const step = 1;
  const handleNext = () => {
    if (step >= message.length) {
      return;
    }
    setStep((pre) => pre + 1);
  };
  const handlePrev = () => {
    if (step <= 1) return;
    setStep((pre) => pre - 1);
  };
  return (
    <>
      <div className="steps ">
        <div className="numbers ">
          <div className={`${step >= 1 ? "active" : ""}`}>1</div>
          <div className={`${step >= 2 ? "active" : ""}`}>2</div>
          <div className={`${step >= 3 ? "active" : ""}`}>3</div>
        </div>

        <p className="message">
          Step {step} {message[step - 1]}
        </p>
        <div className="buttons">
          <button className="active" disabled={step === 1} onClick={handlePrev}>
            Previous
          </button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </>
  );
}
