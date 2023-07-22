// console.log(process.env.HOME);
require("dotenv").config();

console.log(process.env.DBPATH);
const app = require("./app");
const port = process.env.PORT;
const ip = process.env.IP;

if (process.env.PLATFORM === "AD") {
    app.listen(port, ip, () => {
        console.log(`Server running at ${ip}:${port}`);
    });
} else {
    app.listen(port, () => {
        console.log(`Server running at port http://127.0.0.1:${port}`);
    });
}
