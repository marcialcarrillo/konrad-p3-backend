const multer = require("multer");
var path = require("path");

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: fileStorageEngine });

module.exports = { upload };
