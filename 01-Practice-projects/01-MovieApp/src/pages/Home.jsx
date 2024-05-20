import React, { useState } from "react";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useMovie } from "../context/useMovie";
import Watched from "../components/Watched";
import MovieDetails from "../components/MovieDetails";

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
  const [selected, setSelected] = useState(null);

  if (isLoading) return <Loader />;
  const handleSelected = (id) => {
    setSelected(id);
  };
  return (
    <div className="row">
      <div className="col-lg-5 col-md-5">
        <MovieList watched={movie} onSelected={handleSelected} />
      </div>
      <div className="col-lg-6 col-md-6">
        {selected ? (
          <MovieDetails selectedId={selected} />
        ) : (
          <Watched watched={tempMovieData} />
        )}
      </div>
    </div>
  );
};

export default Home;

const MovieList = ({ watched, onSelected }) => {
  return (
    <div className="movieList">
      <ul>
        {watched?.map((movie) => (
          <Movie movie={movie} key={movie.imdbID} onSelected={onSelected} />
        ))}
      </ul>
    </div>
  );
};

const Movie = ({ movie, onSelected }) => {
  const { Poster, Year, imdbID, Title } = movie;

  return (
    <li className="movie" onClick={() => onSelected(imdbID)}>
      <img src={Poster} alt={Title} />
      <div className="content">
        <h3>{Title}</h3>
        <span>{Year}</span>
      </div>
    </li>
  );
};
