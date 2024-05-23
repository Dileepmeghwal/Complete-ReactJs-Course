import { useEffect, useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Recent from "./pages/Recent";
import Rated from "./pages/Rated";
import Movies from "./pages/Movies";
import Layout from "./components/Layout";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { darkTheme, lightTheme } from "./theme";

function App() {
  const [isDark, setIsDark] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="recent" element={<Recent />} />
            <Route path="rate" element={<Rated />} />
            <Route path="movies" element={<Movies />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
