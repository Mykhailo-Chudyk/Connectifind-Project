import React from 'react';
import './styles.scss';

const Toast = ({ message, type = 'success', onClose }) => {
  /* 
  Toast component displays temporary notification messages to the user.
  It can be used throughout the application to show success, error, warning, 
  or info messages that automatically disappear after a set time or can be 
  manually dismissed by the user.
  
  Props:
  - message: String containing the notification text to display
  - type: String determining the toast style (default: 'success', can also be 'error', 'warning', 'info')
  - onClose: Function that will be called when the user clicks the close button
  */
  return (
    <div className={`toast-container ${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>×</button>
    </div>
  );
};

export default Toast; 