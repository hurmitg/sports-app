const express = require("express");
const {
  addNewEvent,
  getEvents,
  getSingleEvent,
  addToWaitlist,
  addToPlayers,
  getPlaying,
  getWaitlisted,
} = require("../controllers/event.controllers");
const { protect } = require("../middlewares/auth.middleware");

const event = express.Router();

event.route("/get").get(getEvents);

event.route("/get").post(protect, getSingleEvent);

event.route("/add").post(protect, addNewEvent);

event.route("/addToWaitlist").patch(protect, addToWaitlist);

event.route("/addToPlayers").patch(protect, addToPlayers);

event.route("/getAttending").get(protect, getPlaying);

event.route("/getWaitlisted").get(protect, getWaitlisted);

module.exports = event;
