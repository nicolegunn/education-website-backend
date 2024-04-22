const pool = require("../db.js");

module.exports.getStudents = (req, res) => {
  const query = "SELECT profile_pic, name, course FROM student;";
  pool.execute(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(results);
  });
};