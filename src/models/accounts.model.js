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
    iban: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.accountCountry}${this.accountNumber}`;
        },
        set(value) {
          throw new Error('Do not try to set the `iban` directly.');
        }
    },
    accountCountry: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["CR", "US"],
    },
    accountNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
},
{
  initialAutoIncrement: 41015201001092741156,
});

User.sync({ force: true }).finally(() => {
    sequelize.close();
});

// User.sync().finally(() => {
//     // sequelize.close();
// });

module.exports = User;
