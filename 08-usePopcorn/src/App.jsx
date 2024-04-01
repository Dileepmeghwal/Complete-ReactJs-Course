import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import StarRating from "./components/StarRating";
import { useMovies } from "./hooks/useMovies";

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

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) => {
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
};
const KEY = "a57571f7";

function App() {
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("inception");
  const tempQuery = "interstellar";
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  // useEffect(() => {
  //   console.log("After initial render");
  // }, []);
  // useEffect(() => {
  //   console.log("After every render");
  // });

  // useEffect(() => {
  //   console.log("D");
  // }, [query]);

  // console.log("During render");

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleWatchList(watched) {
    setWatched((prev) => [...prev, watched]);
  }
  useEffect(() => {
    async function GetMovies() {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );

        if (!response.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await response.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        // setSelectedId(data.Search)

        // console.log(data);
      } catch (error) {
        // console.error(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setError("");
      setMovies([]);
      return;
    }
    GetMovies();
  }, [query]);

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
  const MovieDetails = ({ selectedId, onClose }) => {
    const countRef = useRef(0);

    useEffect(() => {
      document.addEventListener("keydown", function (e) {
        if (e.code === "Escape") {
          onClose();
          console.log("closing");
        }
      });
      console.log(countRef);
    });

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
                  {imdbRating} imdb Rating
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                <StarRating maxRating={10} size={24} />

                <button className="btn-add" onClick={handleWatched}>+ add watch list</button>
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
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
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

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check if the control key and '/' key are pressed simultaneously
      if (event.ctrlKey && event.key === "/") {
        // Focus on the input element
        inputEl.current.focus();
      }
    };

    // Add event listener to the window
    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    function callback(e) {
      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }

    // console.log(inputEl.current.autofocus);
    document.addEventListener("keydown", callback);
    return () => document.addEventListener("keydown", callback);
  }, []);

  // useEffect(() => {
  //   const el = document.querySelector(".search");
  //   console.log(el);

  //   el.focus();
  // }, []);

  return (
    <input
      className="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      placeholder="Search movies..."
      ref={inputEl}
    />
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
    <li onClick={() => handleSelectedMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title}`} />
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

const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

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

const WatchedMoviesList = ({ watched }) => {
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};

const WatchedMovie = ({ movie }) => {
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
      </div>
    </li>
  );
};
