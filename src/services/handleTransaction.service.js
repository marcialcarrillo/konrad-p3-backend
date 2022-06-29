const { addTransaction } = require("./transactions.service");
const { addBalance, deductBalance } = require("./accounts.service");

const handleExternalTransaction = (body) => {
    const destinationAccount = body.destinationAccount;
    const amount = body.transferAmount;

    addTransaction(body);
    addBalance(destinationAccount, amount);
};

const handleInternalTransaction = (body) => {

    const originAccount = body.originAccount;
    const destinationAccount = body.destinationAccount;
    const amount = body.transferAmount;

    deductBalance(originAccount,amount);
    addTransaction(body);
    addBalance(destinationAccount, amount);

};

const handleServiceTransaction = (body) => {
    const originAccount = body.originAccount;
    const amount = body.transferAmount;

    deductBalance(originAccount, amount);
    addTransaction(body);
};
