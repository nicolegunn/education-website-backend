const pool = require("../db.js");

module.exports.postProject = (req, res) => {
  let submission = req.body.submission
  console.log(req.body);
  let student_id = req.body.student_id
  let project_id = req.body.project_id

  const query = `UPDATE student_projects SET date_submitted = NOW(), submission = ? WHERE (student_id = ?) AND (project_id = ?)`;

  pool.execute(query, [submission, student_id, project_id], (err, result) => {
    if (err) {
      console.log("Database error:", err);
      return res.status(500).json({
        errorMessage:
          "An error occurred while fetching project data from the database.",
      });
    }
  });
};

module.exports.getProjectSubmissions = (req, res) => {
  const id = req.params.id;
  pool.execute(
    "SELECT student.student_id, profile_pic, name, date_submitted, submission FROM student INNER JOIN student_projects ON student.student_id = student_projects.student_id WHERE date_submitted is NOT NULL ORDER BY date_submitted DESC;",
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({
          errorMessage:
            "An error occurred while fetching project submissions data from the database.",
          error: err,
        });
      } else {
        return res.send(result);
      }
    }
  );
};
