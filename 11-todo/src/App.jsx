import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IoMdAddCircle, IoMdAddCircleOutline } from "react-icons/io";
import { TbEdit, TbH1 } from "react-icons/tb";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineSaveAs } from "react-icons/md";
import { useEffect } from "react";

const initialTasks = [
  {
    id: 11,
    title: "Task 1",
    isCompleted: false,
  },
  {
    id: 113,
    title: "Task 2",
    isCompleted: true,
  },
];
function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(() => {
    const storedTasks = localStorage.getItem("taskList");
    return JSON.parse(storedTasks) || [];
  });
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [update, setUpdate] = useState("");
  const addTask = () => {
    setTaskList((prevTask) => [
      ...prevTask,
      { id: Date.now(), title: task, isCompleted: false },
    ]);
  };
  console.log(taskList);

  function handleComplete(task) {
    console.log(task);
    setTaskList((tasklist) =>
      tasklist.map((item) =>
        item.id === task.id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  }

  function handleEditTask(id, task) {
    console.log(id, task);
    setEdit(true);
    setEditId(id);
    setUpdate(task);
  }

  function handleTaskDelete(id) {
    setTaskList((prevTask) => prevTask.filter((task) => task.id !== id));
  }

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  function updateTodo() {
    if (!update) return;

    if (edit && editId) {
      setTaskList((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, title: update } : item
        )
      );
      setEdit(false);
      setEditId(null);
      setUpdate("");
    }
  }

  const completedTask = taskList.filter(
    (item) => item.isCompleted === true
  ).length;
  const taskLength = taskList.length;

  const handleClearAll = () => {
    setTaskList([]);
  };

  const handleCompleteAll = () => {
    setTaskList((prev) => prev.map((item) => ({ ...item, isCompleted: true })));
  };

  return (
    <>
      <div className="app">
        <DoneTodo length={taskLength} completedTask={completedTask} />

        <div className="controler">
          <div className="complete-all">
            <input type="checkbox" name="" id="" onClick={handleCompleteAll} />
            <label htmlFor="">Complete All</label>
          </div>
          <div className="delete-all">
            <button onClick={handleClearAll}>Clear task</button>
          </div>
        </div>
        <div className="add-task">
          <InputBox task={task} setTask={setTask} addTask={addTask} />
        </div>

        {taskList.length <= 0 ? (
          <div className="msg">
            <h3 color="#f8d">Add Task 📝</h3>
          </div>
        ) : (
          <div className="task-list">
            <TaskList
              tasklist={taskList}
              handleComplete={handleComplete}
              handleEditTask={handleEditTask}
              editId={editId}
              edit={edit}
              task={task}
              setTask={setTask}
              handleTaskDelete={handleTaskDelete}
              updateTodo={updateTodo}
              update={update}
              setUpdate={setUpdate}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;

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

function InputBox({ task, setTask, addTask, editId, edit }) {
  function handleSubmitTask(e) {
    e.preventDefault();

    if (task.trim() == "") return;

    addTask();
    setTask("");
  }

  return (
    <form className="inputbox" onSubmit={handleSubmitTask}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Write your tast..."
      />
      <AddTodo />
    </form>
  );
}
function AddTodo() {
  return (
    <div className="add-btn">
      <button type="submit">
        <IoMdAddCircleOutline size={30} color="#f8f8f8" />
      </button>
    </div>
  );
}

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
          />
        ))}
    </ul>
  );
}

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
}) {
  const isCompleted = task?.isCompleted;

  return (
    <li className={`${isCompleted ? "completed" : ""}`}>
      <div className="flex-start">
        <input
          type="checkbox"
          name=""
          onClick={() => handleComplete(task)}
          defaultChecked={task.isCompleted}
        />

        {edit && task.id === editId ? (
          <input
            type="text"
            className="updateBx"
            value={update.title}
            onChange={(e) => setUpdate(e.target.value)}
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
          <TbEdit size={25} onClick={() => handleEditTask(task.id, task)} />
        )}

        <AiTwotoneDelete size={25} onClick={() => handleTaskDelete(task.id)} />
      </div>
    </li>
  );
}
