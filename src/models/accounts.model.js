const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");
const User = require("./users.model");

const Account = sequelize.define(
    "Account",
    {
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
                const ibanNumber = BigInt(this.accountNumber) + BigInt(41015201001092741156);
                return `${this.accountCountry}${ibanNumber}`;
            },
            set(value) {
                throw new Error("Do not try to set the `iban` directly.");
            },
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
            defaultValue: 0.0,
        },
    },
    {
        //initialAutoIncrement: 1000,
        // initialAutoIncrement: 41015201001092741156n,
    }
);

Account
    .sync
    ()
    // { force: true }
    .finally(() => {
        // sequelize.close();
    });

// Account.sync().finally(() => {
//     // sequelize.close();
// });

module.exports = Account;
