const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");
const User = require("../models/users.model");

const Account = sequelize.define("Account", {
    // Model attributes are defined here
    accountOwnerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "idNumber",
        },
    },
    accountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    currency: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["CRC", "USD"],
    },
    balance: {
        type: DataTypes.DECIMAL(65, 2),
        allowNull: false,
    },
});

// User.sync({ force: true }).finally(() => {
//     sequelize.close();
// });

User.sync().finally(() => {
    // sequelize.close();
});

module.exports = User;
