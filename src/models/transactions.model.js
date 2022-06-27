const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");
const Account = require("../models/accounts.model");

const Transaction = sequelize.define(
    "Transaction",
    {
        // Model attributes are defined here
        originAccount: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Account,
                key: "accountNumber",
            },
        },
        currency: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["CRC", "USD"],
        },
        transferAmount: {
            type: DataTypes.DECIMAL(65, 2),
            allowNull: false,
        },
        destinationAccount: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Account,
                key: "accountNumber",
            },
        },
        timeStamp: {
            type: DataTypes.DATETIME,
            defaultValue: DataTypes.NOW,
        },
    }
);

// User.sync({ force: true }).finally(() => {
//     sequelize.close();
// });

User.sync().finally(() => {
    // sequelize.close();
});

module.exports = Transaction;