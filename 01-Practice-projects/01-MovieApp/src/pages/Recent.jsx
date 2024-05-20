import React, { useEffect } from "react";

const Recent = () => {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
      });
  }, []);

  return <div>Recent</div>;
};

export default Recent;
