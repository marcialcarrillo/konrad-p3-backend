let express = require("express");
let app = express();
const cors = require("cors");
let mysql = require("mysql");
// const sequelize = require("../src/config/sequelize.config");
const User = require("./models/users.model");

// const mongoose = require("mongoose");
// const booksRoutes = require("./routes/books.routes");
// const authorRoutes = require("./routes/authors.routes");
const userRoutes = require("./routes/users.routes");
// const authenticateUser = require("./middleware/authorization.middleware");
// const {
//   validatePostContentType,
//   noRouteFound,
// } = require("./middleware/validation.middleware");
// const { logHandler } = require("./middleware/logger.middleware");
const { errorHandler } = require("./middleware/errorHandling.middleware");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const Sequelize = require("sequelize");

// Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite

// let con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "admin"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connection to mySql opened!");
// });

// console.log(User === sequelize.models.User);

// const middlewareArray = [logHandler, authenticateUser, validatePostContentType];

// app.use(middlewareArray);
// app.use("/books", booksRoutes);
// app.use("/authors", authorRoutes);
app.use("/users", userRoutes);
// app.use(noRouteFound);
app.use(errorHandler);

module.exports = app;
