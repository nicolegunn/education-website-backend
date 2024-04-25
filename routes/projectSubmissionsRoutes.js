const express = require("express");
const router = express.Router();
const projectSubmissionsController = require("../controllers/projectSubmissionsController.js");

router.patch("/submit-project", projectSubmissionsController.postProject);
router.get(
  "/project-submissions",
  projectSubmissionsController.getProjectSubmissions
);

module.exports = router;
