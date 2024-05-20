import React, { useEffect } from "react";
import { useMovie } from "../context/useMovie";
import Loader from "./Loader";

const MovieDetails = ({ selectedId }) => {
  const { getMoviesDetails, isLoading, movieDetails } = useMovie();

  useEffect(() => {
    if (selectedId) {
      getMoviesDetails(selectedId);
    }
  }, [selectedId]);

  const { Title, Genre, Poster, Realased } = movieDetails;

  return (
    <div className="movie-detail">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="back-btn">🔙</button>
          </header>
          <div className="details-overlay">
            <img src={Poster} width={'100px'} alt="" />
            <h2>{Title}</h2>
            <p>Realsed Date</p>
            <span>Gener</span>
            <p>
              <span>⭐⭐</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
