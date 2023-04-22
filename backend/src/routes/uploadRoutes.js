const { Router } = require("express");
const app = Router();
const uploadImageReactNodeControllers = require("../controllers/uploadImageReactNodeControllers");
const uploadImageControllers = require("../controllers/uploadImageControllers");
const uplaodFileControllers = require("../controllers/uploadFileControllers");
const uploadAudioControllers = require("../controllers/uploadAudioControllers");
const reactNodeMulter = require("../middlewares/reactNodeMulter");
const multer = require("../middlewares/multer");
const multerFile = require("../middlewares/multerFile");
const multerAudio = require("../middlewares/multerAudio");

app.post("/uploadImages", multer.upload, uploadImageControllers.postImages);
app.post(
  "/upload",
  reactNodeMulter.upload,
  uploadImageReactNodeControllers.postImage
);

app.post("/file", multerFile.upload, uplaodFileControllers.postFile);

app.post("/audio", multerAudio.upload, uploadAudioControllers.postAudio);

module.exports = app;
