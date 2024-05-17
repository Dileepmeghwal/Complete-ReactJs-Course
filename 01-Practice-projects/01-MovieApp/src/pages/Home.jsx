import React, { useState } from "react";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useMovie } from "../context/useMovie";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <h1>Loading...</h1>
    </div>
  );
};
const Home = () => {
  const { movie, isLoading } = useMovie();
  console.log("movie", movie);

  if(isLoading) return <Loader/>
  return (
    <div className="container">
      <div className="row">
        {movie?.map((movie) => (
          <div className="col-xl-2 col-lg-3 col-md-2  h-100" key={movie.imdbID}>
            <div className="card">
              <img src={movie.Poster} alt="" className="img-fluid" />
              <div className="card-body">
                <h4>{movie.Title}</h4>
                <span>{movie.Year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
