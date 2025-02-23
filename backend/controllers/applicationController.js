const applicationService = require("../services/applicationService");
const teacherService = require("../services/teacherService");

const applyJobApplication = async (req, res) => {
    try {
        const { teacher_id, job_posting_id } = req.body;
        const applicationData = {
            teacher_id, job_posting_id, status: "Applied"
        };
        const newApplication = await applicationService.addJobApplication(applicationData);
        return res.status(200).json({ status: true, message: "Applied Successfully!", newApplication });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Error while Applying : " + error.message });
    }
};

const checkApplication = async (req, res) => {
    try {
        const { userId, jobId } = req.params;
        const teacher = await teacherService.getTeacherById(userId);
        if (!teacher) {
            return res.json({ status: false, message: 'Teacher not found!' });
        }
        const teacherId = teacher._id;
        const jobPostingId = jobId
        const application = await applicationService.findApplication(teacherId, jobPostingId);

        if (application) {
            return res.json({ status: true, hasApplied: true });
        } else {
            return res.json({ status: true, hasApplied: false });
        }
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};

const getAppliedJobPostings = async (req, res) => {
    const { userId } = req.body;
    try {
        const teacher = await teacherService.getTeacherById(userId);
        if (!teacher) {
            return res.json({ status: false, message: 'Teacher not found!' });
        }

        const applications = await applicationService.findApplications(teacher._id);
        const appliedJobIds = applications.map(app => app.job_posting_id);

        return res.json({ status: true, appliedJobIds });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};

module.exports = {
    applyJobApplication,
    checkApplication,
    getAppliedJobPostings,
};