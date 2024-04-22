const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController.js");

router.get("/student", teacherController.getStudents);

module.exports = router;
