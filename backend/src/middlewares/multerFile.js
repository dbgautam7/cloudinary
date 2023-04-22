const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "file/"); // Use a callback function to specify the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  if (
    file.originalname.match(/\.(jpg|jpeg|png|gif|mp3|mp4|mkv|pdf|MOV|JPG|MP4)$/)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Please upload a valid file"));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1024,
  },
  fileFilter: fileFilter, // Apply file filter to only allow specified file formats
}).single("file");
exports.upload = upload;
