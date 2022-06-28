let express = require("express");
let app = express();
const cors = require("cors");
let mysql = require("mysql");
// const sequelize = require("../src/config/sequelize.config");
const User = require("./models/users.model");

const userRoutes = require("./routes/users.routes");
// const accountRoutes = require("./routes/accounts.routes");c
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

// const middlewareArray = [logHandler, authenticateUser, validatePostContentType];

// app.use(middlewareArray);
// app.use("/books", booksRoutes);
// app.use("/authors", authorRoutes);
app.use("/users", userRoutes);
// app.use("/accounts", accountRoutes);
// app.use(noRouteFound);
app.use(errorHandler);

module.exports = app;
