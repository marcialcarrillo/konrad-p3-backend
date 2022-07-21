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
    title: "User Already Exists",
    message:
        "An user already exists with either the same email or the same Id. Please double check your information and call the Canadian Anti-Fraud Center at 1-888-495-8501 immediately if this is indeed your information.",
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
    title: "Login Failed",
    message: "The email or password entered were incorrect, please try again.",
    code: 400,
};

const accNotFound = {
    name: "accNotFound",
    title: "Account Not Found",
    message: "Couldn't find the account number.",
    code: 400,
};

const accNotOfCustomer = {
    name: "accNotOfCustomer",
    title: "Account Ownership Error",
    message: "The customer doesn't own an account by that number.",
    code: 400,
};

const notEnoughFunds = {
    name: "notEnoughFunds",
    title: "Not Enough Funds",
    message:
        "There are not enough funds in the origin account of this transaction.",
    code: 400,
};

const tooMuchMoney = {
    name: "tooMuchMoney",
    title: "Account Over Limit",
    message:
        "Personal accounts can have up to 1 billion CRC, consider opening a business account.",
    code: 400,
};

//Inject the custom errors to our obj handler
customErrors.idError = idError;
customErrors.authError = authError;
customErrors.contTypeError = contTypeError;
customErrors.userTaken = userTaken;
customErrors.loginFailure = loginFailure;
customErrors.incorrectCredentials = incorrectCredentials;
customErrors.authMissing = authMissing;
customErrors.accNotFound = accNotFound;
customErrors.accNotOfCustomer = accNotOfCustomer;
customErrors.notEnoughFunds = notEnoughFunds;
customErrors.tooMuchMoney = tooMuchMoney;

module.exports = {
    formatError,
    isValidationError,
    isContentType,
    customErrors,
};
