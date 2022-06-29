const { Sequelize } = require("sequelize");

const path = "mysql://root:admin@localhost:3306/bank";
const sequelize = new Sequelize(path, {logging: false});

module.exports = sequelize;