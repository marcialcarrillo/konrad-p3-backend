const express = require("express");
const userRouter = express.Router();
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
            let user = await findUser({ where: { email: req.body.email } });
            if (!user) {
                //try to find him by his id
                user = await findUser({
                    where: { idNumber: req.body.idNumber },
                });
            }
            if (!user) {
                //not found, add him
                createBills(req.body.email);
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

userRouter
    .route("/signup/:id")
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
            const id = req.params.id;
            let user = await findUserWithAccounts(id);
            !user ? next(customErrors.idError) : res.send(user);
        } catch (err) {
            throw new Error(err);
        }
    });

userRouter.route("/login").post(async (req, res, next) => {
    try {
        
        let user = await findUser({ where: { email: req.body.email } });
        if (user) {
            const token = await loginUser(req.body);
            !token ? next(customErrors.loginFailure) : res.send({token: token});
        } else {
            next(customErrors.loginFailure);
        }
    } catch (err) {
        next(err);
    }
});

module.exports = userRouter;
