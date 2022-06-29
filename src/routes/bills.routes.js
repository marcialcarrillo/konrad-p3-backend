const express = require("express");
const billRouter = express.Router();
billRouter.use(express.json());

const {
    findBills,
    payBill,
    createBills,
} = require("../services/bills.service");
const { customErrors } = require("../helpers/errors.helper");

billRouter.route("/").get(async (req, res, next) => {
    try {
        const accounts = await getAccounts();
        res.send(accounts);
    } catch (err) {
        next(err);
    }
});
