import React from "react";
import "./styles.scss";

const ButtonComponent = ({ text, level="secondary", size="medium", onClick, width="100%" }) => {
  return (
    <div className="button-container">
      <button className={`button ${level} ${size}`} onClick={onClick} style={{ width: width }}>
        {text}
      </button>
    </div>
  );
};

export default ButtonComponent;