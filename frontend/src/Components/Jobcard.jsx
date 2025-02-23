import React, { useEffect, useState } from 'react';
import '../CSS/Tags.css';

const JobCard = ({ job, onSeeDetails }) => {
    const { title, schoolName, role, posted_by, photo } = job;
    const [hasApplied, setHasApplied] = useState(false);
    const userId = localStorage.getItem("userid");

    const imageUrl = photo ? `http://localhost:5000/uploads/${photo}`
        : 'http://localhost:5000/uploads/123.png';

    useEffect(() => {
        const checkApplicationStatus = async () => {
            if (!userId) return;

            try {
                const response = await fetch(`http://localhost:5000/api/users/checkapplication/${userId}/${job._id}`);
                const data = await response.json();
                setHasApplied(data.hasApplied);
            } catch (error) {
                console.error("Error checking application status:", error);
            }
        };

        checkApplicationStatus();
    }, [job._id, userId]);

    return (
        <div className="job-card">
            <img src={imageUrl} alt={title} className="job-card-image" />
            <div className="job-card-content">
                <h2>{title}</h2>
                <p><strong>Role:</strong> {role}</p>
                <p><strong>School:</strong> {schoolName}</p>
                <p><strong>Posted by:</strong> {posted_by.personal_details.name}</p>
                <div>
                    <button onClick={() => onSeeDetails(job)} className="see-details-btn">
                        See Details
                    </button>
                    {hasApplied && <div className="appliedtag">Applied</div>}
                </div>
            </div>
        </div>
    );
};

export default JobCard;
