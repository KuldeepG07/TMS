const adminService = require('../services/adminService');
const userService = require('../services/userService');
const jwt = require("jsonwebtoken");
const { Console } = require("console");

const loginCheckAdmin = async (req, res) => {
    try {
        const { username, password, admin_role } = req.body;
        const admin = await userService.getUser(username);
        if (!admin) {
            return res.status(200).json({ status: false, message: "Invalid Username!" });
        }
        if (!(admin.password == password)) {
            return res.status(200).json({ status: false, message: "Invalid Password!" });
        }
        if (!(admin.admin_role == admin_role)) {
            return res.status(200).json({ status: false, message: "Invalid Role!" });
        }
        const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).json({ status: true, token, username: admin.username, name: admin.personal_details.name, email: admin.personal_details.email,  message: "Logged In Successfully..!", adminid: admin._id, admin});
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Error during login' + error.message });
    }
};

module.exports = {
    loginCheckAdmin,
};
