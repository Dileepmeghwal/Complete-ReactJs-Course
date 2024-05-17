import React from "react";
import { useMovie } from "../context/useMovie";

const Search = () => {
  const { query, movie, isLoading, handleChange } = useMovie();
  const handleSearch = (e) => {
    handleChange(e.target.value);
  };
  return (
    <input
      type="search"
      value={query}
      onChange={handleSearch}
      className="form-control"
      name=""
      id=""
    />
  );
};

export default Search;
