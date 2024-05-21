import React, { useEffect } from "react";
import { useMovie } from "../context/useMovie";

import { IoArrowBackSharp } from "react-icons/io5";
import StarRating from "./StarRating";
import Error from "./Error";
import Loader from "./Loader";

const MovieDetails = ({ watchedMovie, selectedId, onClose, onAddMovie }) => {
  const { getMoviesDetails, isLoading, movieDetails, movie, error } =
    useMovie();


  useEffect(() => {
    if (selectedId) {
      getMoviesDetails(selectedId);
    }
  }, [selectedId]);

  const {
    Title: title,
    Genre: genre,
    Poster: poster,
    Released: released,
    Plot: plot,
    Actors: actors,
    Director: director,
    Runtime: runtime,
    imdbRating,
    Year: year,
    imdbID,
  } = movieDetails;

  const isWatched = watchedMovie
    .filter((watched) => watched.imdbID)
    .includes(selectedId);

  console.log(isWatched);

  const addWatchedMovie = () => {
    const newAddMovie = {
      imdbRating: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split("").at(0)),
      imdbID,
    };
    onAddMovie(newAddMovie);
    onClose();
  };

  useEffect(() => {
    if (!title) return;
    document.title = `${title}`;

    return () => {
      document.title = "useMovie";
      console.log(`Clean up effect for movie ${title}`);
    };
  }, [title]);

  return (
    <div className="movie-detail">
      {isLoading && <Loader />}
      {error && <Error error={error} />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="back-btn" onClick={onClose}>
              <IoArrowBackSharp size={20} />
            </button>
          </header>
          <div className="details-overlay ">
            <div className="d-flex ">
              <div>
                <img src={poster} width={"90px"} alt="" />
              </div>
              <div>
                <h5>{title}</h5>
                <p>
                  ⌚ {released} &bull; {runtime}
                </p>
                <span>{genre}</span>
                <p>
                  <span>⭐⭐</span>
                  {imdbRating} imdb Rating
                </p>
              </div>
            </div>
            <section>
              <div className="rating">
                {isWatched ? (
                  <p>
                    <em>You already watched.</em>
                  </p>
                ) : (
                  <>
                    <StarRating maxRating={10} size={4}/>
                    <button className="add-btn" onClick={addWatchedMovie}>
                      + Add watch list
                    </button>
                  </>
                )}
              </div>
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring: {actors}</p>
              <p>Direct by: {director}</p>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
