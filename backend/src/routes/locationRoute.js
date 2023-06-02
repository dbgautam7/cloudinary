const { Router } = require("express");
const app = Router();
const uploadLocationController = require("../controllers/uploadLocationController");

app.post("/location", uploadLocationController.postLocation);

module.exports = app;
