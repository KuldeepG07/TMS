const mongoose = require('mongoose');

const trainingProgramSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    photo: {type: String, required: true ,default: 'default.png'},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    posted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const TrainingProgram = mongoose.model('TrainingProgram', trainingProgramSchema);
module.exports = TrainingProgram;