const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  verify,
  makeOrganiser,
  isOrganiser,
  auth,
} = require("../controller/userController");

router.route("/auth/signup").post(signUp);
router.route("/auth/verify").post(verify);
router.route("/auth/login").post(login);
router.route("/auth/auth").post(auth);
router.route("/auth/requestOrganiser").post(makeOrganiser);
router.route("/auth/isOrganiser").post(isOrganiser);
module.exports = router;
