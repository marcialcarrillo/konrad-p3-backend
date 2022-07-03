const { DataTypes } = require("sequelize");
// const Account = require("./accounts.model");

module.exports = (sequelize) => {
    sequelize.define(
        "User",
        {
            fullName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            idNumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            },
            idImage: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            incomeSource: {
                type: DataTypes.ENUM,
                allowNull: false,
                values: [
                    "Employed / Salaried",
                    "Business Owner",
                    "Self-Employed",
                    "Retired",
                    "Investor",
                    "Other",
                ],
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
};
