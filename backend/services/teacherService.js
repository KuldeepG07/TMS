const Teacher = require("../models/Teacher");

const createTeacher = async (teacherData) => {
    try {
        const teacher = new Teacher(teacherData);
        await teacher.save();
        return teacher;
    } catch (error) {
        throw new Error("Error creating teacher: " + error.message);
    }
};

const updateTeacher = async (teacherid, teacherData) => {
    try {
        const details = {
            "personalInfo.address": teacherData.address,
            "personalInfo.profile_picture": teacherData.profile_picture,
            "achievements": teacherData.achievements
        };
        const updatedTeacher = await Teacher.findByIdAndUpdate(teacherid, {$set: details}, {new: true, runValidators: true});
        if (updatedTeacher) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error("Error while updating Teacher: " + error.message);
    }
};

const getTeacherById = async (teacherId) => {
    try {
        const teacher = await Teacher.findOne({ user_id: teacherId });
        return teacher;
    } catch (error) {
        throw new Error("Error fetching teacher: " + error.message);
    }
}

module.exports = {
    createTeacher,
    updateTeacher,
    getTeacherById,
};