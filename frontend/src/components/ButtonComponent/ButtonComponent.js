import React from "react";
import "./styles.scss";

const ButtonComponent = ({ text, level }) => {
  return (
    <div className="button-container">
      <button className={`button ${level}`}>
        {text}
      </button>
    </div>
  );
};

export default ButtonComponent;