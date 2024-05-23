import React, { useEffect, useRef } from "react";
import { useMovie } from "../context/useMovie";

export const MovieList = ({ watched, onSelected }) => {
  return (
    <div className="movieList">
      <ul>
        {watched?.map((movie) => (
          <Movies movie={movie} key={movie.imdbID} onSelected={onSelected} />
        ))}
      </ul>
    </div>
  );
};

const Movies = ({ onSelected, movie }) => {
  const { Poster, Year, imdbID, Title } = movie;
  const { query } = useMovie();
  const liRef = useRef();

  useEffect(() => {
    const matched = query === Title;

    if (matched) {
      liRef.current.classList.add("highlight");
      console.log("got");
    }
    return () => {
      if (liRef.current) {
        liRef.current.classList.remove("hightlight");
      }
    };
  }, [query, Title]);
  return (
    <li className="movie" onClick={() => onSelected(imdbID)}>
      <img src={Poster} alt={Title} />
      <div className="content">
        <h3 ref={liRef}>{Title}</h3>
        <span>{Year}</span>
      </div>
    </li>
  );
};

export default Movies;
