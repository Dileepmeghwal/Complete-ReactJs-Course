import React from "react";
import styles from "../components/Button.module.css";
const Button = ({ children, onClick, type }) => {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
