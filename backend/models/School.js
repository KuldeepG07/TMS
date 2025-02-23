const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name: String,
    address: String,
    zone_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone' },
    school_type: { type: String, enum: ['primary', 'secondary'] }
});

const School = mongoose.model('School', schoolSchema);
module.exports = School;