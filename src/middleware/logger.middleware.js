const logHandler = (req, res, next) => {
    console.log(" v----- Request Logged -----v");
  console.log("url: ", req.originalUrl, "method: ", req.method);
  console.log("body: ", req.body);
   console.log(" ^----- Request Logged -----^");
  next();
};


module.exports = { logHandler };

