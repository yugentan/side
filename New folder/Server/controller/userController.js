const mysql = require("../cMod/mySql");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const responseTask = require("../cMod/response");
const dotenv = require("dotenv");
dotenv.config({ path: "./Config/config.env" });

exports.signUp = async (req, res) => {
  let response = new responseTask();
  let username = req.body.username;
  let email = req.body.email;
  let pwHash = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("base64");
  let repass = crypto
    .createHash("sha256")
    .update(req.body.repass)
    .digest("base64");
  const pwRegex = new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}$/
  );
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
  );
  if (
    username == "" ||
    email == "" ||
    req.body.password == "" ||
    req.body.repass == ""
  ) {
    res.status(500).send("Empty field");
  } else if (emailRegex.test(email) == false) {
    res.status(500).send("Email Requirement Failed");
  } else if (repass != pwHash) {
    res.status(500).send("Password mismatch");
  } else if (pwRegex.test(req.body.password) == false) {
    res.status(500).send("Password Requirement Failed");
  } else {
    const sql1 = `SELECT username FROM accounts WHERE (username = "${username}");`;
    let a;
    await mysql
      .altread(sql1)
      .then((resolve) => {
        a = resolve;
      })
      .catch((reject) => {
        console.log(reject);
      });
    if (a.length > 0) {
      res.status(500).send("Username in use");
    } else {
      //Generate random 6 digit for verf
      let otpRand = Math.floor(100000 + Math.random() * 900000);
      sql2 = `INSERT INTO accounts(username,password,email,verfCode,isVerf,isOrganiser,attending) VALUES("${username}","${pwHash}","${email}","${otpRand}","false","false","");`;
      mysql
        .create(sql2)
        .then((resolve) => {
          let transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
              user: process.env.EMAIL, // generated ethereal user
              pass: process.env.EMAILPASS, // generated ethereal password
            },
          });
          transporter.sendMail({
            from: "team83agiledevtest@outlook.com", // sender address
            to: email, // list of receivers
            subject: "Test", // Subject line
            text: `Thank you for signing up with Team83, Your 6 digit verification code is ${otpRand}.`, // plain text body
          });
          response.message = "Success";
          response.success = resolve;
          res.status(200).send(response);
        })
        .catch((reject) => {
          console.log(reject);
        });
    }
  }
};
exports.verify = async (req, res) => {
  let response = new responseTask();
  code = req.body.code;
  user = req.body.username;
  const sql = `SELECT * FROM accounts WHERE (username = "${user}" AND verfCode = "${code}");`;
  let a = await mysql.altread(sql);

  if (a) {
    if (a[0].isVerf == "false") {
      const sql1 = `UPDATE accounts SET isVerf = "true" WHERE (username = "${a[0].username}");`;
      mysql.update(sql1).then((resolve) => {
        response.success = true;
        res.status(200).send(response);
      });
    } else {
      response.message = "already verified";
      res.status(200).send(response);
    }
  } else {
    response.success = false;
    response.message = "no such member";
    res.status(200).send(response);
  }
};
exports.login = (req, res) => {
  let pwHash = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("base64");
  let user = req.body.username;
  let response = new responseTask();
  let tkn = jwt.sign({ username: user }, process.env.JWTID, {
    expiresIn: process.env.JWTEXP,
  });
  const sqlLine = `SELECT * FROM accounts WHERE username = "${user}" AND password = "${pwHash}";`;
  mysql
    .read(sqlLine)
    .then((resolve) => {
      if (resolve[0].isVerf == "false") {
        response.success = false;
        response.message = "account not verified";
        res.status(200).send(response);
      } else {
        response.success = true;
        response.data = {
          tkn: tkn,
          email: resolve[0].email,
        };
        response.message = "login success";
        res.status(200).send(response);
      }
    })
    .catch((reject) => {
      response.success = false;
      response.message = "User unknown";
      res.status(403).send(response);
    });
};
exports.auth = async (req, res) => {
  const token = req.body.tkn;
  let response = new responseTask();
  if (token != null || token != undefined) {
    let user = await jwt.decode(token, process.env.JWTID).username;
    const sql1 = `SELECT * FROM accounts WHERE (username = "${user}");`;
    mysql
      .altread(sql1)
      .then((resolve) => {
        if (resolve != false) {
          response.success = true;
          response.message = "Auth";
          res.status(200).send(response);
        } else {
          response.success = false;
          response.message = "Tempered Token";
          res.status(403).send(response);
        }
      })
      .catch((reject) => {
        response.success = reject;
        response.message = "Internal Server Error";
        res.status(501).send(response);
      });
  } else {
    response.success = false;
    response.message = "User not login";
    res.status(500).send(response);
  }
};
exports.makeOrganiser = (req, res) => {};
exports.isOrganiser = (req, res) => {
  let response = new responseTask();
  const tkn = req.body.token;
  const user = jwt.verify(tkn, process.env.JWTID);
  const sql = `SELECT isOrganiser FROM accounts WHERE username = ${user};`;
  mysql
    .altread(sql)
    .then((resolve) => {
      if (resolve) {
        response.success = true;
        response.data = resolve;
        response.message = "200 OK";
        res.status(200).send(response);
      } else {
        response.success = false;
        response.message = "No user found";
        res.status(403).send(response);
      }
    })
    .catch((reject) => {
      response.success = reject;
      response.message = "500 Internal Server Error";
      res.status(500).send(response);
    });
};
