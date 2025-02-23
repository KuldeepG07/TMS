const User = require("../models/User");

const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

const getUser = async (username) => {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    throw new Error("Error while login User: " + error.message);
  }
}

const updateUser = async (userid, userData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userid, {personal_details: userData},{ new: true, runValidators: true});
    if(updatedUser){
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("Error while updating User: " + error.message);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error("Error while fetching User: " + error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  getUserById,
  getAllUsers,
};
