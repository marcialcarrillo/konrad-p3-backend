const errorHandler = (err, req, res, next) => {
  const code = err.code;
  const errorName = err.name;
  const errorMessage = err.message;

  console.log(err);

  if (code) {
    //custom errors
    res.status(code).send({ name: errorName, message: errorMessage });
  } else {
    //expected server errors that should be marked with code 400
    switch (errorName) {
      case "ValidationError":
        res.status(400).send({ name: errorName, message: errorMessage });
        break;

      //unexpected errors
      default:
        res.status(500).send({ name: errorName, message: errorMessage });
        break;
    }
  }
};

module.exports = { errorHandler };
