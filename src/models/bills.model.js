const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Bill",
        {
            serviceName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            amountToPay: {
                type: DataTypes.DECIMAL(65, 2),
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
};
