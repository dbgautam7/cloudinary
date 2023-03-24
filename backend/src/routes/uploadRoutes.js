const { Router } = require('express');
const app = Router();
const uploadImageControllers=require("../controllers/uploadImageControllers")
const multer = require('../middlewares/multer');

app.post('/uploadImages',multer.upload, uploadImageControllers.postImages )

module.exports = app;