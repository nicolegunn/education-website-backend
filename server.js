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

app.get("/projects", (req, res) => {
  pool.execute("SELECT * FROM project", (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        errorMessage:
          "An error occurred while fetching project data from the database.",
        error: err,
      });
    } else {
      res.send(result);
    }
  });
});


app.get("/student/:id", (req, res) => {
  const id = req.params.id;
  pool.execute(
    "SELECT * FROM student WHERE student_id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({
          errorMessage:
            "An error occurred while fetching student data from the database.",
          error: err,
        });
      } else {
        res.send(result);
      }
    }
  );
});
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
        res.send(result);
      }
    }
  );
});

//-----------------------------------------------------


app.get("/teacher/:id", (req, res) => {
  const id = req.params.id;
  pool.execute(
    "SELECT * FROM teacher WHERE teacher_id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({
          errorMessage:
            "An error occurred while fetching teacher data from the database.",
          error: err,
        });
      } else {
        res.send(result);
      }
    }
  );
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
