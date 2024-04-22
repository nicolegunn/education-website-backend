const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController.js");

router.get("/students", teacherController.getStudents);

module.exports = router;
