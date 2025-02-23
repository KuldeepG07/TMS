const express = require("express");
const trainingProgramController = require("../controllers/trainingprogramController");

const router = express.Router();

router.post('/enroll', trainingProgramController.enrollTeacher);
router.post('/addprogramdoc', trainingProgramController.addTrainingProgramDoc);
router.get('/latesttrainingprgs', trainingProgramController.fetchLatestTrainingPrograms);
router.get('/alltrainingprgs', trainingProgramController.fetchAllTrainingPrograms);
router.get('/gettrainingprograms/:userId', trainingProgramController.getTrainingPrograms);
router.get('/getenrollmentprgs', trainingProgramController.getEnrollmentPrograms);
router.get('/getprogramdocs/:programId', trainingProgramController.getProgramDocsById);

module.exports = router;