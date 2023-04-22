const cloudinary = require("../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const postFile = async (req, res, next) => {
  try {
    console.log(req.file, req.file.path, "$");
    const result = await cloudinary.uploader.upload(req.file.path, {
      // resource_type: "video",
      folder: "files",
    });
    res.status(200).json({ url: result.secure_url });
    console.log(result.secure_url, "%%");
    // fs.unlinkSync(req.file.path);  // Delete the temporary file from the local folder after the image has been uploaded to Cloudinary.
  } catch (error) {
    next(error);
  }
};

exports.postFile = postFile;
