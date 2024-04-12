import { useEffect, useMemo, useReducer, useState } from "react";
import Calculator from "./Calculator";
import ToggleSounds from "./ToggleSound";

function reducer(state, action) {
  switch (action.type) {
    case "inc":
      return { count: state.count + 1 };

    case "dec":
      return { count: state.count - 1 };

    default:
      new Error("unexpected");
  }
}
function App() {
  const [allowSound, setAllowSound] = useState(true);
  const [time, setTime] = useState(formatTime(new Date()));

  const [state, dispatch] = useReducer(reducer, { count: 0 });

  // Will be be AM or PM
  const partOfDay = time.slice(-2);

  const workouts = useMemo(() => {
    return [
      {
        name: "Full-body workout",
        numExercises: partOfDay === "AM" ? 9 : 8,
      },
      {
        name: "Arms + Legs",
        numExercises: 6,
      },
      {
        name: "Arms only",
        numExercises: 3,
      },
      {
        name: "Legs only",
        numExercises: 4,
      },
      {
        name: "Core only",
        numExercises: partOfDay === "AM" ? 5 : 4,
      },
    ];
  }, [partOfDay]);

  function formatTime(date) {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  }

  useEffect(function () {
    const id = setInterval(function () {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <main>
      <p>Counter {state.count}</p>
      <button onClick={() => dispatch({ type: "inc" })}>inc</button>
      <button onClick={() => dispatch({ type: "dec" })}>dec</button>
      <h1>Workout timer</h1>
      <time>For your workout on {time}</time>
      <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
      <Calculator workouts={workouts} allowSound={allowSound} />
    </main>
  );
}

export default App;
