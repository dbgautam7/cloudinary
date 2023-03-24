const express = require("express");
const cors = require('cors')
const uploadRouter=require("./src/routes/uploadRoutes")

const app = express();
app.use(express.json())
app.use(cors())
app.use(uploadRouter)
require('dotenv').config()

const port = process.env.PORT || 7000

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});