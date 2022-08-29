const mysql = require("../cMod/mySql");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const responseTask = require("../cMod/response");
const dotenv = require("dotenv");
dotenv.config({ path: "./Config/config.env" });

//[POST]
exports.create = (req, res) => {};
exports.book = (req, res) => {};
exports.eventInfo = (req, res) => {};

//[GET]
exports.getAllEvent = (req, res) => {
  const sql = `SELECT * FROM event;`;
  const response = new responseTask();
  mysql
    .altread(sql)
    .then((resolve) => {
      if (resolve) {
        response.data = resolve;
        response.success = true;
        response.message = "200 OK";
        res.status(200).send(response);
      } else {
        response.success = resolve;
        response.message = "No event found";
        res.status(200).send(response);
      }
    })
    .catch((reject) => {
      response.success = reject;
      response.message = "500 Internal Server Error";
      res.status(500).send(response);
    });
};
exports.getAllEventLocation = (req, res) => {
  const sql = `SELECT event_location FROM event;`;
  let response = new responseTask();
  mysql
    .altread(sql)
    .then((resolve) => {
      response.success = true;
      response.data = resolve;
      res.status(200).send(response);
    })
    .catch((reject) => {
      res.status(500).send("Internal Server Error");
    });
};
exports.searchByLocation = (req, res) => {
  let response = new responseTask();
  const sLocation = req.body.location;
  const sql = `SELECT * FROM event where (event_location = "${sLocation}")`;
  mysql
    .altread(sql)
    .then((resolve) => {
      if(resolve){
        response.success = true;
        response.data = resolve;
        res.status(200).send(response);
      }else{
        response.success = false;
        response.message = "No Location Found"
        res.status(200).send(response)

      }
  
    })
    .catch((reject) => {
      res.status(500).send("Internal Server Error");
    });
};
