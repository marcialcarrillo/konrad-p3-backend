const { Transaction } = require("../models/transactions.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const { Op } = require("sequelize");

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

// const addTransactionAndAccount = async (body) => {
//     //hash the password
//     const hash = bcrypt.hashSync(body.password, saltRounds);

//     //add the transaction to the database
//     const newTransaction = await Transaction.create(
//         {
//             fullName: body.fullName,
//             idNumber: body.idNumber,
//             incomeSource: body.incomeSource,
//             email: body.email,
//             password: hash,
//             accounts: body.accounts,
//         },
//         {
//             include: [TransactionAccAssociation],
//         }
//     );
//     return newTransaction;
// };

// const loginTransaction = async (body) => {
//     const email = body.email;
//     const password = body.password;
//     let transaction = await Transaction.findOne({
//         where: { email: email },
//         include: TransactionAccAssociation,
//     });
//     const hash = transaction.password;
//     const match = await bcrypt.compare(password, hash);
//     // const accounts = transaction.accounts.map(acc => acc.iban)
//     if (match) {
//         //TODO: use env variables
//         let token = jwt.sign({ email: email }, "not_hard_coded");
//         return token;
//     } else {
//         return null;
//     }
// };

// const deleteTransaction = async (idNumber) => {
//     const deletedTransaction = await Transaction.destroy({
//         where: { idNumber: idNumber },
//     });
//     return deletedTransaction;
// };

module.exports = {
    getAllTransactions,
    getTransactionsByAccNumber,
    addTransaction,
    // deleteTransaction,
    // loginTransaction,
    // addTransactionAndAccount,
};
