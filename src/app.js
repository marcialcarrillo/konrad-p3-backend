let express = require("express");
let app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/users.routes");
const transactionRoutes = require("./routes/transactions.routes");
const billRoutes = require("./routes/bills.routes");
const uploadRoutes = require("./routes/upload.routes");
// const sequelize = require("./config/sequelize.config");
const { sequelize } = require("./sequelize/index");

const { errorHandler } = require("./middleware/errorHandling.middleware");

app.use(
    cors({
        origin: "http://127.0.0.1:3000",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);
app.use("/uploads", uploadRoutes);
app.use("/bills", billRoutes);
app.use(errorHandler);

module.exports = app;
