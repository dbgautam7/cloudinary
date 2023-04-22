const Audio = require("../models/Audio");
const fs = require("fs");

const postAudio = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

exports.postAudio = postAudio;
