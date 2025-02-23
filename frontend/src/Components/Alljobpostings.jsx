import React, { useEffect, useState } from 'react';
import JobCard from './Jobcard';
import JobDetailsModal from './Jobdetailsmodal';
import '../CSS/Alljobpostings.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AllJobs = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/getalljobpostings');
                const data = await response.json();
                if (data.status) {
                    setJobs(data.jobPostings);
                } else {
                    toast.error('Failed to fetch jobs');
                }
            } catch (error) {
                toast.error('Error fetching jobs: ' + error.message);
            }
        };

        fetchAllJobs();
    }, []);

    const handleSeeDetails = (job) => {
        setSelectedJob(job);
    };

    const handleCloseModal = () => {
        setSelectedJob(null);
    };

    return (
        <div className="allJobPostingsSection">
            <div className="titleContainerAllJobs">
                <h1>All Job Postings</h1>
            </div>
            <div className="jobPostingsRow">
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <JobCard key={job._id} job={job} onSeeDetails={handleSeeDetails} />
                    ))
                ) : (
                    <p>No jobs available.</p>
                )}
            </div>
            {selectedJob && (
                <JobDetailsModal job={selectedJob} onClose={handleCloseModal} />
            )}
            <div className="backButtonContainer">
                <button className="backButton" onClick={() => navigate('/dashboard')}>
                    Back
                </button>
            </div>
        </div>
    );
};

export default AllJobs;
