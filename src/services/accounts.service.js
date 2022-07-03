const { sequelize } = require("../sequelize/index");

const Account = sequelize.models.Account;

const findAccount = async (query) => {
    let account = await Account.findAll(query);
    return account;
};

const getAccounts = async () => {
    const accounts = await Account.findAll();

    return accounts;
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
    const account = await Account.findOne({
        where: { accountNumber: accountNumber },
    });
    const newBalance = account.balance - amount;
    if (newBalance < 0) {
        throw new Error("Not enough funds");
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
};
