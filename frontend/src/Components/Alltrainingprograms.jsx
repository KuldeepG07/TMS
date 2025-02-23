import React, { useEffect, useState } from 'react';
import TrainingProgramCard from './Trainingprogramcard';
import TrainingProgramDocumentsModal from './Trainingprogramdocs';
import '../CSS/Alltrainingprograms.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllTrainingPrograms = () => {
    const navigate = useNavigate();
    const [notEnrolledPrograms, setNotEnrolledPrograms] = useState([]);
    const [enrolledPrograms, setEnrolledPrograms] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProgramId, setSelectedProgramId] = useState(null);
    const userId = localStorage.getItem("userid");

    useEffect(() => {
        const fetchTrainingPrograms = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/gettrainingprograms/${userId}`);
                const data = await response.json();
                if (data.status) {
                    const enrolled = data.programs.filter(program => program.isEnrolled);
                    const notEnrolled = data.programs.filter(program => !program.isEnrolled);

                    setEnrolledPrograms(enrolled);
                    setNotEnrolledPrograms(notEnrolled);
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
                setNotEnrolledPrograms(prevPrograms =>
                    prevPrograms.filter(program => program._id !== programId)
                );
                setEnrolledPrograms(prevPrograms => [
                    ...prevPrograms,
                    data.enrollment
                ]);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error enrolling in the program');
        }
    };

    const handleSeeDocuments = (programId) => {
        setSelectedProgramId(programId);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedProgramId(null);
    };

    return (
        <div className="allTrainingProgramsSection">
            <div className="titleContainer">
                <h1>All Training Programs</h1>
            </div>

            <div className="programSection">
                <h2>Available Training Programs</h2>
                <div className="trainingProgramsRow">
                    {notEnrolledPrograms.length > 0 ? (
                        notEnrolledPrograms.map((program) => (
                            <TrainingProgramCard
                                key={program._id}
                                program={program}
                                onEnroll={handleEnroll}
                            />
                        ))
                    ) : (
                        <p>No available training programs.</p>
                    )}
                </div>
            </div>

            <div className="programSection">
                <h2>Enrolled Training Programs</h2>
                <div className="trainingProgramsRow">
                    {enrolledPrograms.length > 0 ? (
                        enrolledPrograms.map((program) => (
                            <div key={program._id} className="trainingCard">
                                <img
                                    src={`http://localhost:5000/uploads/${program.photo}`}
                                    alt={program.title}
                                    className="trainingCardImage"
                                />
                                <div className="trainingCardContent">
                                    <h3>{program.title}</h3>
                                    <button
                                        className="seeDocumentsBtn"
                                        onClick={() => handleSeeDocuments(program._id)}
                                    >
                                        See Documents
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No enrolled training programs.</p>
                    )}
                </div>
            </div>
            {modalOpen && (
                <TrainingProgramDocumentsModal
                    programId={selectedProgramId}
                    onClose={closeModal}
                />
            )}

            <div className="backButtonContainer">
                <button className="backButton" onClick={() => navigate('/dashboard')}>
                    Back
                </button>
            </div>
        </div>
    );
};

export default AllTrainingPrograms;
