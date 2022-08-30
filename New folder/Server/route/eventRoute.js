const express = require("express");
const router = express.Router();

const {
  create,
  book,
  eventInfo,
  getAllEvent,
  getAllEventLocation,
  searchByLocation,

  searchById,
} = require("../controller/eventController");

// [POST]
router.route("/event/create").post(create);
router.route("/event/book").post(book);
router.route("/event/eventInfo").post(eventInfo);
router.route("/event/searchByLocation").post(searchByLocation);
//[GET]
router.route("/event/getAllEvent").get(getAllEvent);
router.route("/event/getAllLocation").get(getAllEventLocation);
router.route("/event/searchById").post(searchById)
module.exports = router;
