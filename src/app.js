let express = require("express");
let app = express();
const cors = require("cors");
const userRoutes = require("./routes/users.routes");
const { errorHandler } = require("./middleware/errorHandling.middleware");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use(errorHandler);

module.exports = app;
