const { Sequelize } = require("sequelize");

const path = "mysql://root:admin@localhost:3306/bank";
const sequelize = new Sequelize(path, {logging: true});

module.exports = sequelize;