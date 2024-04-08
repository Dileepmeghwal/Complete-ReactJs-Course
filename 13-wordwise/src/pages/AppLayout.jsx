import React from "react";
import AppNav from "../components/AppNav";
import Sidebar from "../components/Sidebar";
import Styles from "../pages/AppLayout.module.css";
import Map from "../components/Map";
const AppLayout = () => {
  return (
    <div className={Styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
};

export default AppLayout;
