import React, { useEffect, useState } from 'react';
import TrainingProgramCard from './Trainingprogramcard';
import '../CSS/Trainingprograms.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TrainingProgramsSection = () => {
    const [trainingPrograms, setTrainingPrograms] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userid");

    useEffect(() => {
        const fetchTrainingPrograms = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/gettrainingprograms/${userId}`);
                const data = await response.json();
                if (data.status) {
                    console.log(data.programs);
                    setTrainingPrograms(data.programs);
                }
            } catch (error) {
                console.error('Error fetching training programs:', error);
            }
        };

        fetchTrainingPrograms();
    }, [userId]);

    const handleEnroll = async (programId) => {
        try {
            const response = await fetch('http://localhost:5000/api/users/enroll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, programId })
            });
            const data = await response.json();

            if (data.status) {
                toast.success('Enrolled successfully!');
                setTrainingPrograms(prevPrograms =>
                    prevPrograms.map(program =>
                        program._id === programId
                            ? { ...program, isEnrolled: true }
                            : program
                    )
                );
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error enrolling in the program');
        }
    };

    const handleSeeAllClick = () => {
        navigate('/all-training-programs');
    };

    return (
        <div className="training-programs-section">
            <h2 className="section-title">Training Programs</h2>
            <div className="training-programs-row">
                {trainingPrograms.slice(0,3).map((program) => (
                    <TrainingProgramCard
                        key={program._id}
                        program={program}
                        onEnroll={handleEnroll}
                    />
                ))}
            </div>
            <div className="center-button-container">
                <button className="seeallbutton" onClick={handleSeeAllClick}>
                    See All Training Programs
                </button>
            </div>
        </div>
    );
};

export default TrainingProgramsSection;
