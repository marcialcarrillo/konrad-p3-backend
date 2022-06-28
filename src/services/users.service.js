const { User, Account, UserAccAssociation } = require("../models/users.model");
// const Accounts =
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const findUser = async (query) => {
    let user = await User.findOne(query);
    return user;
};

// const findUserWithAccounts = async (query) => {
//     let user = await User.findOne(query);
//     let accounts = await
//     return user;
// };

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
            accounts: body.accounts ,
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
    // let user = await getUserWithAccounts(email: email } });
    let user = await User.findOne({ where: { email: email }, include: UserAccAssociation });
    const hash = user.password;
    const match = await bcrypt.compare(password, hash);
    const accounts = user.accounts.map(acc => acc.iban)
    if (match) {
        //TODO: use env variables
        let token = jwt.sign({ email: email, accounts: accounts}, "not_hard_coded");
        return token;
    } else {
        return null;
    }
};

const deleteUser = async (idNumber) => {
    const deletedUser = await User.destroy({ where: { idNumber: idNumber } });
    return deletedUser;
};

module.exports = {
    findUser,
    getUsers,
    addUser,
    deleteUser,
    loginUser,
    addUserAndAccount,
};
