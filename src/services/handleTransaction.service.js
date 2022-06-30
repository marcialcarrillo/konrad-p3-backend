const { addTransaction } = require("./transactions.service");
const { addBalance, deductBalance } = require("./accounts.service");
const { payBill } = require("./bills.service");

const handleExternalTransaction = async (body) => {
    const destinationAccount = body.destinationAccount;
    const amount = body.transferAmount;

    const result = await addTransaction(body);
    await addBalance(destinationAccount, amount);
    return result;
};

const handleInternalTransaction = async (body) => {
    const originAccount = body.originAccount;
    const destinationAccount = body.destinationAccount;
    const amount = body.transferAmount;

    await deductBalance(originAccount, amount);
    const result = await addTransaction(body);
    await addBalance(destinationAccount, amount);
    return result;
};

const handleServiceTransaction = async (body) => {
    const originAccount = body.originAccount;
    const amount = body.transferAmount;

    await deductBalance(originAccount, amount);
    await payBill(body.email, body.destinationAccount);
    const result = await addTransaction(body);
    return result;
};

module.exports = {
    handleExternalTransaction,
    handleInternalTransaction,
    handleServiceTransaction,
};
