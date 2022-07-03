const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Transaction",
        {
            // Model attributes are defined here
            originAccount: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            transactionType: {
                type: DataTypes.ENUM,
                allowNull: false,
                values: ["Internal", "External", "Service"],
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
        },
        {
            updatedAt: false,
        }
    );
};
