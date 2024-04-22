const pool = require("../db.js");

module.exports.postProject = (req, res) => {
  const query = `INSERT INTO student_projects (student_id, project_id, date_submitted, submission)
  VALUES (student_id, project_id, NOW(), "https://res.cloudinary.com/teepublic/image/private/s--sGu7oerp--/c_crop,x_10,y_10/c_fit,h_983/c_crop,g_north_west,h_1260,w_1260,x_-282,y_-136/co_rgb:d7ecfa,e_colorize,u_Misc:One%20Pixel%20Gray/c_scale,g_north_west,h_1260,w_1260/fl_layer_apply,g_north_west,x_-282,y_-136/bo_157px_solid_white/e_overlay,fl_layer_apply,h_1260,l_Misc:Art%20Print%20Bumpmap,w_1260/e_shadow,x_6,y_6/c_limit,h_1254,w_1254/c_lpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1666879392/production/designs/36003068_0.jpg")
  WHERE student_id = AND project_id =;`;

  pool.execute(query, (err, result) => {
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
