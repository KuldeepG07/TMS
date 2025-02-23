import React from 'react';
import '../CSS/Trainingprograms.css';

const TrainingProgramCard = ({ program, onEnroll }) => {
    const { title, description, photo, startDate, endDate, isEnrolled, status } = program;
    const formattedStartDate = new Date(startDate).toLocaleDateString();
    const formattedEndDate = new Date(endDate).toLocaleDateString();

    const imageUrl = photo ? `http://localhost:5000/uploads/${photo}`
        : 'http://localhost:5000/uploads/default.png';

    return (
        <div className="training-card">
            <img src={imageUrl} alt={title} className="training-card-image" />
            <div className="training-card-content">
                <h2 className="cardTitle" style={{ textAlign: 'center' }}>{title}</h2>
                <p className="cardDetailPara">{description}</p>
                <p className="cardDetailPara"><strong>Start Date:</strong> {formattedStartDate}</p>
                <p className="cardDetailPara"><strong>End Date:</strong> {formattedEndDate}</p>
                <div className="tags">
                    {status === 'Ongoing' && <span className="tag green">Ongoing</span>}
                    {status === 'Completed' && <span className="tag grey">Completed</span>}
                    {status === 'Upcoming' && <span className="tag violet">Upcoming</span>}
                    {!isEnrolled && <span className="tag red">Not Enrolled</span>}
                    {isEnrolled && <span className="tag blue">Enrolled</span>}
                </div>
                {!isEnrolled && status !== 'Completed' && (
                    <button className="enroll-btn" onClick={() => onEnroll(program._id)}>
                        Enroll
                    </button>
                )}
            </div>
        </div>
    );
};

export default TrainingProgramCard;
