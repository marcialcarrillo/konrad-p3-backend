// const { findAccount } = require("../services/accounts.service");
const { findUser } = require("../services/users.service");

const getUserWithAccounts = async (email) => {
    const user = await findUser({ where: { email: email } });
    const accounts = await findAccount({
        where: { accountOwnerId: user.userId },
    });

    let userWithAccounts = user.toJSON();
    let accountsArray = [];
    accounts.toJSON().forEach(
        (account) => (accountsArray.push(account.toJSON().iban))
    );
    userWithAccounts["Accounts"] = accountsArray;
    return userWithAccounts;
};

module.exports = getUserWithAccounts;
