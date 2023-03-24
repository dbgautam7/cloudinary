const multer  = require('multer')
const path=require('path')

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, path.join(__dirname, '..', 'uploads'))
    // },
    destination:"",
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

// const upload = multer({
//     storage: multer.memoryStorage()
//   }).single('image');

  const upload = multer({ storage: storage }).array('images',10) //for multiple images upload

  exports.upload = upload;