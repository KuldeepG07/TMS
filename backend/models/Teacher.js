const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    personalInfo: {
        address: { type: String, required: true },
        profile_picture: { type: String, default: null }
    },
    professionalInfo: {
        qualifications: [{ type: String, required: true }],
        experience: { type: Number }
    },
    employmentHistory: [
        {
            schoolName: { type: String },
            position: { type: String },
            startDate: { type: Date },
            endDate: { type: Date }
        }
    ],
    currentSchool: { type: String },
    achievements: [{ type: String }],
    passedExam: { type: Boolean, default: false },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;