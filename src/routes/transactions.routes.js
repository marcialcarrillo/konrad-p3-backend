const express = require("express");
const transactionRouter = express.Router();
transactionRouter.use(express.json());
const {
    findTransaction,
    getTransactions,
    makeTransaction,
} = require("../services/transactions.service");

transactionRouter
    .get(async (req, res, next) => {
        try {
            const transactions = await getTransactions();
            res.send(transactions);
        } catch (err) {
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const transactionAdded = await addTransaction(req.body);
            res.status(201).send(transactionWithAccounts);
        } catch (err) {
            next(err);
        }
    });

transactionRouter.route("/:account").delete(async (req, res, next) => {
    try {
        const account = req.params.account;
        const transactionDeleted = await deleteTransaction(idNumber);
        // const accountDeleted = await deleteAccount(idNumber);
        !transactionDeleted ? next(customErrors.idError) : res.sendStatus(200);
    } catch (err) {
        throw new Error(err);
    }
});

transactionRouter.route("/login").post(async (req, res, next) => {
    try {
        const token = await loginTransaction(req.body);
        !token ? next(customErrors.loginFailure) : res.send(token);
    } catch (err) {
        next(err);
    }
});

module.exports = transactionRouter;
