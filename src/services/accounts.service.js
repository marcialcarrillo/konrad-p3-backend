const { Account } = require("../../archive/users.model");

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

const addBalance = async (iban, amount) => {
    const account = await Account.findOne({ where: { iban: iban } });
    account.balance += amount;
    await account.save();
    return account;
};

const deductBalance = async (iban, amount) => {
    const account = await Account.findOne({ where: { iban: iban } });
    if (account.balance >= amount) {
        account.balance -= amount;
        await account.save();
        return account;
    }
    else{
        throw new Error("Not enough funds");
    }
};

module.exports = {
    findAccount,
    getAccounts,
    addAccount,
    deleteAccount,
    addBalance,
    deductBalance,
};
