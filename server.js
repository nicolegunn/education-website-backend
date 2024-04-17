require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userType = req.body.type;
  let sqlQuery;

  if (userType === "student") {
    sqlQuery = `SELECT student.student_id, student.teacher_id, student.name, student.email, student.school, student.profile_pic, student.date_of_birth,  student.contact_number, student.course, teacher.name AS teacher_name
                  FROM student LEFT JOIN teacher
                  ON student.teacher_id = teacher.teacher_id
                  WHERE student.email = ? AND student.password = ?;`;
  } else if (userType === "teacher") {
    sqlQuery = `SELECT teacher_id, name, email, school, profile_pic, date_of_birth, contact_number
                FROM teacher
                WHERE email = ? AND password = ?`;
  }

  if (email && password) {
    pool.execute(sqlQuery, [email, password], (err, result) => {
      if (err) {
        //handle error however you want to here:
        return res.send({ err: err });
      }
      if (result.length > 0) {
        return res.status(200).send(result);
      } else {
        //could send a status here instead e.g. res.sendStatus(404)
        return res
          .status(404)
          .send({ message: "User name or password incorrect" });
      }
    });
  }
});

app.get("/projects", (req, res) => {
  pool.query("SELECT * FROM project", (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        errorMessage:
          "An error occurred while fetching project data from the database.",
        error: err,
      });
    } else {
      return res.send(result);
    }
  });
});

// app.get("/student/:id", (req, res) => {
//   const id = req.params.id;
//   pool.execute(
//     "SELECT * FROM student WHERE student_id = ?",
//     [id],
//     (err, result) => {
//       if (err) {
//         console.error("Database error:", err);
//         return res.status(500).json({
//           errorMessage:
//             "An error occurred while fetching student data from the database.",
//           error: err,
//         });
//       } else {
//         return res.send(result);
//       }
//     }
//   );
// });
//----Video_tutorial page----------------------------------------

app.get("/projects/:project_id/video_tutorial", (req, res) => {
  const project_id = req.params.project_id;
  pool.execute(
    "SELECT video FROM project WHERE project_id = ?",
    [project_id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({
          errorMessage:
            "An error occurred while fetching student data from the database.",
          error: err,
        });
      } else {
        return res.send(result);
      }
    }
  );
});

//-----------------------------------------------------

// app.get("/teacher/:id", (req, res) => {
//   const id = req.params.id;
//   pool.execute(
//     "SELECT * FROM teacher WHERE teacher_id = ?",
//     [id],
//     (err, result) => {
//       if (err) {
//         console.error("Database error:", err);
//         return res.status(500).json({
//           errorMessage:
//             "An error occurred while fetching teacher data from the database.",
//           error: err,
//         });
//       } else {
//         return res.send(result);
//       }
//     }
//   );
// });

// Route for '/project-submissions' page
app.get("/project-submissions", (req, res) => {
  const id = req.params.id;
  pool.execute(
    "SELECT profile_pic, name, date_submitted, submission FROM student INNER JOIN student_projects ON student.student_id = student_projects.student_id WHERE date_submitted is NOT NULL ORDER BY date_submitted ASC;",
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
});

app.get("/student", (req, res) => {
  const query = "SELECT profile_pic, name, course FROM student;";
  pool.execute(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(results);
  });
});

app
  .listen(PORT, () => {
    console.log(`Server is alive on http://localhost:${PORT}`);
  })
  .on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.log(`PORT ${PORT} is already in use`);
    } else {
      console.log(`Server Error`, error);
    }
  });
