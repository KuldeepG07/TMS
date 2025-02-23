const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
    title: {type: String, require: true},
    description: {type: String, require: true},
    vacancy: {type: Number, required: true},
    role: { type: String, enum: ['Teacher', 'Supervisor', 'Principal'] },
    subject: { type: String, default: null },
    schoolName: { type: String, required: true },
    zoneName: { type: String, required: true },
    photo: { type: String, default: 'default.png' },
    posted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    uploadedDate: {type: Date, required: true, default: Date.now }
});

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);
module.exports = JobPosting;