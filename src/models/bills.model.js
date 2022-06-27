const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");
const User = require("../models/users.model");
const Account = require("../models/accounts.model");

const Bill = sequelize.define(
    "Bill",
    {
        // Model attributes are defined here
        billId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        debtorID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "idNumber",
            },
        },
        serviceName: {
            type: DataTypes.STRING,
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
        amountToPay: {
            type: DataTypes.DECIMAL(65, 2),
            allowNull: false,
        },
    }
);

// User.sync({ force: true }).finally(() => {
//     sequelize.close();
// });

User.sync().finally(() => {
    // sequelize.close();
});

module.exports = Bill;
