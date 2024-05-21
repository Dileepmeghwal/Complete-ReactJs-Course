import React from "react";

const Error = ({ error }) => {
  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      {error}
    </div>
  );
};

export default Error;
