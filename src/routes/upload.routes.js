const express = require("express");
const uploadRouter = express.Router();
uploadRouter.use(express.json());
// const { upload } = require("../middleware/multer.middleware");
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const { upload } = require("../middleware/multer.middleware");
const { saveImagePath } = require("../services/users.service");
const { customErrors } = require("../helpers/errors.helper");
const { route } = require("./users.routes");

uploadRouter
    .route("/")
    .post(upload.single("idImage"), async (req, res, next) => {
        res.send({"url" : `http://127.0.0.1:3002/uploads/${req.file.filename}`});
    });

uploadRouter.route("/:id").get(async (req, res, next) => {
    const filename = req.params.id;
    res.sendFile(`uploads/${filename}`, { root: "." });
});

module.exports = uploadRouter;
