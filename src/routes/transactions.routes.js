const express = require("express");
const transactionRouter = express.Router();
transactionRouter.use(express.json());
const {
    getAllTransactions,
    getTransactionsByAccNumber,
    addTransaction,
} = require("../services/transactions.service");

transactionRouter
    .route("/")
    .get(async (req, res, next) => {
        try {
            const transactions = await getAllTransactions();
            res.send(transactions);
        } catch (err) {
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const transactionAdded = await addTransaction(req.body);
            res.status(201).send(transactionAdded);
        } catch (err) {
            next(err);
        }
    });

// transactionRouter.route("/:account").delete(async (req, res, next) => {
//     try {
//         const account = req.params.account;
//         const transactionDeleted = await deleteTransaction(idNumber);
//         // const accountDeleted = await deleteAccount(idNumber);
//         !transactionDeleted ? next(customErrors.idError) : res.sendStatus(200);
//     } catch (err) {
//         throw new Error(err);
//     }
// });

module.exports = transactionRouter;
