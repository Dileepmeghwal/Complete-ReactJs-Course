import React from "react";
import Task from "./Task";

function TaskList({
  tasklist,
  handleComplete,
  handleEditTask,
  editId,
  handleTaskDelete,
  edit,
  update,
  setUpdate,
  updateTodo,
  setEdit,
  setEditId,
}) {
  return (
    <ul>
      {tasklist &&
        tasklist.map((task) => (
          <Task
            task={task}
            key={task.id}
            handleComplete={handleComplete}
            handleEditTask={handleEditTask}
            editId={editId}
            edit={edit}
            handleTaskDelete={handleTaskDelete}
            updateTodo={updateTodo}
            update={update}
            setUpdate={setUpdate}
            setEdit={setEdit}
            setEditId={setEditId}
          />
        ))}
    </ul>
  );
}

export default TaskList;
