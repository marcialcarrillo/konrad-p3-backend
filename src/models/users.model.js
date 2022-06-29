const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");
// const Account = require("./accounts.model");

const User = sequelize.define(
    "User",
    {
        // Model attributes are defined here
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        incomeSource: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Employed / Salaried", "Business Owner", "Self-Employed", "Retired", "Investor", "Other"],
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);

const Account = sequelize.define(
    "Account",
    {
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

// Declare relationships
//TODO: move to APP
const UserAccAssociation = User.hasMany(Account, { as: 'accounts' });
Account.belongsTo(User);

sequelize.sync();

module.exports = { User, Account, UserAccAssociation };
