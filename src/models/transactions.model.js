const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");
const Account = require("./users.model");

const Transaction = sequelize.define("Transaction", {
    // Model attributes are defined here
    originAccount: {
        type: DataTypes.STRING,
    },
    transactionType: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Internal", "External", "Service"]
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
    },
});

module.exports = { Transaction };
