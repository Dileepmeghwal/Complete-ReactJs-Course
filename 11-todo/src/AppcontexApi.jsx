import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IoMdAddCircle, IoMdAddCircleOutline } from "react-icons/io";
import { TbEdit, TbH1 } from "react-icons/tb";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineSaveAs } from "react-icons/md";
import { useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react";

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

// CREATE CONTEXT
const TodoContext = createContext();
function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(() => {
    const storedTasks = localStorage.getItem("taskList");
    return JSON.parse(storedTasks) || [];
  });
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [update, setUpdate] = useState("");
  const [selectAllChecked, setSelectAllChecked] = useState(false);
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

    // inputEl.current.focus();
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
      setUpdate(""); // Reset the update state to an empty title
    }
  }

  const completedTask = taskList.filter(
    (item) => item.isCompleted === true
  ).length;
  const taskLength = taskList.length;

  const handleClearAll = () => {
    setTaskList([]);
    setSelectAllChecked(!selectAllChecked);
  };

  useEffect(() => {
    const allTasksCompleted = taskList.every((task) => task.isCompleted);
    // console.log(allTasksCompleted);
    setSelectAllChecked(allTasksCompleted);
  }, [taskList]);

  const handleSelectAllChange = () => {
    setTaskList(
      taskList.map((task) => ({
        ...task,
        isCompleted: !selectAllChecked,
      }))
    );
    setSelectAllChecked((prevState) => !prevState);
  };
  return (
    <TodoContext.Provider
      value={{
        task,
        setTask,
        length: taskLength,
        addTask,
        taskList,
        handleClearAll: handleClearAll,
        handleComplete: handleComplete,
        handleEditTask: handleEditTask,
        handleTaskDelete: handleTaskDelete,
        handleSelectAllChange: handleSelectAllChange,
        edit,
        update,
        updateTodo,
        editId,
        setEdit,
        setEdit,
        setUpdate,
        completedTask,
      }}
    >
      <div className="app">
        <DoneTodo />

        <div className="controler">
          {taskLength > 1 && (
            <>
              <div className="complete-all">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={
                    taskLength <= 0 ? !selectAllChecked : selectAllChecked
                  }
                  onChange={handleSelectAllChange}
                />
                <label htmlFor="">Complete All</label>
              </div>
              <div className="delete-all">
                <button onClick={handleClearAll}>Clear task</button>
              </div>
            </>
          )}
        </div>
        <div className="add-task">
          <InputBox />
        </div>

        {taskList.length <= 0 ? (
          <div className="msg">
            <h3 color="#f8d">Add Task 📝</h3>
          </div>
        ) : (
          <div className="task-list">
            <TaskList />
          </div>
        )}
      </div>
    </TodoContext.Provider>
  );
}

export default App;

function DoneTodo() {
  const { length, completedTask } = useContext(TodoContext);
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

function InputBox() {
  const { task, setTask, addTask } = useContext(TodoContext);
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
function AddTodo() {
  return (
    <div className="add-btn">
      <button type="submit">
        <IoMdAddCircleOutline size={30} color="#f8f8f8" />
      </button>
    </div>
  );
}

function TaskList() {
  // CONSUME CONTEXT
  const { taskList } = useContext(TodoContext);
  // console.log(a);
  return (
    <ul>
      {taskList && taskList.map((task) => <Task task={task} key={task.id} />)}
    </ul>
  );
}

function Task({ task }) {
  const isCompleted = task?.isCompleted;
  const {
    updateTodo,
    handleEditTask,
    handleComplete,
    edit,
    setEdit,
    editId,
    setEditId,
    update,
    setUpdate,
    handleTaskDelete,
  } = useContext(TodoContext);

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
          <button>
            <MdOutlineSaveAs size={25} onClick={updateTodo} />
          </button>
        ) : (
          <button disabled={isCompleted}>
            <TbEdit
              size={25}
              onClick={() => handleEditTask(task.id, task.title)}
            />
          </button>
        )}

        <AiTwotoneDelete size={25} onClick={() => handleTaskDelete(task.id)} />
      </div>
    </li>
  );
}
