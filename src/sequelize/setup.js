
let  UserAccAssociation;

function associate(sequelize) {
    const { User, Account } = sequelize.models;

    const UserAccAssociation = User.hasMany(Account, { as: "accounts" });
    Account.belongsTo(User);
}

module.exports = { associate };
