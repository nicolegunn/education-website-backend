
const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController.js");

router.get("/projects", projectsController.getProjects);
router.get(
  "/projects/:project_id/video_tutorial",
  projectsController.getProjectVideo
);
router.get(
  "/projects/:project_id/instructions",
  projectsController.getProjectInstructions
);
router.get(
  "/projects/:project_id/learning_objective",
  projectsController.getProjectLearningObjectives
);

module.exports = router