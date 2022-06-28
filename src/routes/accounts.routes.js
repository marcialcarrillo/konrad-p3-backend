const express = require("express");
const accountRouter = express.Router();
accountRouter.use(express.json());
const {
    getAccounts,
    deleteAccount,
} = require("../services/accounts.service");
const { customErrors } = require("../helpers/errors.helper");

accountRouter
    .route("/")
    .get(async (req, res, next) => {
        try {
            const accounts = await getAccounts();
            res.send(accounts);
        } catch (err) {
            next(err);
        }
    })

accountRouter.route("/:id").delete(async (req, res, next) => {
    try {
        const email = req.params.id;
        const accountDeleted = await deleteAccount(email);
        !accountDeleted ? next(customErrors.idError) : res.sendStatus(200);
    } catch (err) {
        throw new Error(err);
    }
});


module.exports = accountRouter;
