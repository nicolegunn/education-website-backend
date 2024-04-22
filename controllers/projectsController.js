const pool = require("../db.js");

module.exports.getProjects = (req, res) => {
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
};

module.exports.getProjectVideo = (req, res) => {
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
};

module.exports.getProjectInstructions = (req, res) => {
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
};

module.exports.getProjectLearningObjectives = (req, res) => {
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
};
