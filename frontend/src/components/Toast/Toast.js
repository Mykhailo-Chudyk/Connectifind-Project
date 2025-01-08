import React from 'react';
import './styles.scss';

const Toast = ({ message, type = 'success', onClose }) => {
  return (
    <div className={`toast-container ${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>×</button>
    </div>
  );
};

export default Toast; 