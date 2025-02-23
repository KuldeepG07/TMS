const userService = require("../services/userService");
const teacherService = require("../services/teacherService");
const jwt = require("jsonwebtoken");
const { Console } = require("console");

const createUser = async (req, res) => {
  try {
    const formData = req.body;
    const { username, password, name, email, contactNumber, dob } = req.body;
    const personal_details = {
      name: name,
      email: email,
      contactNumber: contactNumber,
      dob: dob
    }
    const user = await userService.createUser({
      username,
      password,
      personal_details,
    });

    const user_id = user._id;

    if (formData.experience == null) {
      formData.experience = null;
      formData.employmentHistory = [];
      formData.currentSchool = null;
    }

    const { address, profilePicture, qualifications, experience, employmentHistory, currentSchool, achievements, passedExam } = req.body;
    const personalInfo = {
      address: address,
      profile_picture: profilePicture
    };

    const professionalInfo = {
      qualifications: qualifications,
      experience: experience
    };

    const teacher = await teacherService.createTeacher({
      user_id,
      personalInfo,
      professionalInfo,
      employmentHistory,
      currentSchool,
      achievements,
      passedExam
    });

    res.status(201).json({ status: true, message: "User created successfully", teacher: teacher });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const updateUserData = async (req, res) => {
  try {
    const userid = req.params.userId;
    const { userDetails, teacherDetails } = req.body;
    const isSavedUser = await userService.updateUser(userid, userDetails);
    if(!isSavedUser) {
      return res.status(200).json({ status: false, message: "Failed to update User!"});
    }
    const teacher = await teacherService.getTeacherById(userid);
    const isSavedTeacher = await teacherService.updateTeacher(teacher._id, teacherDetails);
    if(!isSavedTeacher) {
      return res.status(200).json({ status: false, message: "Failed to update Teacher!"});
    }
    return res.status(200).json({ status: true, message: "Profile Updated Successfully!"});
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userService.getUser(username);
    if (!user) {
      return res.status(400).json({ status: false, message: "Invalid email or password" });
    }

    if (!(user.password == password)) {
      return res.status(400).json({ status: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.status(200).json({ status: true, token, username: user.username, name: user.personal_details.name, userid: user._id, email: user.personal_details.email, contactNumber: user.personal_details.contactNumber, dob: user.personal_details.dob });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Server error " + error.message });
  }
};

const getUserAndTeacheData = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userid);
    const teacher = await teacherService.getTeacherById(req.params.userid);

    if (!user) return res.status(404).json({ status: false, message: 'User not found' });

    res.status(200).json({ status: true, user, teacher });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const getTeacherByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const teacher = await teacherService.getTeacherById(userId);
    if (!teacher) {
      return res.json({ status: false, message: 'No teacher found for this user' });
    }
    res.json({ status: true, teacher: teacher });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server Error: ' + error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const canApplyForJob = async (req, res) => {
  try {
    const teacher = await teacherService.getTeacherById(req.params.userId);
    if (!teacher) {
      return res.status(404).json({ status: false, message: "Teacher not found" });
    }
    if (teacher.currentSchool) {
      return res.status(403).json({ status: false, message: "You already have a job and cannot apply." });
    }
    return res.status(200).json({ status: true, message: "You can apply for the job." });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error " + error.message });
  }
};

module.exports = {
  createUser,
  updateUserData,
  loginUser,
  getAllUsers,
  getUserAndTeacheData,
  getTeacherByUserId,
  canApplyForJob,
};
