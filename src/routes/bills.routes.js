const express = require("express");
const billRouter = express.Router();
billRouter.use(express.json());

const {
    findBills,
    payBill,
    createBills,
} = require("../services/bills.service");

const { customErrors } = require("../helpers/errors.helper");
const authenticateUser = require("../middleware/authorization.middleware");


billRouter
    .use(authenticateUser)
    .route("/")
    .get(async (req, res, next) => {
        try {
            const email = req.userEmail;
            const bills = await findBills(email);
            res.send(bills);
        } catch (err) {
            next(err);
        }
    });

module.exports = billRouter;
