import React, { useEffect, useState } from "react";

import Search from "./Search";
import { useMovie } from "../context/useMovie";

const Header = () => {
  const { movie } = useMovie();
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Search />
          <p className=" w-25 text-center"> Found {movie && movie?.length}</p>
        </div>
      </nav>
    </header>
  );
};

export default Header;
