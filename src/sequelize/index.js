const { Sequelize } = require("sequelize");
const { associate } = require("./setup");

const path = "mysql://root:admin@localhost:3306/bank2";

const sequelize = new Sequelize(path, { logging: false });

const modelDefiners = [
    require("../models2/users.model"),
    require("../models2/accounts.model"),
    require("../models2/bills.model"),
    require("../models2/transactions.model"),
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
