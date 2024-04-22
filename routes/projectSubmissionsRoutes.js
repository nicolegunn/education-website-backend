const express = require("express");
const router = express.Router();
const projectSubmissionsController = require("../controllers/projectSubmissionsController.js");

router.post("/submit-project", projectSubmissionsController.postProject);
router.get(
  "/project-submissions",
  projectSubmissionsController.getProjectSubmissions
);

module.exports = router;
