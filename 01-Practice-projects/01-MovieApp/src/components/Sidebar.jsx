import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { BiCameraMovie } from "react-icons/bi";
import { IoTimeOutline } from "react-icons/io5";
import { IoIosStarOutline } from "react-icons/io";
import { GiFilmSpool } from "react-icons/gi";
import Header from "./Header";
const links = [
  {
    name: "Home",
    path: "/",
    icon: <FiHome />,
  },
  {
    name: "Recent",
    path: "/recent",
    icon: <IoTimeOutline />,
  },
  {
    name: "Top Rated",
    path: "/rate",
    icon: <IoIosStarOutline />,
  },
  {
    name: "Movies",
    path: "/movies",
    icon: <BiCameraMovie />,
  },
];
const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="wrapper">
      <div className="sidebar">
        <ul className="sidebar-nav">
          <div className="brand">
            <a className="navbar-brand" href="#">
              <GiFilmSpool />
            </a>
          </div>
          {links.map((item, index) => (
            <li key={index} className={pathname === item.path ? "active" : ""}>
              <Link to={item.path}>
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div id="main">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
