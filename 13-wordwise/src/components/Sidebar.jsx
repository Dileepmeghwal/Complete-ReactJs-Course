import React from "react";
import {Outlet} from "react-router-dom"
import Styles from "../components/Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";

const Sidebar = () => {
  return (
    <div className={Styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={Styles.footer}>
        <p className={Styles.copuright}>
          {" "}
          &copy; Copyright {new Date().getFullYear()} by Worldwise Inc.
        </p>
      </footer>
    </div>
  );
};

export default Sidebar;
