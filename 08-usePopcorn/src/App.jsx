import { useEffect, useRef, useState } from "react";

import "./App.css";
import StarRating from "./components/StarRating";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useKey } from "./hooks/useKey";

const average = (arr) => {
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
};
const KEY = "a57571f7";

function App() {
  const [query, setQuery] = useState("inception");

  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorage([], "watched");

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleWatchList(movie) {
    setWatched((prev) => [...prev, movie]);
  }

  function handleDeleteMovie(id) {
    console.log(id);
    setWatched((prev) => prev.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumCounts movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {/* {isLoading ? <Loading /> : <MoviesList movies={movies} />} */}
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MoviesList
              movies={movies}
              handleSelectedMovie={handleSelectedMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onClose={handleCloseMovie}
              onAddWatch={handleWatchList}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteMovie={handleDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;

const Navbar = ({ children }) => {
  return <nav className="nav-bar">{children}</nav>;
};

const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};
const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  useKey("/", function () {
    inputEl.current.focus();
  });
  useKey("Escape", function (e) {
    inputEl.current.blur();
  });

  return (
    <>
      <input
        className="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search movies..."
        ref={inputEl}
      />
    </>
  );
};

const NumCounts = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

const Main = ({ children }) => {
  return <main className="main">{children}</main>;
};

const Box = ({ children }) => {
  return (
    <div className="box">
      <button className="btn-toggle">+</button>
      {children}
    </div>
  );
};

const MoviesList = ({ movies, handleSelectedMovie }) => {
  return (
    <ul className="list">
      {movies.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          handleSelectedMovie={handleSelectedMovie}
        />
      ))}
    </ul>
  );
};

const Movie = ({ movie, handleSelectedMovie }) => {
  return (
    <li onClick={() => handleSelectedMovie(movie?.imdbID)}>
      <img src={movie.Poster} alt={`${movie?.Title}`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

const MovieDetails = ({ selectedId, onClose, onAddWatch, watched }) => {
  const countRef = useRef(0);
  let count = 0;
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  useEffect(() => {
    if (userRating) countRef.current += 1;
  }, [userRating, count]);

  const isWatched = watched
    .filter((movie) => movie.imdbID)
    .includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    imdbID,
  } = movie;

  // if (imdbRating > 8) [isTop, setIsTop] = useState(true);

  // if (imdbRating > 8) return <p>Greatest ever !</p>

  // const [isTop, setIsTop] = useState(imdbRating > 8);

  // useEffect(() => {
  //   console.log(isTop);
  // }, [imdbRating]);

  const isTop = imdbRating > 8;
  // console.log(isTop);

  const [avgRating, setAvgRating] = useState(0);

  function handleAdd() {
    const newWatchedMovies = {
      imdbRating: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split("").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
      count,
      imdbID,
    };
    onAddWatch(newWatchedMovies);
    onClose();

    setAvgRating(Number(imdbRating));
    setAvgRating((avgRating) => (avgRating + userRating) / 2);
  }

  useKey("Escape", function () {
    onClose();
  });

  useEffect(() => {
    const getMoviesDetails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res?.json();
        console.log(data);
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getMoviesDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = `usePopcorn`;
      // console.log(`Clean up effect for movie ${title}`);
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating ?? imdbRating} imdb Rating
              </p>
            </div>
          </header>
          <p>{avgRating}</p>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    onSetRating={setUserRating}
                    maxRating={10}
                    size={24}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + add watch list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Direct by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  console.log("avgImdbRating", avgImdbRating);
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

const WatchedMoviesList = ({ watched, onDeleteMovie }) => {
  console.log("watched", watched);
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie?.imdbID}
          onDeleteMovie={onDeleteMovie}
        />
      ))}
    </ul>
  );
};

const WatchedMovie = ({ movie, onDeleteMovie }) => {
  console.log("WatchedMovie", movie);
  return (
    <li>
      <img src={movie.poster} alt={`${movie.Title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteMovie(movie?.imdbID)}
        >
          ✖️
        </button>
      </div>
    </li>
  );
};

function Loading() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>🌋</span>
      {message}
    </p>
  );
}
