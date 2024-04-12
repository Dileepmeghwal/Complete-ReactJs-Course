import React from "react";
import AppNav from "../components/AppNav";
import Sidebar from "../components/Sidebar";
import Styles from "../pages/AppLayout.module.css";
import Map from "../components/Map";
import User from "../components/User";
import ProtectedRoute from "./ProtectedRoute";
const AppLayout = () => {
  return (
    <ProtectedRoute>
      <div className={Styles.app}>
        <Sidebar />
        <Map />
        <User />
      </div>
    </ProtectedRoute>
  );
};

export default AppLayout;
