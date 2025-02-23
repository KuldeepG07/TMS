const TrainingProgram = require("../models/Trainingprogram");
const Enrollments = require("../models/Enrollments");
const TrainingProgramDocuments = require("../models/Trainingprogramdocs");

const getLatestTrainingPrograms = async () => {
    try {
        const programs = await TrainingProgram.find().sort({ startDate: -1 }).limit(3).populate({
            path: 'posted_by',
            select: 'personal_details.name personal_details.email'
        });
        return programs;
    } catch (error) {
        throw new Error("Error fetching latest Training programs : " + error.message);
    }
};

const getAllTrainingPrograms = async () => {
    try {
        const programs = await TrainingProgram.find();
        return programs;
    } catch (error) {
        throw new Error("Error fetching Training programs : " + error.message);
    }
};

const getEnrollmentProgramsById = async (teacherId) => {
    try {
        const enrollments = await Enrollments.find({ teacher_id: teacherId });
        return enrollments;
    } catch (error) {
        throw new Error("Error while fetching enrolled program: " + error.message);
    }
}

const addTrainingProgram = async (trainingProgramData) => {
    try {
        const trainingProgram = new TrainingProgram(trainingProgramData);
        await trainingProgram.save();
        return trainingProgram;
    } catch (error) {
        throw new Error("Error while creating program: " + error.message);
    }
};

const updateTrainingProgramData = async (programId, title, description, startDate, endDate) => {
    try {
        const updatedProgram = await TrainingProgram.findByIdAndUpdate(programId, {title, description, startDate, endDate}, {new: true, runValidators: true});
        return updatedProgram;
    } catch (error) {
        throw new Error("Error while updating training program: " + error.message);
    }
};

const deleteTrainingProgramData = async (programId) => {
    try {
        await TrainingProgram.findByIdAndDelete(programId);
        return true;
    } catch (error) {
        throw new Error("Error while updating training program: " + error.message);
    }
};

const addTrainingProgramDoc = async (documentData) => {
    try {
        const document = new TrainingProgramDocuments(documentData);
        await document.save();
        return document;
    } catch (error) {
        throw new Error("Error while adding program document: " + error.message);
    }
};

const enrollTeacher = async (enrolledData) => {
    try {
        const enrollment = new Enrollments(enrolledData);
        await enrollment.save();
        return enrollment;
    } catch (error) {
        throw new Error("Error while fetching enrooling teacher: " + error.message);
    }
}

const getProgramDocsById = async (programId) => {
    try {
        const programDocs = await TrainingProgramDocuments.find({ training_program_id : programId});
        return programDocs;
    } catch (error) {
        throw new Error("Error while fetching program documents: " + error.message);
    }
};

module.exports = {
    getLatestTrainingPrograms,
    getAllTrainingPrograms,
    addTrainingProgram,
    updateTrainingProgramData,
    deleteTrainingProgramData,
    addTrainingProgramDoc,
    getEnrollmentProgramsById,
    getProgramDocsById,
    enrollTeacher,
}