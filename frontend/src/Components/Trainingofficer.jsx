import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../CSS/Trainingofficer.css";
import { toast } from 'react-toastify';
import TrainingAddModal from "./Trainingaddmodal";
import TrainingUpdateModal from "./Trainingupdatemodal";
import ConfirmationModal from "./Confirmmessage";
import TrainingProgramDocumentsModal from "./Trainingprogramdocs";

const TrainingOfficerSection = () => {
    const navigate = useNavigate();
    const adminid = localStorage.getItem('adminid');
    const [trainingPrograms, setTrainingPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
    const [programToDelete, setProgramToDelete] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const adminid = localStorage.getItem('adminid');
        console.log(adminid);

        if (!token) {
            navigate('/manage/admin');
        } else {
            const username = localStorage.getItem('username');
            console.log(username);
        }

        const fetchTrainingPrograms = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/alltrainingprgs');
                const data = await response.json();
                if (data.status) {
                    setTrainingPrograms(data.programs);
                } else {
                    toast.error('Failed to fetch training programs');
                }
            } catch (error) {
                toast.error('Error fetching training programs: ' + error.message);
            }
        };
        fetchTrainingPrograms();
    }, [navigate]);

    const handleUpdateClick = (program) => {
        setSelectedProgram(program);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (program) => {
        setProgramToDelete(program);
        setIsConfirmationOpen(true);
    };

    const handleSeeDocuments = (programId) => {
        setSelectedProgram(programId);
        setIsDocsModalOpen(true);
    };

    const handleAddNewProgram = async (newProgram) => {
        const formData = {
            'title': newProgram.title,
            'description': newProgram.description,
            'photo': 'att_program.jpg',
            'startDate': newProgram.startDate,
            'endDate': newProgram.endDate,
            'posted_by': "670e30aa94fff8202ff21a4f"
        };
        console.log(adminid);

        try {
            const response = await fetch(`http://localhost:5000/api/admin/addtrainingprogram`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.status) {
                toast.success(data.message);
                setTrainingPrograms(prevPrograms => [...prevPrograms, data.trainingProgram]);
                setIsAddModalOpen(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error fetching profile data: ' + error.message);
        }
    };

    const handleSaveProgram = async (updatedProgram) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/updateprogram/${updatedProgram._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProgram),
            });
            const data = await response.json();
            if (data.status) {
                toast.success('Training program updated successfully!');
                setTrainingPrograms(prevPrograms => prevPrograms.map(
                    program => program._id === updatedProgram._id ? updatedProgram : program
                ));
                setIsModalOpen(false);
            } else {
                toast.error('Failed to update training program');
            }
        } catch (error) {
            toast.error('Error updating training program: ' + error.message);
        }
    };

    const confirmDeleteProgram = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/deleteprogram/${programToDelete._id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.status) {
                toast.success('Training program deleted successfully!');
                setTrainingPrograms(prevPrograms => prevPrograms.filter(program => program._id !== programToDelete._id));
                setIsConfirmationOpen(false);
            } else {
                toast.error('Failed to delete training program');
            }
        } catch (error) {
            toast.error('Error deleting training program: ' + error.message);
        }
    };

    return (
        <div className="trainingOfficerSection">
            <div className="dashboardTitleTrainingOfficer">
                <h1>Dashboard - Training Program Officer</h1>
            </div>
            <div className="trainingProgramsPontainer">
                {trainingPrograms.map(program => (
                    <div key={program._id} className="trainingCardOfficer">
                        <h3>{program.title}</h3>
                        <img src={`http://localhost:5000/uploads/${program.photo}`} alt={program.title} className="trainingProgramPhoto" />
                        <p>{program.description}</p>
                        <p><strong>Start:</strong> {new Date(program.startDate).toLocaleDateString()}</p>
                        <p><strong>End:</strong> {new Date(program.endDate).toLocaleDateString()}</p>

                        <div className="trainingCardButtons">
                            <button className="seeDocumentsTrainingBtn" onClick={() => handleSeeDocuments(program._id)}>See Documents</button>
                            <div className="editDeleteTrainingBtns">
                                <button className="updateTrainingBtn" onClick={() => handleUpdateClick(program)}>Update</button>
                                <button className="deleteTrainingBtn" onClick={() => handleDeleteClick(program)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="addNewProgramContainer">
                <button className="addNewProgramBtn" onClick={() => setIsAddModalOpen(true)}>
                    + Add Training Program
                </button>
            </div>

            {isAddModalOpen && (
                <TrainingAddModal
                    onClose={() => setIsAddModalOpen(false)}
                    onSave={handleAddNewProgram}
                />
            )}

            {isModalOpen && (
                <TrainingUpdateModal
                    program={selectedProgram}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveProgram}
                />
            )}

            {isConfirmationOpen && (
                <ConfirmationModal
                    message="Are you sure you want to delete this training program?"
                    onConfirm={confirmDeleteProgram}
                    onCancel={() => setIsConfirmationOpen(false)}
                />
            )}

            {isDocsModalOpen && selectedProgram && (
                <TrainingProgramDocumentsModal
                    programId={selectedProgram}
                    onClose={() => setIsDocsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default TrainingOfficerSection;