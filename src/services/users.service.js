const User = require("../models/users.model");
const Account = require("../models/accounts.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

findUser = async (username) => {
  let user = await User.findOne({ where: { username: username } });
  return user;
};

getUsers = async () => {
  const users = await User.findAll();

  return users;
};

addUser = async (body) => {

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

  const newAccount = await Account.create({
    accountOwnerId: body.idNumber,
    accountCountry: body.accountCountry,
    currency: body.currency,
    balance: 0.00,
  })

  return newUser;
};

loginUser = async (body) => {
  const email = body.email;
  const password = body.password;
  let user = await User.findOne({ where: { email: email } });
  const hash = user.password;
  const match = await bcrypt.compare(password, hash);
  if (match) {
    //TODO: use env variables
    let token = jwt.sign({ email: email }, "not_hard_coded");
    return token;
  } else {
    return null;
  }
};


const deleteUser = async (username) => {
    await User.destroy({
        where: { username: username },
    });
};

module.exports = {
  findUser,
  getUsers,
  addUser,
  deleteUser,
  loginUser,
};
