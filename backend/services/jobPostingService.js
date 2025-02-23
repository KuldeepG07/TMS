const JobPosting = require("../models/Jobpostings");

const getAllJobPostings = async () => {
    try {
        const jobPostings = await JobPosting.find().sort({ uploadedDate: -1 }).populate({
            path: 'posted_by',
            select: 'personal_details.name personal_details.email'
        });
        return jobPostings;
    } catch (error) {
        throw new Error("Error while fetching job postings: " + error.message);
    }
};

const getRecentJobPostings = async () => {
    try {
        const jobPostings = await JobPosting.find().sort({ uploadedDate: -1 }).limit(5).populate({
            path: 'posted_by',
            select: 'personal_details.name personal_details.email'
        });
        return jobPostings;
    } catch (error) {
        throw new Error("Error while fetching job postings: " + error.message);
    }
};

const getJobPostingById = async (jobId) => {
    try {
        const jobPosting = await JobPosting.findById(jobId);
        return jobPosting;
    } catch (error) {
        throw new Error("Error while fetching job posting: " + error.message);
    }
}

const addJobPost = async (jobPostData) => {
    try {
        const jobPost = new JobPosting(jobPostData);
        await jobPost.save();
        return jobPost;
    } catch (error) {
        throw new Error("Error while fetching creating postings: " + error.message);
    }
}

module.exports = {
    getAllJobPostings,
    getJobPostingById,
    getRecentJobPostings,
    addJobPost,
};