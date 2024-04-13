import React, { useEffect, useRef } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineSaveAs } from "react-icons/md";
import { TbEdit } from "react-icons/tb";

function Task({
  task,
  handleComplete,
  handleEditTask,
  edit,
  editId,
  handleTaskDelete,
  updateTodo,
  update,
  setUpdate,
  setEdit,
  setEditId,
}) {
  const isCompleted = task?.isCompleted;

  const ref = useRef(null);

  useEffect(() => {
    ref.current?.focus();
  }, [edit, editId]);

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          console.log("closing");
          setEdit(false);
          setEditId(null);
          setUpdate("");
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [edit, editId]
  );

  return (
    <li className={`${isCompleted ? "completed" : ""}`}>
      <div className="flex-start">
        <input
          type="checkbox"
          name=""
          onChange={() => handleComplete(task)}
          checked={task?.isCompleted}
        />

        {edit && task?.id === editId ? (
          <input
            type="text"
            className="updateBx"
            value={update}
            onChange={(e) => setUpdate(e.target.value)}
            ref={ref}
          />
        ) : (
          <p style={{ color: isCompleted ? "#cdbea3" : "" }} className="title">
            {task.title}
          </p>
        )}
      </div>
      <div className="curd-btn">
        {edit && task.id === editId ? (
          <MdOutlineSaveAs size={25} onClick={updateTodo} />
        ) : (
          <TbEdit
            size={25}
            onClick={() => handleEditTask(task.id, task.title)}
          />
        )}

        <AiTwotoneDelete size={25} onClick={() => handleTaskDelete(task.id)} />
      </div>
    </li>
  );
}

export default Task;
