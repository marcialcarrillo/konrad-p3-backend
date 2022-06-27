const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const User = sequelize.define(
    "User",
    {
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Male", "Female", "Other"],
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ccType: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Visa", "MasterCard", "Discover", "American Express"],
        },
        ccNum: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ccExp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ccCvs: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        // Other model options go here
    }
);

// User.sync({ force: true }).finally(() => {
//     sequelize.close();
// });

User.sync().finally(() => {
    // sequelize.close();
});

module.exports = User;
