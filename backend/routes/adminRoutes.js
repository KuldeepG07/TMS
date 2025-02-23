const express = require("express");
const adminController = require("../controllers/adminController");
const trainingProgramController = require("../controllers/trainingprogramController");

const router = express.Router();

router.post('/login', adminController.loginCheckAdmin);
router.get('/alltrainingprgs', trainingProgramController.fetchAllTrainingPrograms);
router.post('/addtrainingprogram', trainingProgramController.addTrainingProgram);
router.put('/updateprogram/:programid', trainingProgramController.updateTrainingProgram);
router.delete('/deleteprogram/:programid', trainingProgramController.deleteTrainingProgram);

module.exports = router;
