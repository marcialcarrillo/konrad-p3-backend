const app = require("./app");
const port = process.env.PORT || 3002;
require("dotenv").config();

app.listen(port, () => {
    console.log(`Server running at port http://127.0.0.1:${port}`);
});
