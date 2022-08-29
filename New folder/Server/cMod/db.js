const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: "./Config/config.env" });

module.exports = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  debug: false,
});
