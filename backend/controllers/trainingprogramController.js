const trainingprogramService = require("../services/trainingprogramService");
const teacherService = require("../services/teacherService");
const { Console } = require("console");

const addTrainingProgram = async (req, res) => {
    try {
        const formData = req.body;
        const trainingProgram = await trainingprogramService.addTrainingProgram(formData);
        if (!trainingProgram) {
            return res.status(400).json({ status: false, message: "There are no current training programs!" });
        }
        return res.status(200).json({ status: true, message:"Training Program added successfully!", trainingProgram });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to add new training program!' + error.message });
    }
};

const updateTrainingProgram = async (req, res) => {
    try {
        const { title, description, startDate, endDate } = req.body;
        const programId = req.params.programid;
        const updatedProgram = await trainingprogramService.updateTrainingProgramData(programId, title, description, startDate, endDate);
        if(!updatedProgram) {
            return res.status(200).json({status: false, message: "Training Program updation Unsuccessful!"});
        }
        return res.status(200).json({status: true, message: "Training Program updated successfully!"});
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to update training program!' + error.message });
    }
};

const deleteTrainingProgram = async (req, res) => {
    try {
        const programId = req.params.programid;
        const isdeleted = await trainingprogramService.deleteTrainingProgramData(programId);
        if(!isdeleted) {
            return res.status(200).json({ status: true, message: "Training program is not deleted! Try later!"});
        }
        return res.status(200).json({ status: true, message: "Training program deleted!"});
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to delete training program!' + error.message });
    }
};

const addTrainingProgramDoc = async (req, res) => {
    try {
        const { userId, programId, filePath, description } = req.body;
        const documentData = {
            training_program_id: programId,
            uploaded_by: userId,
            description: description,
            file_path: filePath
        };
        const document = await trainingprogramService.addTrainingProgramDoc(documentData);
        return res.status(200).json({ status: true, message: "Uploaded successfully!", document});
    } catch (error) {
        res.status(500).json({status: true, message: "Failed to add documetn in program!" + error.message});
    }
};

const fetchLatestTrainingPrograms = async (req, res) => {
    try {
        const programs = await trainingprogramService.getLatestTrainingPrograms();
        if (!programs) {
            return res.status(200).json({ status: false, message: "No training programs available!" });
        }
        return res.status(200).json({ status: true, message: "Latest Training Programs", programs });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to retrieve latest training programs!' + error.message });
    }
};

const fetchAllTrainingPrograms = async (req, res) => {
    try {
        const programs = await trainingprogramService.getAllTrainingPrograms();
        if (!programs) {
            return res.status(200).json({ status: false, message: "No training programs available!" });
        }
        return res.status(200).json({ status: true, message: "All Training Programs", programs });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to retrieve training programs!' + error.message });
    }
};

const getEnrollmentPrograms = async (req, res) => {
    try {
        const { userId } = req.body;
        const teacher = await teacherService.getTeacherById(userId);
        if (!teacher) {
            return res.json({ status: false, message: 'Teacher not found!' });
        }
        const enrollments = await trainingprogramService.getEnrollmentProgramsById(teacher._id);
        return res.status(200).json({ status: true, enrollments });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to retrieve enrolled programs!' + error.message });
    }
};

const enrollTeacher = async (req, res) => {
    const { userId, programId } = req.body;
    try {
        const teacher = await teacherService.getTeacherById(userId);
        if (!teacher) {
            return res.json({ status: false, message: 'Teacher not found!' });
        }
        const enrolledData = {
            teacher_id: teacher._id,
            training_program_id: programId
        };
        const enrollment = await trainingprogramService.enrollTeacher(enrolledData);
        if (!enrollment) {
            return res.status(400).json({ status: false, message: "Enrollment not possible!" });
        }
        return res.status(200).json({ status: true, message: "Enrolled Successfully!", enrollment });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to enroll teacher!' + error.message });
    }
};

const getTrainingPrograms = async (req, res) => {
    const userId = req.params.userId;
    try {
        const teacher = await teacherService.getTeacherById(userId);
        if (!teacher) {
            return res.json({ status: false, message: 'Teacher not found!' });
        }

        const programs = await trainingprogramService.getAllTrainingPrograms();
        const enrollments = await trainingprogramService.getEnrollmentProgramsById(teacher._id);
        const enrolledProgramIds = enrollments.map(enrollment => enrollment.training_program_id.toString());
        const enrichedPrograms = programs.map(program => {
            const isEnrolled = enrolledProgramIds.includes(program._id.toString());
            const currentDate = new Date();
            let status = '';

            if (currentDate > program.endDate) {
                status = 'Completed';
            } else if (currentDate <= program.endDate && currentDate >= program.startDate) {
                status = 'Ongoing';
            } else {
                status = 'Upcoming';
            }

            return { ...program._doc, isEnrolled, status };
        });
        return res.status(200).json({ status: true, programs: enrichedPrograms });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to get raining programs with status', error });
    }
};

const getProgramDocsById = async (req, res) => {
    try {
        const {programId} = req.params;
        const programdocs = await trainingprogramService.getProgramDocsById(programId);
        if(!programdocs) {
            return res.status(200).json({ status: true, message: "No documents available at the time!", programdocs});
        }
        return res.status(200).json({ status: true, message: "Fetched all document successfully!", programdocs});
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to get all program documents'+ error.message });
    }
};

module.exports = {
    fetchLatestTrainingPrograms,
    fetchAllTrainingPrograms,
    addTrainingProgram,
    updateTrainingProgram,
    deleteTrainingProgram,
    addTrainingProgramDoc,
    getEnrollmentPrograms,
    enrollTeacher,
    getProgramDocsById,
    getTrainingPrograms,
};
