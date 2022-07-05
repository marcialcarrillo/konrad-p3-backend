const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    "heroku_4940732d2d57a84",
    "bbfd823f095643",
    "cf42faee",
    {
        dialect: "mysql",
        host: "us-cdbr-east-06.cleardb.net",
    }
);
module.exports = sequelize;
