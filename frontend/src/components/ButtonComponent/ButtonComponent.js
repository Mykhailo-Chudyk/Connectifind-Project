import React from "react";
import "./styles.scss";

const ButtonComponent = ({ text, level, size="medium", onClick }) => {
  return (
    <div className="button-container">
      <button className={`button ${level} ${size}`} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default ButtonComponent;