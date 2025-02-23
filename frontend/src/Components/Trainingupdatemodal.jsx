import React, { useState } from "react";
import "../CSS/Trainingupdatemodal.css";
import { toast } from "react-toastify";

const TrainingUpdateModal = ({ program, onClose, onSave }) => {
    const [title, setTitle] = useState(program.title);
    const [description, setDescription] = useState(program.description);
    const [startDate, setStartDate] = useState(new Date(program.startDate).toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date(program.endDate).toISOString().split('T')[0]);

    const handleSave = () => {
        if (!title || !description || !startDate || !endDate) {
            toast.error('All fields are required.');
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            toast.error('Start date must be before the end date.');
            return;
        }

        onSave({
            ...program,
            title,
            description,
            startDate,
            endDate
        });
    };

    return (
        <div className="trainingUpdateModalOverlay">
            <div className="trainingUpdateModalContent">
                <h2>Update Training Program</h2>
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

                <div className="trainingUpdateModalButtons">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default TrainingUpdateModal;
