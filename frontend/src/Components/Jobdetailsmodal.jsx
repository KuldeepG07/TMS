import React, { useEffect, useState } from 'react';
import '../CSS/Jobdetailsmodal.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JobDetailsModal = ({ job, onClose }) => {
    const navigate = useNavigate();
    const { title, schoolName, vacancy, role, subject, posted_by, description, photo, zoneName } = job;
    const [hasApplied, setHasApplied] = useState(false);
    const userId = localStorage.getItem("userid");

    const imageUrl = photo ? `http://localhost:5000/uploads/${photo}`
        : 'http://localhost:5000/uploads/123.png';

    useEffect(() => {
        const checkIfApplied = async () => {
            if (!userId) return;

            try {
                const response = await fetch(`http://localhost:5000/api/users/checkapplication/${userId}/${job._id}`);
                const data = await response.json();
                if (data.status) {
                    setHasApplied(data.hasApplied);
                }
            } catch (error) {
                toast.error("Error checking application status: " + error.message);
            }
        };

        checkIfApplied();
    }, [job._id, userId]);

    const handleApplyClick = async () => {
        if (!userId) {
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/users/canapply/${userId}`);
            const data = await response.json();
            if (!data.status) {
                toast.error(data.message);
            } else {
                toast.success("Redirecting to apply...");
                setTimeout(() => {
                    window.location.href = `/applyjob/${job._id}`;
                }, 2500);
            }
        } catch (error) {
            onClose();
            toast.error("Server Error : " + error.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <span className="close-modal" onClick={onClose}>&times;</span>
                <img src={imageUrl} alt={title} className="modal-job-image" />
                <div className="modal-content">
                    <center><h2>{title}</h2></center>
                    <br />
                    <p><strong>Description:</strong> {description}</p>
                    <p><strong>Vacancy:</strong> {vacancy}</p>
                    <p><strong>Role:</strong> {role}</p>
                    {subject && <p><strong>Subject:</strong> {subject}</p>}
                    <p><strong>School Name:</strong> {schoolName}</p>
                    <p><strong>Zone Name:</strong> {zoneName}</p>
                    <p><strong>Posted by:</strong> {posted_by.personal_details.name}</p>
                </div>
                {!hasApplied ? (
                    <button className="apply-now-btn" onClick={handleApplyClick}>
                        Apply Now
                    </button>
                ) : (
                    <button className="apply-now-btn" disabled>
                        Already Applied
                    </button>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default JobDetailsModal;
