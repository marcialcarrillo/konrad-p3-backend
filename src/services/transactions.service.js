const { sequelize } = require("../sequelize/index");
const { Op } = require("sequelize");
const Transaction = sequelize.models.Transaction;

const getAllTransactions = async () => {
    const transactions = await Transaction.findAll();

    return transactions;
};

const getTransactionsByAccNumber = async (accountNumber) => {
    const transactions = await Transaction.findAll({
        where: {
            [Op.or]: [
                { originAccount: accountNumber },
                { destinationAccount: accountNumber },
            ],
        },
    });

    return transactions;
};

const addTransaction = async (body, destinationAccount) => {
    //add the transaction to the database
    const newTransaction = await Transaction.create({
        originAccount: body.originAccount,
        transactionType: body.transactionType,
        currency: body.currency,
        transferAmount: body.transferAmount,
        destinationAccount: destinationAccount,
    });

    return newTransaction;
};



module.exports = {
    getAllTransactions,
    getTransactionsByAccNumber,
    addTransaction,

};
