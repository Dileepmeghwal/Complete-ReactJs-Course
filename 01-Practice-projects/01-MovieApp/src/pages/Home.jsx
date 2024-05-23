import React, { useEffect, useState } from "react";
import { useMovie } from "../context/useMovie";
import Watched from "../components/Watched";
import MovieDetails from "../components/MovieDetails";
import WatchedSummary from "../components/WatchedSummary";
import Movies, { MovieList } from "./Movies";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

const Home = () => {
  const { movie, error, query, isLoading } = useMovie();
  const [selected, setSelected] = useState(null);
  const [watchedMovie, setWatchedMovie] = useState(() => {
    const storeMovie = localStorage.getItem("watchedMovie");
    return storeMovie ? JSON.parse(storeMovie) : [];
  });

  const handleSelected = (id) => {
    setSelected((prevId) => (prevId === id ? null : id));
  };

  const handleClose = () => {
    setSelected(null);
  };
  const handleAddMovie = (newMovie) => {
    setWatchedMovie((prev) => [...prev, newMovie]);
  };
  const onDelete = (id) => {
    setWatchedMovie((prev) => prev.filter((movie) => movie.imdbID !== id));
  };
  useEffect(() => {
    localStorage.setItem("watchedMovie", JSON.stringify(watchedMovie));
  }, [watchedMovie]);

  // useEffect(() => {
  //   console.log("After initial render");
  // }, []);
  // useEffect(() => {
  //   console.log("every render");
  // });

  // useEffect(() => {
  //   console.log("D render");
  // }, [query]);


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
            <Watched watched={watchedMovie} onDelete={onDelete} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
