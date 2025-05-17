import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      style={{
        border: "1px solid gold",
        borderRadius: "5",
        padding: "10px",
        paddingLeft: "20",
        paddingRight: "20",
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
      }}
      onClick={onClick}
    >
      <div>{children}</div>
    </span>
  );
};

export default SelectButton;
