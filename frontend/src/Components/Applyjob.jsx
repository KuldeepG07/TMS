import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../CSS/Applyjob.css';
import { toast } from 'react-toastify';

const ApplyJobPage = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState({});
    const [teacherId, setTeacherId] = useState(null);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/getjobbyid/${jobId}`);
                const data = await response.json();
                if (data.status) {
                    setJob(data.jobPosting);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error("Error fetching job details: " + error.message);
            }
        };

        const fetchUserDetails = () => {
            const userData = {
                name: localStorage.getItem("name"),
                email: localStorage.getItem("email"),
                contactNumber: localStorage.getItem("contactNumber"),
                dob: localStorage.getItem("dob").substring(0,10)
            };
            setUser(userData);
        };

        const fetchTeacherId = async () => {
            const userId = localStorage.getItem("userid");
            if (!userId) {
                toast.error("User not logged in!");
                navigate("/login");
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/users/getteacherbyuserid/${userId}`);
                const data = await response.json();
                if (data.status) {
                    setTeacherId(data.teacher._id);
                } else {
                    toast.error("Unable to find teacher details: " + data.message);
                }
            } catch (error) {
                toast.error("Error fetching teacher details: " + error.message);
            }
        };

        fetchJobDetails();
        fetchUserDetails();
        fetchTeacherId();
    }, [jobId, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!teacherId) {
            toast.error("Teacher ID not found!");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/users/applyjob`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    teacher_id: teacherId,
                    job_posting_id: jobId
                })
            });

            const data = await response.json();
            if (data.status) {
                toast.success("Application submitted successfully!");
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2500);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error submitting application: " + error.message);
        }
    };

    return (
        <div className="apply-job-form">
            <h2>Application Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="job-details">
                    <label>Title of Job: </label>
                    <input type="text" value={job.title || ''} readOnly />

                    <label>Role: </label>
                    <input type="text" value={job.role || ''} readOnly />

                    {job.subject && (
                        <>
                            <label>Subject: </label>
                            <input type="text" value={job.subject} readOnly />
                        </>
                    )}
                </div>

                <div className="user-details-box">
                    <h3>Your application will be submitted with the following details:</h3>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Mobile No:</strong> {user.contactNumber}</p>
                    <p><strong>Date of Birth:</strong> {user.dob}</p>
                </div>

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default ApplyJobPage;
