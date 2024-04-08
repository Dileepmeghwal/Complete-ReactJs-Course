import React from "react";
import { NavLink } from "react-router-dom";
import stylse from "../components/PageNav.module.css";
import Logo from "../components/Logo";

const PageNav = () => {
  return (
    <nav className={stylse.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={stylse.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
