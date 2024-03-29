const express = require("express");
const userRouter = express.Router();
const { Op } = require("sequelize");
userRouter.use(express.json());
const {
    findUser,
    getUsers,
    deleteUser,
    loginUser,
    addUserAndAccount,
    findUserWithAccounts,
} = require("../services/users.service");

const { createBills } = require("../services/bills.service");

const { customErrors } = require("../helpers/errors.helper");
const jwt = require("jsonwebtoken");
const authenticateUser = require("../middleware/authorization.middleware");
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
            //TODO: use OR operator
            let user = await findUser({
                where: {
                    [Op.or]: [
                        { email: req.body.email },
                        { idNumber: req.body.idNumber },
                    ],
                },
            });
            if (!user) {
                //not found, add him
                await addUserAndAccount(req.body);
                createBills(req.body.email);
                const result = await findUserWithAccounts(req.body.email);
                res.status(201).send(result);
            } else {
                next(customErrors.userTaken);
            }
        } catch (err) {
            next(err);
        }
    });

let cookieObj = {
    sameSite: process.env.PLATFORM === "AD" ? "none" : "lax",
    httpOnly: true,
    secure: process.env.COOKIES_SECURE_FLAG === "true",
};

userRouter.route("/login").post(async (req, res, next) => {
    try {
        let user = await findUser({ where: { email: req.body.email } });
        if (user) {
            const token = await loginUser(req.body);
            !token
                ? next(customErrors.loginFailure)
                : res
                      .cookie("access_token", token, cookieObj)
                      .send({ token: token });
        } else {
            next(customErrors.loginFailure);
        }
    } catch (err) {
        next(err);
    }
});

userRouter
    .use(authenticateUser)
    .route("/logout")
    .get(async (req, res, next) => {
        return res
            .clearCookie("access_token")
            .json({ message: "Successfully logged out" });
    });

userRouter
    .use(authenticateUser)
    .route("/account")
    .delete(async (req, res, next) => {
        try {
            const idNumber = req.params.id;
            const userDeleted = await deleteUser(idNumber);
            // const accountDeleted = await deleteAccount(idNumber);
            !userDeleted ? next(customErrors.idError) : res.sendStatus(200);
        } catch (err) {
            throw new Error(err);
        }
    })
    .get(async (req, res, next) => {
        try {
            const email = req.userEmail;
            let user = await findUserWithAccounts(email);
            !user ? next(customErrors.idError) : res.send(user);
        } catch (err) {
            throw new Error(err);
        }
    });

module.exports = userRouter;
