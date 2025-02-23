import React, { useEffect, useState } from 'react';
import '../CSS/Trainingprogramdocs.css';
import { ToastContainer, toast } from 'react-toastify';

const TrainingProgramDocumentsModal = ({ programId, onClose }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchProgramFiles = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/getprogramdocs/${programId}`);
                const data = await response.json();
                if (data.status) {
                    setFiles(data.programdocs);
                } else {
                    toast.error('Failed to fetch program files.');
                }
            } catch (error) {
                toast.error('Error fetching program files: ' + error.message);
            }
        };

        if (programId) {
            fetchProgramFiles();
        }
    }, [programId]);

    return (
        <div className="modalOverlayDocs">
            <div className="modalContainerDocs">
                <span className="closeModalDocs" onClick={onClose}>&times;</span>
                <div className="modalContentDocs">
                    <h2>Training Program Documents</h2>
                    {files.length > 0 ? (
                        <div className="documentList">
                            {files.map((file) => (
                                <div key={file._id} className="documentItem">
                                    <div className="documentImage">
                                        <img
                                            src="http://localhost:5000/uploads/default.png"
                                            alt="Document"
                                        />
                                    </div>

                                    <div className="documentDetails">
                                        <h3>{file.description}</h3>
                                        <a
                                            href={`http://localhost:5000/uploads/${file.file_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {file.file_path.split('/').pop()}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No files available for this program.</p>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default TrainingProgramDocumentsModal;
