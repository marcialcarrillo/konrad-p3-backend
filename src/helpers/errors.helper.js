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
  code: 400,
};

const contTypeError = {
  name: "contTypeError",
  message: "Content-Type error",
  code: 400,
};

const usernameTaken = {
  name: "usernameTaken",
  message: "User already exists",
  code: 400,
};

//we don't want to be precise about whether the username or password failed, for security reasons.
const loginFailure = {
  name: "loginFailure",
  message: "Incorrect username / password",
  code: 400,
};

//Inject the custom errors to our obj handler
customErrors.idError = idError;
customErrors.authError = authError;
customErrors.contTypeError = contTypeError;
customErrors.usernameTaken = usernameTaken;
customErrors.loginFailure = loginFailure;

module.exports = {
  formatError,
  isValidationError,
  isContentType,
  customErrors,
};
