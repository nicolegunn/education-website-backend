require("dotenv").config();
const app = require("./index.js");

const PORT = process.env.PORT;

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
