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
  const deletedAccount = await Account.destroy({ where: { accountOwnerId: idNumber } });
  return deletedAccount;
};

module.exports = {
    findAccount,
    getAccounts,
    addAccount,
    deleteAccount,
};
