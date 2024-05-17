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
        </div>
      </nav>
      Length {movie && movie?.length}
    </header>
  );
};

export default Header;
