const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    job_posting_id: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting', required: true },
    status: { type: String, enum: ['Applied', 'Under review', 'Rejected', 'Hired'], required: true },
    applied_at: { type: Date, default: Date.now }
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
