import React, { useState, useEffect } from "react";
import "./Popup.css";

const Popup = ({ header, content, onConfirm, onDecline, isOpen, closePopup ,id}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    
    if (!isOpen) {
      setIsChecked(false);
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target.className === "overlay") {
      closePopup();
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="popup">
        <button className="close-btn" onClick={closePopup}>
          ×
        </button>
        <div className="popup-header">
          <h1>{header}</h1>
        </div>
        <div className="popup-content">
          {content}
          <br />
          <label htmlFor="read">
            <input
              type="checkbox"
              name="read"
              id="read"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            👉 I Agree to the Condition
          </label>
        </div>
        <div className="popup-actions">
          <button
            className="btn-confirm"
            onClick={onConfirm}
            disabled={!isChecked}
          >
            Confirm
          </button>
          <button className="btn-decline" onClick={onDecline}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
