const Application = require("../models/Application");

const addJobApplication = async (applicationData) => {
    try {
        const newApplication = new Application(applicationData);
        await newApplication.save();
        return newApplication;
    } catch (error) {
        throw new Error("Error creating new application: " + error.message);
    }
};

const findApplication = async (teacherId, jobPostingId) => {
    try {
        const application = await Application.findOne({teacher_id: teacherId, job_posting_id: jobPostingId});
        return application;
    } catch (error) {
        throw new Error("Error fetching application: " + error.message);
    }
};

const findApplications = async (teacherId) => {
    try {
        const applications = await Application.find({teacher_id: teacherId});
        return applications;
    } catch (error) {
        throw new Error("Error fetching application: " + error.message);
    }
};

module.exports = {
    addJobApplication,
    findApplication,
    findApplications,
};