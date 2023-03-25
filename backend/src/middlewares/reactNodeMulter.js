const multer = require('multer')

const storage = multer.diskStorage({
    destination: "",
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({storage:storage}).single('image')
exports.upload = upload;