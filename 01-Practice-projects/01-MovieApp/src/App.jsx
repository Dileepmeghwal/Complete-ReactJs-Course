import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Recent from "./pages/Recent";
import Rated from "./pages/Rated";
import Movies from "./pages/Movies";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="recent" element={<Recent />} />
          <Route path="rate" element={<Rated />} />
          <Route path="movies" element={<Movies />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
