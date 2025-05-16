import React from "react";

const Spinner = () => {
  return (
    <div
      className="w-full flex justify-center items-center"
      style={{ marginTop: "3rem" }}
    >
      <span className="loader"></span>
    </div>
  );
};

export default Spinner;
