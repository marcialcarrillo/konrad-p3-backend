const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

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

User.sync({ force: true }).finally(() => {
    sequelize.close();
});

// User.sync().finally(() => {
//     // sequelize.close();
// });

module.exports = User;
