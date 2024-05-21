import React, { useEffect, useState } from "react";
import { useMovie } from "../context/useMovie";
import Watched from "../components/Watched";
import MovieDetails from "../components/MovieDetails";
import WatchedSummary from "../components/WatchedSummary";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

const Home = () => {
  const { movie, setMovie, error, isLoading } = useMovie();
  const [selected, setSelected] = useState(null);
  const [watchedMovie, setWatchedMovie] = useState(() => {
    const storeMovie = localStorage.getItem("watchedMovie");
    return storeMovie ? JSON.parse(storeMovie) : [];
  });

  const handleSelected = (id) => {
    // setSelected((selectedId) => (id === selectedId ? null : id));
    setSelected((prevId) => (prevId === id ? null : id));
  };
  console.log(selected);
  const handleClose = () => {
    setSelected(null);
  };
  const handleAddMovie = (newMovie) => {
    setWatchedMovie((prev) => [...prev, newMovie]);
  };
  const onDelete = (id) => {
    console.log(id);
    setWatchedMovie((prev) => prev.filter((movie) => movie.imdbID !== id));
  };
  useEffect(() => {
    localStorage.setItem("watchedMovie", JSON.stringify(watchedMovie));
  }, [watchedMovie]);
  return (
    <div className="row overflow-hidden">
      <div className="col-lg-5 col-md-5">
        <MovieList watched={movie} onSelected={handleSelected} />
      </div>
      <div className="col-lg-6 col-md-6">
        {selected ? (
          <>
            <MovieDetails
              selectedId={selected}
              onClose={handleClose}
              onAddMovie={handleAddMovie}
              watchedMovie={movie}
            />
          </>
        ) : (
          <>
            <WatchedSummary watched={movie} />
            <Watched watched={watchedMovie} onDelete={onDelete}/>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

const MovieList = ({ watched, onSelected }) => {
  return (
    <div className="movieList ">
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
