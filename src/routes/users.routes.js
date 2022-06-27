const express = require("express");
const userRouter = express.Router();
userRouter.use(express.json());
const { getUsers, addUser, deleteUser } = require("../services/users.service");
const { customErrors } = require("../helpers/errors.helper");

userRouter
    .route("/signup")

    // .all(async (req, res, next) => {
    //     try {
    //         const user = await findUser(req.body.username);
    //         !user && next(customErrors.usernameTaken);
    //     } catch (err) {
    //         next(err);
    //     }
    // })
    .get(async (req, res, next) => {
        try {
            const users = await getUsers();
            res.send(users);
        } catch (err) {
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            //verify if the user already exists and return an error if they do
            const user = await findUser(req.body.username);
            if (!user) {
                const userAdded = await addUser(req.body);
                res.status(201).send(userAdded);
            } else {
                next(customErrors.usernameTaken);
            }
        } catch (err) {
            console.log("post error: ",err);
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const userDeleted = await deleteUser(username);
            !bookDeleted ? next(customErrors.idError) : res.send(userDeleted);
        } catch (err) {
            throw new Error(err);
        }
    });

    userRouter
        .route("/signup/:id")
        .delete(async (req, res, next) => {
            try {
               const username = req.params.authorsId;
                const userDeleted = await deleteUser(username);
                !bookDeleted
                    ? next(customErrors.idError)
                    : res.send(userDeleted);
            } catch (err) {
                throw new Error(err);
            }
        });

// userRouter.route("/login").post(async (req, res, next) => {
//   try {
//     const token = await loginUser(req.body);
//     !token ? next(customErrors.loginFailure) : res.send(token);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = userRouter;
