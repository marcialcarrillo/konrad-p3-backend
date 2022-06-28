const express = require("express");
const userRouter = express.Router();
userRouter.use(express.json());
const {
    findUser,
    getUsers,
    addUser,
    deleteUser,
    loginUser,
    addUserAndAccount,
} = require("../services/users.service");
// const { addAccount, deleteAccount } = require("../services/accounts.service");
const getUserWithAccounts = require("../helpers/userWithAccounts.helper");
const { customErrors } = require("../helpers/errors.helper");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

userRouter
    .route("/signup")
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
            let user = await findUser({ where: { email: req.body.email } });
            if (!user) {
                //try to find him by his id
                user = await findUser({
                    where: { idNumber: req.body.idNumber },
                });
            }
            if (!user) {
                //not found, add him
                const userAdded = await addUserAndAccount(req.body);
                res.status(201).send(userAdded);
            } else {
                next(customErrors.userTaken);
            }
        } catch (err) {
            console.log("post error: ", err);
            next(err);
        }
    });

userRouter.route("/signup/:id").delete(async (req, res, next) => {
    try {
        const idNumber = req.params.id;
        const userDeleted = await deleteUser(idNumber);
        // const accountDeleted = await deleteAccount(idNumber);
        !userDeleted ? next(customErrors.idError) : res.sendStatus(200);
    } catch (err) {
        throw new Error(err);
    }
});

userRouter.route("/login").post(async (req, res, next) => {
  try {
    const token = await loginUser(req.body);
    !token ? next(customErrors.loginFailure) : res.send(token);
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
