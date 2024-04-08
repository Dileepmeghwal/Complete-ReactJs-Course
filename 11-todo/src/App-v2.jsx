import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IoMdAddCircle, IoMdAddCircleOutline } from "react-icons/io";
import { TbEdit, TbH1 } from "react-icons/tb";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineSaveAs } from "react-icons/md";
import { useEffect } from "react";
import InputBox from "./components/InputBox";
import TaskList from "./components/TaskList";
import DoneTodo from "./components/DoneTodo";
import { useLocalStorage } from "./hooks/useLocalStorage";

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
  const [taskList, setTaskList] = useLocalStorage("taskList", []);

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
    <>
      <div className="app">
        <DoneTodo length={taskLength} completedTask={completedTask} />

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
              setEdit={setEdit}
              setEditId={setEditId}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
