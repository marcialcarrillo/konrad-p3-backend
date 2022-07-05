const jwt = require("jsonwebtoken");
const { customErrors } = require("../helpers/errors.helper");
require("dotenv").config();

const authenticateUser = (req, res, next) => {
    const token = req.cookies.access_token;
    if (token) {
        try {
            const data = jwt.verify(token, process.env.SECRET_KEY);
            req.userEmail = data.email;
            return next();
        } catch {
            next(customErrors.authError);
        }
    } else {
        next(customErrors.authMissing);
    }
};

module.exports = authenticateUser;
