const { Router } = require('express');
const app = Router();
const uploadImageControllers=require("../controllers/uploadImageControllers")
const multer = require('../middlewares/multer');

app.post('/uploadImage',multer.upload, uploadImageControllers.postImage )

module.exports = app;