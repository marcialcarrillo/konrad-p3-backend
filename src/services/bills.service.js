const { sequelize } = require("../sequelize/index");
const { getRandomServices } = require("../helpers/services.helper");

const Bill = sequelize.models.Bill;

const findBills = async (email) => {
    let account = await Bill.findAll({
        where: { debtorEmail: email },
    });
    return account;
};

const payBill = async (email, serviceName) => {
    let account = await Bill.destroy({
        where: { debtorEmail: email, serviceName: serviceName },
    });
    return account;
};

const createBills = async (email) => {
    const randomServices = getRandomServices(email);

    const bills = await Bill.bulkCreate(randomServices);

    return bills;
};

module.exports = { findBills, payBill, createBills };
