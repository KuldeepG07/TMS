import React, { useEffect, useState } from 'react';
import JobCard from './Jobcard';
import JobDetailsModal from './Jobdetailsmodal';
import '../CSS/Recentjobpostings.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const RecentJobPostings = () => {
    const navigate = useNavigate();
    const [jobPostings, setJobPostings] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const fetchJobPostings = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/getrecentjobpostings');
                const data = await response.json();
                if (data.status) {
                    setJobPostings(data.jobPostings);
                }
            } catch (error) {
                console.error('Error fetching job postings:', error);
            }
        };

        fetchJobPostings();
    }, []);

    const handleSeeDetails = (job) => {
        setSelectedJob(job);
    };

    const handleCloseModal = () => {
        setSelectedJob(null);
    };

    const handleSeeAllClick = () => {
        navigate('/all-job-postings');
    };

    return (
        <div className="job-postings-container">
            <h2 className="job-postings-title">Latest Job Postings</h2>
            <div className="job-postings-scroll">
                {jobPostings.map((job) => (
                    <div key={job._id}>
                        <JobCard key={job._id} job={job} onSeeDetails={handleSeeDetails} />
                    </div>

                ))}
                <div className="see-all">
                    <button className="see-all-button" onClick={handleSeeAllClick}>
                        <i className="fa fa-arrow-right"></i>
                    </button>
                    <p>See All</p>
                </div>
            </div>

            {selectedJob && (
                <JobDetailsModal job={selectedJob} onClose={handleCloseModal} />
            )}
            <ToastContainer />
        </div>
    );
};

export default RecentJobPostings;
