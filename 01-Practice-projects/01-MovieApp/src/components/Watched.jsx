import React from "react";
import { useMovie } from "../context/useMovie";
import { MdOutlineDelete } from "react-icons/md";

const Watched = ({ watched, onDelete }) => {
  // console.log("just add ", watched);
  return (
    <ul className="list-of-watched">
      {watched?.map((watched) => (
        <WatchedMovieList
          watched={watched}
          key={watched.imdbID}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default Watched;

const WatchedMovieList = ({ watched, onDelete }) => {
  const { poster, title, year, imdbID } = watched;

  return (
    <li className="watched">
      <img src={poster} alt="" />
      <div className="mx-3">
        <h6 className="mb-0">{title}</h6>
        <span>{year}</span>
      </div>
      <div>
        <button className="add-btn" onClick={() => onDelete(imdbID)}>
          <MdOutlineDelete />
        </button>
      </div>
    </li>
  );
};
