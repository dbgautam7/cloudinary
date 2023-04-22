const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Add mimetype check here
    if (
      file.mimetype === "audio/mpeg" ||
      file.mimetype === "audio/mp3" ||
      file.mimetype === "audio/mp4"
    ) {
      cb(null, "../frontend/audio");
    } else {
      console.log("Unformatted audio");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("audioFile");
exports.upload = upload;
