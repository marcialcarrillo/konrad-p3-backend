const jwt = require("jsonwebtoken");
const { customErrors } = require("../helpers/errors.helper");

const authenticateUser = (req, res, next) => {
    const token = req.cookies.access_token;
    if (token) {
        try {
          //TODO use env
            const data = jwt.verify(token, "not_hard_coded");
            req.userEmail = data.email;
            return next();
        } catch {
            next(customErrors.authError);
        }
    } else {
        next(customErrors.authMissing);
    }
    // //designate paths to validate
    // const authorsReg = /\/authors.*/;
    // const booksReg = /\/books.*/;

    // //check if the request belongs to the paths
    // if (authorsReg.test(req.path) || booksReg.test(req.path)) {
    //   //The get method is currently unprotected
    //   if (req.method !== "GET") {
    //     let rawToken = req.headers.authorization;

    //     //check if there is an authorization token in the header
    //     if (rawToken) {
    //       const token = rawToken.split(" ")[1];
    //       jwt.verify(token, "not_hard_coded", function (err, decoded) {
    //         if (decoded) {
    //           console.log("User Authenticated");
    //           next();
    //         } else {
    //           throw new Error("Authentication Failure");
    //         }
    //       });
    //     } else {
    //       throw new Error("No Token");
    //     }
    //   } else {
    //     next();
    //   }
    // } else {
    //   next();
    // }
};

module.exports = authenticateUser;
