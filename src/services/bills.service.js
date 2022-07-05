const { sequelize } = require("../sequelize/index");
const { getRandomServices } = require("../helpers/services.helper");

const Bill = sequelize.models.Bill;

const findBills = async (email) => {
    let account = await Bill.findAll({
        where: { UserEmail: email },
    });
    return account;
};

const payBill = async (email, serviceName) => {
    let account = await Bill.destroy({
        where: { UserEmail: email, serviceName: serviceName },
    });
    return account;
};

const createBills = async (email) => {
    const randomServices = getRandomServices(email);

    const bills = await Bill.bulkCreate(randomServices);

    return bills;
};

module.exports = { findBills, payBill, createBills };
