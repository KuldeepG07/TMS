const express = require("express");
const authMiddleware = require("../authmiddleware");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/dashboard", authMiddleware, (req,res) => {
    res.json({ message: "Welcome to Dashboard."});
});
router.get('/canapply/:userId', userController.canApplyForJob);
router.get('/getteacherbyuserid/:userId', userController.getTeacherByUserId);
router.get('/getmergeduser/:userid', userController.getUserAndTeacheData);
router.post('/updateprofile/:userId', userController.updateUserData);

// router.get("/users", userController.getAllUsers);

module.exports = router;
