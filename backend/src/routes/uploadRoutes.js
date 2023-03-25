const { Router } = require('express');
const app = Router();
const uploadImageReactNodeControllers=require("../controllers/uploadImageReactNodeControllers")
const reactNodeMulter = require('../middlewares/reactNodeMulter');

// app.post('/uploadImages',multer.upload, uploadImageControllers.postImages )s
app.post('/upload',reactNodeMulter.upload, uploadImageReactNodeControllers.postImage )

module.exports = app;