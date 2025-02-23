const mongoose = require('mongoose');

const trainingProgramDocumentSchema = new mongoose.Schema({
    training_program_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainingProgram', required: true },
    uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: {type: String, required: true},
    file_path: { type: String, required: true },
    uploaded_at: { type: Date, required: true, default: Date.now }
});

const TrainingProgramDocuments = mongoose.model('TrainingProgramDocuments', trainingProgramDocumentSchema);
module.exports = TrainingProgramDocuments;