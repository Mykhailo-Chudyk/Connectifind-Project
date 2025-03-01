import React from 'react';
import './styles.scss';

const InputComponent = ({ icon, type, value, onChange, placeholder }) => {
    /* 
    A reusable input component with an icon that can be used across the application.
    This component renders a styled input field with an icon on the left side.
    It's designed to be integrated into forms throughout the application for consistent UI/UX.
    
    Props:
    - icon: React element/component to be displayed as an icon on the left side of the input
    - type: String specifying the HTML input type (e.g., 'text', 'password', 'email', etc.)
    - value: The current value of the input field
    - onChange: Function to handle input changes, receives the input event as a parameter
    - placeholder: String to display as placeholder text when the input is empty
    */
    return (
        <div className="input-container">
          <span className="input-icon">{icon}</span>
          <input type={type} className="input-field" placeholder={placeholder} value={value} onChange={onChange}/>
        </div>
      );
};

export default InputComponent;