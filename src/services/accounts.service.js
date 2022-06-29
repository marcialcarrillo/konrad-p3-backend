const { Account } = require("../models/users.model");

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
    // const account = await Account.findOne({ where: { accountNumber: accountNumber } });
    // const newBalance = account.balance + amount;
    // account.balance = newBalance;
    // // account.balance += Number(amount);
    // await account.save();
    const account = await Account.increment(
        { balance: amount },
        { where: { accountNumber: accountNumber } }
    );
    return account;
};

const deductBalance = async (accountNumber, amount) => {
    // const account = await Account.findOne({ where: { accountNumber: accountNumber } });
    // if (account.balance >= Number(amount)) {
    //     account.balance -= Number(amount);
    //     await account.save();
    //     return account;
    // } else {
    //     throw new Error("Not enough funds");
    // }
    const account = await Account.decrement(
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
