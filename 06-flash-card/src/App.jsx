import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const questions = [
  {
    id: 201,
    question: "What are the features of React?",
    answar:
      " It is used with React to describe what the user interface should look like code.",
  },
  {
    id: 202,
    question: "What is JSX?",
    answar:
      "JSX is a syntax extension of JavaScript. It is used with React to describe what the user interface should look like. ",
  },
  {
    id: 203,
    question: "Can web browsers read JSX directly? ",
    answar:
      "Web browsers cannot read JSX directly. This is because they are built to only read regular JS objects and JSX is not a regular JavaScript object ",
  },
  {
    id: 204,
    question: ". What is the virtual DOM?",
    answar:
      "DOM stands for Document Object Model. The DOM represents an HTML document with a logical tree structure. Each branch of the tree ends in a node, and each node contains objects.",
  },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FlashCard />
    </>
  );
}

export default App;

const FlashCard = () => {
  const [selected, setSelected] = useState(null);

  const handleSelected = (id) => {
    setSelected(id !== selected ? id :null);
  };
  return (
    <div className="flsahcard ">
      {questions.map((card) => (
        <div
          className={card.id === selected ? "card selected" : "card"}
          onClick={() => handleSelected(card.id)}
        >
          <p>{card.id === selected ? card.answar : card.question}</p>
        </div>
      ))}
    </div>
  );
};
