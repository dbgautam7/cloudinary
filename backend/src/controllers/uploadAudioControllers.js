const postAudio = async (req, res, next) => {
  try {
    console.log(req.file, "$");
    res
      .status(200)
      .json({ success: true, message: "Audio uploaded successfully" });
  } catch (error) {
    next(error);
  }
};

exports.postAudio = postAudio;
