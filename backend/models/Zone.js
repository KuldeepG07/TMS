const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
    name: String
});

const Zone = mongoose.model('Zone', zoneSchema);
module.exports = Zone;