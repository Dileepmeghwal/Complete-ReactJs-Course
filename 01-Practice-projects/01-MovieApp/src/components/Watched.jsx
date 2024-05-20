import React from "react";

const Watched = ({ watched }) => {
  console.log("watched", watched);
  return (
    <ul className="list-of-watched">
      {watched.map((watched) => (
        <WatchedMovieList watched={watched} key={watched.imdbID} />
      ))}
    </ul>
  );
};

export default Watched;

const WatchedMovieList = ({ watched }) => {
  const { Poster, Title, Year, imdbID } = watched;
  return (
    <li className="watched">
      <img src={Poster} alt="" />
      <div>
        <h4>{Title}</h4>
        <span>{Year}</span>
      </div>
    </li>
  );
};
