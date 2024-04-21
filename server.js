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

////Handle Signup//// 58-79////

// app.post("/signup", (req, res) => {
//   const { name, email, password, userType } = req.body;
//   let sqlQuery;

//   if (userType === "student") {
//     sqlQuery = `INSERT INTO student (name, email, password) VALUES (?, ?, ?)`;
//   } else if (userType === "teacher") {
//     sqlQuery = `INSERT INTO teacher (name, email, password) VALUES (?, ?, ?)`;
//   }

//   if (name && email && password) {
//     pool.execute(sqlQuery, [name, email, password], (err, result) => {
//       if (err) {
//         return res.status(500).send({ err: err });
//       }
//       return res.status(200).send({ message: "User registered successfully" });
//     });
//   } else {
//     return res.status(400).send({ message: "Please fill all the fields" });
//   }
// });

/////////////////////////////////

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
//----------Route for Instructions Page-------------------------------------------
app.get("/projects/:project_id/instructions", (req, res) => {
  const project_id = req.params.project_id;
  pool.execute(
    "SELECT instructions FROM project WHERE project_id = ?",
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
//--------------Route for Learning Objective Page--------------------------------
app.get("/projects/:project_id/learning_objective", (req, res) => {
  const project_id = req.params.project_id;
  pool.execute(
    "SELECT learning_objective FROM project WHERE project_id = ?",
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


// POST for '/submit-project' page
app.post("/submit-project", (req, res) => {
  
  const query = `INSERT INTO student_projects (student_id, project_id, date_submitted, submission)
  VALUES (student_id, project_id, NOW(), "https://res.cloudinary.com/teepublic/image/private/s--sGu7oerp--/c_crop,x_10,y_10/c_fit,h_983/c_crop,g_north_west,h_1260,w_1260,x_-282,y_-136/co_rgb:d7ecfa,e_colorize,u_Misc:One%20Pixel%20Gray/c_scale,g_north_west,h_1260,w_1260/fl_layer_apply,g_north_west,x_-282,y_-136/bo_157px_solid_white/e_overlay,fl_layer_apply,h_1260,l_Misc:Art%20Print%20Bumpmap,w_1260/e_shadow,x_6,y_6/c_limit,h_1254,w_1254/c_lpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1666879392/production/designs/36003068_0.jpg")
  WHERE student_id = AND project_id =;`

  pool.execute(query, (err, result) => {
    if (err) {
      console.log("Database error:", err);
      return res.status(500).json({
        errorMessage:
          "An error occurred while fetching project data from the database.",
      })
    }
  })
})

// GET for '/project-submissions' page
app.get("/project-submissions", (req, res) => {
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
