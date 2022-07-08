const { sequelize } = require("../sequelize/index");
const { customErrors } = require("../helpers/errors.helper");

const Account = sequelize.models.Account;

const findAccount = async (accountNumber) => {
    const account = await Account.findByPk(accountNumber);
    return account;
};

const getAccounts = async () => {
    const accounts = await Account.findAll();

    return accounts;
};

const verifyAccountOwnership = async (accountNumber, email) => {
    return await Account.findOne({
        where: { accountNumber: accountNumber, UserEmail: email },
    });
};

const addAccount = async (body) => {
    const newAccount = await Account.create({
        accountOwnerId: body.idNumber,
        accountCountry: body.accountCountry,
        currency: body.currency,
        balance: 0.0,
    });

    return newAccount;
};

const deleteAccount = async (idNumber) => {
    const deletedAccount = await Account.destroy({
        where: { accountOwnerId: idNumber },
    });
    return deletedAccount;
};

const addBalance = async (accountNumber, amount) => {
    const account = await Account.increment(
        { balance: amount },
        { where: { accountNumber: accountNumber } }
    );
    return account;
};

const deductBalance = async (accountNumber, amount) => {
    //check if the origin account has enough balance, throw an error otherwise
    const account = await Account.findByPk(accountNumber);
    if (!account) {
        throw customErrors.accNotFound;
    }
    const newBalance = account.balance - amount;
    if (Number(newBalance) < 0) {
        throw customErrors.notEnoughFunds;
    }

    await Account.decrement(
        { balance: amount },
        { where: { accountNumber: accountNumber } }
    );
    return account;
};

module.exports = {
    findAccount,
    getAccounts,
    addAccount,
    deleteAccount,
    addBalance,
    deductBalance,
    verifyAccountOwnership,
};
