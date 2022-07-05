const { addTransaction } = require("./transactions.service");
const {
    findAccount,
    addBalance,
    deductBalance,
    verifyAccountOwnership,
} = require("./accounts.service");
const { payBill } = require("./bills.service");
const { findUserWithAccounts } = require("./users.service");
const { ibanToAccNumber } = require("../helpers/accounts.helper");
const { customErrors } = require("../helpers/errors.helper");

const handleExternalTransaction = async (body, email) => {
    const accNumber = ibanToAccNumber(body.originAccount);
    const originAccount = await findAccount(accNumber);
    const amount = body.transferAmount;
    if (originAccount) {
        await deductBalance(accNumber, amount);
    }

    const destinationAccount = body.destinationAccount;

    await addTransaction(body, destinationAccount);
    await addBalance(destinationAccount, amount);
    const result = await findUserWithAccounts(email);
    return result;
};

const handleInternalTransaction = async (body, email) => {
    const originAccount = body.originAccount;
    const match = await verifyAccountOwnership(originAccount, email);
    if (match) {
        //turn the iban into the acc number
        const destinationAccount = ibanToAccNumber(body.destinationAccount);
        const amount = body.transferAmount;

        await deductBalance(originAccount, amount);
        await addTransaction(body, destinationAccount);
        
        //deduct balance if the account exists, otherwise just remove the money
        const accountFound = await findAccount(destinationAccount);
        if (accountFound) {
            await addBalance(destinationAccount, amount);
        }
        const result = await findUserWithAccounts(email);
        return result;
    } else {
        throw customErrors.accNotOfCustomer;
    }
};

const handleServiceTransaction = async (body, email) => {
    const originAccount = body.originAccount;
    const match = await verifyAccountOwnership(originAccount, email);

    if (match) {
        const amount = body.transferAmount;

        await deductBalance(originAccount, amount);
        await payBill(email, body.destinationAccount);
        await addTransaction(body, body.destinationAccount);
        const result = await findUserWithAccounts(email);
        return result;
    } else {
        throw customErrors.accNotOfCustomer;
    }
};

module.exports = {
    handleExternalTransaction,
    handleInternalTransaction,
    handleServiceTransaction,
};
