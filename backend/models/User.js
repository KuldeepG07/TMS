const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: { type: String, required: true, enum: ['Teacher', 'Admin'], default: 'Teacher' },
    admin_role: { type: String, enum: ['Zone Administrator', 'Training Officer', 'Recruitment Officer'], default: null },
    personal_details: {
        name: { type: String, required: true },
        email: { type: String, required: true, match: /^.+@.+\..+$/ },
        contactNumber: { type: String, required: true },
        dob: { type: Date, required: true },
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;