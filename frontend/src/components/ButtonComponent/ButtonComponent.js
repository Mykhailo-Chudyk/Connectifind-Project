import React from "react";
import "./styles.scss";

const ButtonComponent = ({ text, level, onClick }) => {
  return (
    <div className="button-container">
      <button className={`button ${level}`} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default ButtonComponent;