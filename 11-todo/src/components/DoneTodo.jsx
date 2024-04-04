import React from "react";

function DoneTodo({ length, completedTask }) {
  const msg = completedTask === length && completedTask !== 0;

  return (
    <div className="done-task">
      <div>
        <h2>Todo Done</h2>
        <span>
          {msg ? "Congratulation 🎉 you completed all task!" : "keep it up"}
        </span>
      </div>
      <div className="count-circle">
        <p>
          {completedTask}/{length}
        </p>
      </div>
    </div>
  );
}

export default DoneTodo;
