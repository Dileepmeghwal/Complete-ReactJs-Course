import React, { useEffect, useState } from "react";

import Search from "./Search";
import { useMovie } from "../context/useMovie";
import { FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { movie } = useMovie();
  const { theme, toggleTheme } = useTheme();

  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Toggle the 'dark-mode' class on the body element
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <div className="row w-100 align-items-center">
            <div className="col-9">
              <Search />
            </div>
            <div className="col-3 d-flex align-items-center">
              <NumCount totalResult={movie.length} />

              <div className="darkmode m-0 mx-2">
                <FaMoon className="m-0" onClick={toggleDarkMode} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

const NumCount = ({ totalResult }) => {
  return <p className="mb-0"> Found {totalResult} result</p>;
};
