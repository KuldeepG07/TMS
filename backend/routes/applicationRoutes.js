const express = require("express");
const applicationController = require("../controllers/applicationController");

const router = express.Router();

router.post('/applyjob', applicationController.applyJobApplication);
router.get('/checkapplication/:userId/:jobId', applicationController.checkApplication);
router.get('/getappliedjobs', applicationController.getAppliedJobPostings);

module.exports = router;