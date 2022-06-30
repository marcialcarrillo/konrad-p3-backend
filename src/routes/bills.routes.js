const express = require("express");
const billRouter = express.Router();
billRouter.use(express.json());

const {
    findBills,
    payBill,
    createBills,
} = require("../services/bills.service");

const { customErrors } = require("../helpers/errors.helper");

// billRouter.route("/").delete(async (req, res, next) => {
//     try {
//         const email = req.body.email;
//         const serviceName = req.body.serviceName;
//         const billPaid = await payBill(email, serviceName);
//         res.send(billPaid);
//     } catch (err) {
//         next(err);
//     }
// });

billRouter.route("/:email").get(async (req, res, next) => {
    try {
        const email = req.params.email;
        const bills = await findBills(email);
        res.send(bills);
    } catch (err) {
        next(err);
    }
});

module.exports = billRouter;
