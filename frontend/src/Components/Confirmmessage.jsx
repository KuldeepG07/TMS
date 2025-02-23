import React from 'react';
import '../CSS/Confirmmessage.css'; 

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirmationModalOverlay">
            <div className="confirmationModal">
                <h2>{message}</h2>
                <div className="confirmationModalButtons">
                    <button className="confirmBtn" onClick={onConfirm}>Yes</button>
                    <button className="cancelBtn" onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
