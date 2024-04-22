const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController.js");

router.get("/students", teacherController.getStudents);
router.get("/student-progress-tracker", teacherController.getStudentProfileTracker);

module.exports = router;



