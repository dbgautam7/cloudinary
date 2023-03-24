const cloudinary = require('../utils/cloudinary');
const path = require('path');

const postImage = async (req, res, next) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(path.join(__dirname, '..', 'uploads', req.file.filename));

    // Return URL of uploaded file
    res.json({ url: result.secure_url });
  } catch (error) {
    next(error);
  }
}

exports.postImage = postImage;
