const { addTransaction } = require("./transactions.service");
const { addBalance, deductBalance } = require("./accounts.service");
const { payBill } = require("./bills.service");
const { findUserWithAccounts } = require("./users.service");
const { ibanToAccNumber } = require("../helpers/accounts.helper");

const handleExternalTransaction = async (body, email) => {
    const destinationAccount = body.destinationAccount;
    const amount = body.transferAmount;

    await addTransaction(body, destinationAccount);
    await addBalance(destinationAccount, amount);
    const result = await findUserWithAccounts(email);
    return result;
};

const handleInternalTransaction = async (body, email) => {
    const originAccount = body.originAccount;

    //turn the iban into the acc number
    const destinationAccount = ibanToAccNumber(body.destinationAccount);
    const amount = body.transferAmount;

    await deductBalance(originAccount, amount);
    await addTransaction(body, destinationAccount);
    await addBalance(destinationAccount, amount);
    const result = await findUserWithAccounts(email);
    return result;
};

const handleServiceTransaction = async (body, email) => {
    const originAccount = body.originAccount;
    const amount = body.transferAmount;

    await deductBalance(originAccount, amount);
    await payBill(body.email, body.destinationAccount);
    await addTransaction(body, body.destinationAccount);
    const result = await findUserWithAccounts(email);
    return result;
};

module.exports = {
    handleExternalTransaction,
    handleInternalTransaction,
    handleServiceTransaction,
};
