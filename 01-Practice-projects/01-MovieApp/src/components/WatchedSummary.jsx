import React from "react";

const WatchedSummary = ({ watched }) => {
  const average = (arr) => {
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  };
  const avgImdbRating = average(watched?.map((item) => item));
  

  return (
    <div className="summary">
      <h3>Movies You Watched</h3>
      <div className="d-flex justify-content-between py-1">
        <div className="bx">#️⃣ {watched?.length} Movies </div>
        <div className="bx">🌟 {avgImdbRating} ra</div>
        <div className="bx">⌛min </div>
      </div>
    </div>
  );
};

export default WatchedSummary;
