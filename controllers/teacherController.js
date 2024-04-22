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

module.exports.getStudentProfileTracker =  (req,res) => {
  const query = "SELECT s.student_id, s.name, COUNT(p.date_completed) AS completed_projects_count, JSON_ARRAYAGG(JSON_OBJECT('project_id', p.project_id, 'project_details', p.date_completed)) AS projects " +
'FROM student s ' +
'JOIN student_projects p ON s.student_id = p.student_id ' +
'GROUP BY s.student_id ' +
'ORDER BY s.student_id;'
  pool.execute(query, (error, results) => {
    if(error) {
      console.error(error);
      return res.status(500).json( { error: "internal Server Error" });
    }
    return res.json(results);
  })
}