const cloudinary = require("../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const postImage = async (req, res, next) => {
  try {
    console.log(req.file, "$");
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ReactNodePhotos",
    });
    res.status(200).json({ url: result.secure_url });
    console.log(result.secure_url, "%%");
    // fs.unlinkSync(req.file.path);  // Delete the temporary file from the local folder after the image has been uploaded to Cloudinary.
  } catch (error) {
    next(error);
  }
};

exports.postImage = postImage;
