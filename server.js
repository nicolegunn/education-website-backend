require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
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

app.get("/", (req, res) => {
  pool.execute("SELECT * FROM project", (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        errorMessage:
          "An error occurred while fetching data from the database.",
        error: err,
      });
    } else {
      res.send(result);
    }
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
