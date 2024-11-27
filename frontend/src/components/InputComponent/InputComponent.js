import React from 'react';
import './styles.scss';

const InputComponent = ({ icon, type, value, onChange, placeholder }) => {
    return (
        <div className="input-container">
          <span className="input-icon">{icon}</span>
          <input type={type} className="input-field" placeholder={placeholder} value={value} onChange={onChange}/>
        </div>
      );
};

export default InputComponent;