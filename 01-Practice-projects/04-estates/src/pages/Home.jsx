import React from "react";

import { useFetch } from "../hooks/useFetch";

const Home = () => {
  const [data] = useFetch("/posts");
  console.log("data", data);
  return <div>..</div>;
};

export default Home;
