import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { MovieProvider } from "./context/useMovie.jsx";
import StarRating from "./components/StarRating.jsx";
import { ThemeProvider, useTheme } from "./context/ThemeContext.jsx";
import GlobalStyles from "./GlobalStyles.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <MovieProvider>
          <App />
        </MovieProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
