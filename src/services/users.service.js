const {
    sequelize,
    UserAccAssociation,
    UserBillAssociation,
} = require("../sequelize/index");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const User = sequelize.models.User;
require("dotenv").config();

const findUser = async (query) => {
    let user = await User.findOne(query);
    return user;
};

const findUserWithAccounts = async (email) => {
    let user = await User.findOne({
        attributes: { exclude: ["password", "UserEmail"] },
        where: { email: email },
        include: [
            {
                association: UserAccAssociation,
                attributes: { exclude: ["UserEmail"] },
            },
            {
                association: UserBillAssociation,
                attributes: { exclude: ["UserEmail"] },
            },
        ],
    });
    return user;
};

const getUsers = async () => {
    const users = await User.findAll({ include: UserAccAssociation });

    return users;
};

const addUser = async (body) => {
    //hash the password
    const hash = bcrypt.hashSync(body.password, saltRounds);

    //add the user to the database
    const newUser = await User.create({
        fullName: body.fullName,
        idNumber: body.idNumber,
        incomeSource: body.incomeSource,
        email: body.email,
        password: hash,
    });

    return newUser;
};

const addUserAndAccount = async (body) => {
    //hash the password
    const hash = bcrypt.hashSync(body.password, saltRounds);

    //add the user to the database
    const newUser = await User.create(
        {
            fullName: body.fullName,
            idNumber: body.idNumber,
            incomeSource: body.incomeSource,
            email: body.email,
            password: hash,
            accounts: body.accounts,
        },
        {
            include: [UserAccAssociation],
        }
    );
    return newUser;
};

const loginUser = async (body) => {
    const email = body.email;
    const password = body.password;
    let user = await User.findOne({
        where: { email: email },
        include: UserAccAssociation,
    });
    const hash = user.password;
    const match = await bcrypt.compare(password, hash);
    if (match) {
        let token = jwt.sign({ email: email }, process.env.SECRET_KEY);
        return token;
    } else {
        return null;
    }
};

const deleteUser = async (idNumber) => {
    const deletedUser = await User.destroy({ where: { idNumber: idNumber } });
    return deletedUser;
};

const saveImagePath = async (email, imagePath) => {
    await User.update(
        { idImage: imagePath },
        {
            where: { email: email },
        }
    );
    return imagePath;
};

module.exports = {
    findUser,
    getUsers,
    addUser,
    deleteUser,
    loginUser,
    addUserAndAccount,
    findUserWithAccounts,
    saveImagePath,
};
