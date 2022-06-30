let express = require("express");
let app = express();
const cors = require("cors");
const userRoutes = require("./routes/users.routes");
const transactionRoutes = require("./routes/transactions.routes");
const uploadRoutes = require("./routes/upload.routes");
const sequelize = require("./config/sequelize.config");

const { errorHandler } = require("./middleware/errorHandling.middleware");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync();
// sequelize.sync({force: true});

app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);
app.use("/uploads", uploadRoutes);
app.use(errorHandler);

module.exports = app;
