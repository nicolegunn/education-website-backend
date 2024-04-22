const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const authenticationRouter = require("./routes/authenticationRoutes.js");
const projectsRouter = require("./routes/projectsRoutes.js");
const projectSubmissionsRouter = require("./routes/projectSubmissionsRoutes.js");
const teacherRouter = require("./routes/teacherRoutes.js");

app.use(authenticationRouter);
app.use(projectsRouter);
app.use(projectSubmissionsRouter);
app.use(teacherRouter);

module.exports = app;
