import React, { useEffect } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import "./styles.scss";

const AlertModal = ({ title, message, onContinue, onCancel, continueText = "Continue", cancelText = "Cancel" }) => {
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
