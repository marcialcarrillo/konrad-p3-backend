const User = require("../models/users.model");
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
    firstName: body.firstName,
    lastName: body.lastName,
    dateOfBirth: body.dateOfBirth,
    gender: body.gender,
    username: body.username,
    email: body.email,
    password: hash,
    ccType: body.ccType,
    ccNum: body.ccNum,
    ccExp: body.ccExp,
    ccCvs: body.ccCvs,
  });

  return newUser;

  const user = await User.findOne({ where: { username: username } });

  const username = body.username;
  const password = body.password;
  let user = await User.findOne({ username: username });
  const hash = user.password;
  const match = await bcrypt.compare(password, hash);
  if (match) {
    let token = jwt.sign({ username: username }, "not_hard_coded");
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
  getUsers,
  addUser,
  deleteUser,
};
