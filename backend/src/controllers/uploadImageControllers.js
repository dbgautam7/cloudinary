const cloudinary = require('../utils/cloudinary');
const path = require('path');

const postImages = async (req, res, next) => {
  try {
    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    // Upload files to Cloudinary
    const urls = [];
    const errors = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'myPhotos'
      });
      urls.push(result.secure_url);
    }

    // Return URLs of uploaded files
    res.json({ urls,errors });
  } catch (error) {
    next(error);
  }
};

exports.postImages = postImages;
