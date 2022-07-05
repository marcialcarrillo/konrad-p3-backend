const isValidationError = (err) => {
  err.name === "ValidationError";
};

const formatError = (err) => ({ error: err.name, message: err.message });

const isContentType = (contentType, req) => {
  return contentType === req.get("Content-Type");
};

//create a parent object to hold the errors
let customErrors = {};

//-----Define the custom errors
const idError = {
  name: "idError",
  message: "Id not found",
  code: 400,
};

//problem with the jwt token
const authError = {
  name: "authError",
  message: "The credentials provided were not valid",
  code: 403,
};

//missing cookie
const authMissing = {
  name: "authMissing",
  message: "The user needs to be authenticated",
  code: 403,
};

const contTypeError = {
  name: "contTypeError",
  message: "Content-Type error",
  code: 400,
};

const userTaken = {
  name: "userTaken",
  message: "User already exists",
  code: 400,
};

const incorrectCredentials = {
    name: "incorrectCredentials",
    message: "The credentials provided were incorrect",
    code: 400,
};

//we don't want to be precise about whether the username or password failed, for security reasons.
const loginFailure = {
  name: "loginFailure",
  message: "Incorrect username / password",
  code: 400,
};

const accNotFound = {
    name: "accNotFound",
    message: "couldn't find the account number",
    code: 400,
};

const accNotOfCustomer = {
    name: "accNotOfCustomer",
    message: "the customer doesn't own an account by that number",
    code: 400,
};

const notEnoughFunds = {
    name: "notEnoughFunds",
    message: "there are not enough funds in the account",
    code: 400,
};

//Inject the custom errors to our obj handler
customErrors.idError = idError;
customErrors.authError = authError;
customErrors.contTypeError = contTypeError;
customErrors.usernameTaken = userTaken;
customErrors.loginFailure = loginFailure;
customErrors.incorrectCredentials = incorrectCredentials;
customErrors.authMissing = authMissing;
customErrors.accNotFound = accNotFound;
customErrors.accNotOfCustomer = accNotOfCustomer;
customErrors.notEnoughFunds = notEnoughFunds;

module.exports = {
    formatError,
    isValidationError,
    isContentType,
    customErrors,
};
