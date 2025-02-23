const jobPostingService = require('../services/jobPostingService');
const { Console } = require("console");

const getAllJobostings = async (req, res) => {
    try {
        const jobPostings = await jobPostingService.getAllJobPostings();
        if (!jobPostings) {
            return res.status(400).json({ status: false, message: "There are no current jobs!"});
        }
        return res.status(200).json({ status: true, jobPostings});
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to retrieve job postings' + error.message });
    }
};

const getRecentJobostings = async (req, res) => {
    try {
        const jobPostings = await jobPostingService.getRecentJobPostings();
        if (!jobPostings) {
            return res.status(400).json({ status: false, message: "There are no current jobs!"});
        }
        return res.status(200).json({ status: true, jobPostings});
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to retrieve job postings' + error.message });
    }
};

const getJobPostingById = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const jobPosting = await jobPostingService.getJobPostingById(jobId);
        if (!jobPosting) {
            return res.status(400).json({ status: false, message: "There is no such job exists!"});
        }
        return res.status(200).json({ status: true, jobPosting});
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to retrieve job posting' + error.message });
    }
}

const addNewJobPost = async (req, res) => {
    try {
        const jobPostData = req.body;
        const jobPost = await jobPostingService.addJobPost(jobPostData);
        if(!jobPost) {
            return res.status(400).json({ status: false, message: "There are no current jobs!"});
        }
        return res.status(200).json({ status: true, jobPost});
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to add new job post' });
    }
}
module.exports = {
    getAllJobostings,
    getRecentJobostings,
    getJobPostingById,
    addNewJobPost,
};