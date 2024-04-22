const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController.js");

router.post("/student", teacherController.getStudents);


module.exports = router;
