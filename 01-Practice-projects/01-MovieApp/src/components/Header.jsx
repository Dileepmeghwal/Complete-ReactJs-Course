import React, { useEffect, useState } from "react";

import Search from "./Search";
import { useMovie } from "../context/useMovie";

const Header = () => {
  const { movie } = useMovie();
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <div className="row w-100 align-items-center">
            <div className="col-9">
              <Search />
            </div>
            <div className="col-3">
              <NumCount totalResult={movie.length} />
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
