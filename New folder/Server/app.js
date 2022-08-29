const express = require("express");
const config = require("dotenv");
const cors = require("cors");
const bodyparser = require("body-parser");
const user = require("./route/userRoute");
const event = require("./route/eventRoute");
const app = express();

//Middleware for using env var config file
config.config({ path: "./Config/config.env" });
//Middleware for Cross Origin Resouce Sharing
app.use(cors());
//Middleware for reading POST request JSON
app.use(bodyparser.json());
//Middleware for reading POST request body
app.use(bodyparser.urlencoded({ extended: true }));

//Route Usage
app.use(user);
app.use(event);

//Starting backend
app.listen(process.env.PORT, () => {
  console.log(`App is live on PORT: ${process.env.PORT}`);
});
