import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movie, setMovie] = useState([]);
  const [query, setQuery] = useState("inception");
  const [isLoading, setIsLoading] = useState(false);
  const KEY = "a57571f7";
  function handleChange(text) {
    setQuery(text);
  }

  useEffect(() => {
    setIsLoading(true);
    const getMovies = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        const data = await response.json();
        console.log("response", data);
        setMovie(data.Search);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, [query]);

  return (
    <MovieContext.Provider
      value={{
        movie,
        handleChange,
        isLoading,
        query,
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
