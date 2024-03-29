const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Account",
        {
            iban: {
                type: DataTypes.VIRTUAL,
                get() {
                    const ibanNumber =
                        BigInt(this.accountNumber) +
                        BigInt(41015201001092741156);
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
                validate: { min: 0 },
            },
        },
        {
            timestamps: false,
        }
    );
};
