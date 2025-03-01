import React from "react";
import "./styles.scss";

const ButtonComponent = ({ text, level="secondary", size="medium", onClick, width="100%", isDangerous=false, disabled=false }) => {
  /* 
  A reusable button component that can be customized with different styles, sizes, and behaviors.
  This component is used throughout the application wherever buttons are needed.
  
  Props:
  - text: The text content to display on the button
  - level: The visual style/importance of the button (default: "secondary")
    Possible values: "primary", "secondary", etc.
  - size: The size of the button (default: "medium")
    Possible values: "small", "medium", "large", etc.
  - onClick: Function to execute when the button is clicked
  - width: CSS width value for the button (default: "100%")
  - isDangerous: Boolean indicating if this is a destructive action button (default: false)
  - disabled: Boolean indicating if the button should be disabled (default: false)
  */
  return (
    <div className="button-container">
      <button className={`button ${level} ${size} ${isDangerous ? "dangerous" : ""} ${disabled ? "disabled" : ""}`} onClick={disabled ? () => {} : onClick} style={{ width: width }}>
        {text}
      </button>
    </div>
  );
};

export default ButtonComponent;