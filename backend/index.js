const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./src/routes/uploadRoutes");
const locationRoute = require("./src/routes/locationRoute");

const app = express();
app.use(express.json());
app.use(cors());
app.use(uploadRoutes);
app.use(locationRoute);

const connect = require("./src/db/connect");
connect();

require("dotenv").config();

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
