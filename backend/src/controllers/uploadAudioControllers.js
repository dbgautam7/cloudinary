const Audio = require("../models/Audio");
const fs = require("fs");

const postAudio = async (req, res, next) => {
  console.log(req.file, "$$$$$");
  try {
    if (
      (req.file && req.file.mimetype === "audio/mpeg") ||
      req.file.mimetype === "audio/mp3" ||
      req.file.mimetype === "audio/mp4"
    ) {
      const data = await Audio.create({ audio: req.file.filename });
      if (data) {
        console.log(data, "data");
        res
          .status(200)
          .json({ success: true, message: "Audio uploaded successfully" });
        // fs.unlinkSync(req.file.path);
      } else {
        console.log({ success: false, message: "Unable to upload audio" });
      }
    } else {
      console.log({ success: false, message: "Format does not match" });
    }
  } catch (error) {
    next(error);
  }
};

exports.postAudio = postAudio;
