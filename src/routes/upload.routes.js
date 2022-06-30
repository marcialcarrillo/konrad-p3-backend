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
    .route("/:id")
    .get(async (req, res, next) => {
        const filename = req.params.id;
        res.sendFile(`uploads/${filename}`, { root: "." });
        // res.sendFile(`uploads/${filename}`, { root: "." });
        // console.log("in uploads:", req.file.filename);
        // saveImagePath(email, req.file.filename);
        // res.send("Profile Image uploaded!");
    })
    .post(upload.single("profileImage"), async (req, res, next) => {
        const email = req.params.id;
        console.log("in uploads:", req.file.filename);
        saveImagePath(
            email,
            `http://127.0.0.1:3002/uploads/${req.file.filename}`
        );
        res.send("Profile Image uploaded!");
    });

module.exports = uploadRouter;
