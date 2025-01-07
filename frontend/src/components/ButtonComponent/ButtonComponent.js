import React from "react";
import "./styles.scss";

const ButtonComponent = ({ text, level="secondary", size="medium", onClick, width="100%", isDangerous=false, disabled=false }) => {
  return (
    <div className="button-container">
      <button className={`button ${level} ${size} ${isDangerous ? "dangerous" : ""} ${disabled ? "disabled" : ""}`} onClick={disabled ? () => {} : onClick} style={{ width: width }}>
        {text}
      </button>
    </div>
  );
};

export default ButtonComponent;