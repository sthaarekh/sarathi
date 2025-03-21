const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const app = express();
dotenv.config({ path: "../.env" });

app.use();

app.use(morgan("dev"));
app.use('/api/v1')

app.listen(port, () => {
  console.log(`app currently listening on port number ${port}...`);
});

module.exports = app;
