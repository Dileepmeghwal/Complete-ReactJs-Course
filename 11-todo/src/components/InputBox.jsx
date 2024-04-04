import React, { useEffect, useRef } from "react";
import AddTodo from "./AddTodo";

function InputBox({ task, setTask, addTask, editId, edit }) {
  const inputEl = useRef(null);
  function handleSubmitTask(e) {
    e.preventDefault();

    if (task.trim() == "") return;

    addTask();
    setTask("");
  }

  useEffect(() => {
    function callback(e) {
      if (e.code === "Enter") {
        inputEl.current.focus();
      }
    }

    // console.log(inputEl.current.autofocus);
    document.addEventListener("keydown", callback);
    return () => document.addEventListener("keydown", callback);
  }, []);

  return (
    <form className="inputbox" onSubmit={handleSubmitTask}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Write your tast..."
        ref={inputEl}
      />
      <AddTodo />
    </form>
  );
}

export default InputBox;
