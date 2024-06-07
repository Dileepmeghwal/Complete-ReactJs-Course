import { useEffect } from "react";
import { useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${url}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return { data };
};
