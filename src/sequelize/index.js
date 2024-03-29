const { Sequelize } = require("sequelize");

const path = process.env.DBPATH;

const sequelize = new Sequelize(path, { logging: false });

const modelDefiners = [
    require("../models/users.model"),
    require("../models/accounts.model"),
    require("../models/bills.model"),
    require("../models/transactions.model"),
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

//associate models
const { User, Account, Bill, Transaction } = sequelize.models;

//User-Account
const UserAccAssociation = User.hasMany(Account, {
    as: "accounts",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Account.belongsTo(User);

//User-Bills
const UserBillAssociation = User.hasMany(Bill, {
    as: "bills",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Bill.belongsTo(User);

sequelize.sync();
// sequelize.sync({force: true});

module.exports = { sequelize, UserAccAssociation, UserBillAssociation };
