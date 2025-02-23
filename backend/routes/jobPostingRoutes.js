const express = require("express");
const jobPostingController = require("../controllers/jobPostingController");

const router = express.Router();

router.post('/addjobpost', jobPostingController.addNewJobPost);
router.get('/getjobbyid/:jobId', jobPostingController.getJobPostingById);
router.get('/getrecentjobpostings', jobPostingController.getRecentJobostings);
router.get('/getalljobpostings', jobPostingController.getAllJobostings);

module.exports = router;