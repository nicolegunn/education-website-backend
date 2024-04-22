const pool = require("../db.js");

module.exports.postLogin = (req, res) => {
  const { email, password, type } = req.body;

  let sqlQuery;

  if (type === "student") {
    sqlQuery = `SELECT student.student_id, student.teacher_id, student.name, student.email, student.school, student.profile_pic, student.date_of_birth,  student.contact_number, student.course, teacher.name AS teacher_name
                  FROM student LEFT JOIN teacher
                  ON student.teacher_id = teacher.teacher_id
                  WHERE student.email = ? AND student.password = ?;`;
  } else if (type === "teacher") {
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
};

module.exports.postSignup = (req, res) => {
  const {
    name,
    email,
    password,
    school,
    profile_pic,
    date_of_birth,
    contact_number,
    type,
  } = req.body;

  let columns =
    "name, email, password, school, profile_pic, date_of_birth, contact_number";
  let parameters = "?, ?, ?, ?, ?, ?, ?";
  let values = `"${name}", "${email}", "${password}", "${school}", "${profile_pic}", "${date_of_birth}", "${contact_number}"`;

  if (type === "student") {
    columns = columns + ", course, teacher_id";
    parameters = parameters + ", ?, ?";
    values = values + `, "${req.body.course}", ${req.body.teacher_id}`;
  }

  const sqlQuery = `INSERT INTO ${type} (${columns}) VALUES(${values});`;

  if (name && email && password) {
    pool.query(sqlQuery, (err, result) => {
      if (err) {
        return res.status(500).send({ err: err });
      }
      return res.status(200).send({ message: "User registered successfully" });
    });
  } else {
    return res.status(400).send({ message: "Please fill all the fields" });
  }
};
