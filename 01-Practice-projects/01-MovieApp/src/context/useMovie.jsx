import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movie, setMovie] = useState([]);
  const [query, setQuery] = useState("inception");
  const [isLoading, setIsLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState([]);
  const [error, setError] = useState("");
  const KEY = "a57571f7";
  function handleChange(text) {
    setQuery(text);
  }

  useEffect(() => {
    setIsLoading(true);
    setError("");
    const getMovies = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();
        if (data.Response === "False") throw new Error("Movie not found 🚫");
        // console.log("response", data);
        setMovie(data?.Search);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setError("");

      return;
    }
    getMovies();
  }, [query]);

  const getMoviesDetails = async (id) => {
    try {
      setIsLoading(true);
      setError("")
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${id}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      // console.log("details", data);
      setMovieDetails(data);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movie,
        handleChange,
        isLoading,
        query,
        getMoviesDetails,
        movieDetails,
        setMovie,
        error,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

function useMovie() {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovie must be used within an MovieProvider");
  }
  return context;
}
export { MovieProvider, useMovie };


