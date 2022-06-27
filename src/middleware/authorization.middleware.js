const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {

  //designate paths to validate
  const authorsReg = /\/authors.*/;
  const booksReg = /\/books.*/;

  //check if the request belongs to the paths
  if (authorsReg.test(req.path) || booksReg.test(req.path)) {
    //The get method is currently unprotected
    if (req.method !== "GET") {
      let rawToken = req.headers.authorization;

      //check if there is an authorization token in the header
      if (rawToken) {
        const token = rawToken.split(" ")[1];
        jwt.verify(token, "not_hard_coded", function (err, decoded) {
          if (decoded) {
            console.log("User Authenticated");
            next();
          } else {
            throw new Error("Authentication Failure");
          }
        });
      } else {
        throw new Error("No Token");
      }
    } else {
      next();
    }
  } else {
    next();
  }
};

module.exports = authenticateUser;
