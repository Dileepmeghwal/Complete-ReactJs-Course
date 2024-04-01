import { useEffect, useState } from "react";

const KEY = "a57571f7";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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

  return { movies, isLoading, error };
}
