import React, { useEffect } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import "./styles.scss";

const AlertModal = ({ title, message, onContinue, onCancel, continueText = "Continue", cancelText = "Cancel" }) => {
  /* 
  AlertModal is a reusable modal dialog component that displays an alert or confirmation message.
  It renders a modal overlay with a title, message, and two action buttons.
  The component automatically adds 'modal-open' class to the body when mounted and removes it when unmounted.
  It also closes when the user clicks outside the modal content area.

  Props:
  title - The title text displayed at the top of the modal
  message - The main content/message of the modal
  onContinue - Function to call when the continue/confirm button is clicked
  onCancel - Function to call when the cancel button is clicked or when clicking outside the modal
  continueText - Custom text for the continue button (defaults to "Continue")
  cancelText - Custom text for the cancel button (defaults to "Cancel")
  */
  useEffect(() => {
    document.body.classList.add('modal-open');
    
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target.className === 'alert-modal-overlay') {
      onCancel();
    }
  };

  return (
    <div className="alert-modal-overlay" onClick={handleOverlayClick}>
      <div className="alert-modal">
        <div className="alert-modal-content">
          <h2>{title}</h2>
          <p>{message}</p>
        </div>
        <div className="alert-modal-buttons">
          <ButtonComponent 
            text={cancelText} 
            onClick={onCancel} 
            level="primary" 
            width="200px"
          />
          <ButtonComponent 
            text={continueText} 
            onClick={onContinue} 
            width="200px" 
            isDangerous={true}
          />
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
