const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    training_program_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainingProgram' },
    enrolledDate: { type: Date, default: Date.now }
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
module.exports = Enrollment;