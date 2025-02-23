import React, { useState } from 'react';
import "../CSS/Trainingupdatemodal.css";
import { toast } from 'react-toastify';

const TrainingAddModal = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSaveClick = () => {
        if (!title || !description || !startDate || !endDate) {
            toast.error("All fields are required!");
            return;
        }

        if (new Date(startDate) >= new Date(endDate)) {
            toast.error("Start date must be before end date.");
            return;
        }

        const newProgram = {
            title,
            description,
            startDate,
            endDate,
            photo
        };
        onSave(newProgram);
    };

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    return (
        <div className="trainingCreateModalOverlay">
            <div className="trainingCreateModalContent">
                <h2>Add New Training Program</h2>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label>Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <label>End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <label>Upload Photo:</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                />

                <div className="trainingCreateModalButtons">
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default TrainingAddModal;
