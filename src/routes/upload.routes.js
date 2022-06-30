const express = require("express");
const uploadRouter = express.Router();
uploadRouter.use(express.json());
// const { upload } = require("../middleware/multer.middleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { customErrors } = require("../helpers/errors.helper");
const { route } = require("./users.routes");

uploadRouter
.route("/").post(upload.single('profileImage'), async (req, res, next) => {
    console.log("in uploads:", req.file);
    res.send("Profile Image uploaded!");
});

module.exports = uploadRouter;