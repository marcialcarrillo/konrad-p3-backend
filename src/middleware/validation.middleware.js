const { isContentType } = require("../helpers/errors.helper");

const validatePostContentType = (req, res, next) => {
  if (!isContentType("application/json", req) && req.method === "POST") {
    throw new Error("Content-Type Validation Error");
  }
  next();
};

const noRouteFound = (req, res, next) => {
  // next(
  //   `The route used (${req.path}) does not match with any implemented endpoint.`
  // );
  next();
};

module.exports = { validatePostContentType, noRouteFound };
