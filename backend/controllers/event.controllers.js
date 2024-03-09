const EventModel = require("../models/event.model");

// get all events

const getEvents = async (req, res) => {
  let events = await EventModel.find({
    date: {
      $gte: new Date().toLocaleString(undefined, {
        timeZone: "Asia/Kolkata",
      }),
    },
  })
    .populate("organiser", "-password")
    .populate("players", "-password")
    .populate("waitlist", "-password");
  return res.status(200).send({
    description: `${events.length} upcoming event(s) found`,
    data: [{ events }],
  });
};

// get single event

const getSingleEvent = async (req, res) => {
  let { id } = req.body;
  let event = await EventModel.findOne({ _id: id })
    .populate("organiser", "-password")
    .populate("players", "-password")
    .populate("waitlist", "-password");
  if (event) return res.status(200).send(event);
  return res.status(404).send("Event could not be found");
};

// add event

const addNewEvent = async (req, res) => {
  const { title, description, date, maxPlayers } = req.body;
  if (!title || !description || !date || !maxPlayers) {
    return res.status(422).send("Please enter all the fields");
  }
  try {
    const event = await EventModel.create({
      title,
      description,
      date,
      startTime: date.split("T")[1],
      maxPlayers,
      organiser: req.user,
      players: [req.user],
      waitlist: [],
    });
    return res
      .status(201)
      .send({ description: "Event created successfully", data: [{ event }] });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send("Failed to create event");
  }
};

// add user to players

const addToPlayers = async (req, res) => {
  const { currEvent, id } = req.body;
  const { _id } = currEvent;
  try {
    await EventModel.updateOne({ _id }, { $pull: { waitlist: id } });
    await EventModel.updateOne({ _id }, { $push: { players: id } });
    let event = await EventModel.findOne({ _id })
      .populate("organiser", "-password")
      .populate("players", "-password")
      .populate("waitlist", "-password");
    if (event) return res.status(200).send(event);
  } catch (error) {
    return res.status(404).send("No event Found");
  }
};

// add user to waitlist

const addToWaitlist = async (req, res) => {
  const { _id } = req.body;
  try {
    await EventModel.updateMany({ _id }, { $push: { waitlist: req.user } });
    let event = await EventModel.findOne({ _id })
      .populate("organiser", "-password")
      .populate("players", "-password")
      .populate("waitlist", "-password");
    if (event) return res.status(200).send(event);
  } catch (error) {
    return res.status(404).send("No event Found");
  }
};

// get user's event (playing)

const getPlaying = async (req, res) => {
  let events = await EventModel.find({
    date: {
      $gte: new Date().toLocaleString(undefined, {
        timeZone: "Asia/Kolkata",
      }),
    },
    players: { $elemMatch: { $eq: req.user._id } },
  })
    .populate("organiser", "-password")
    .populate("players", "-password")
    .populate("waitlist", "-password");
  return res.status(200).send(events);
};

// get user's event (waitlisted)

const getWaitlisted = async (req, res) => {
  let events = await EventModel.find({
    date: {
      $gte: new Date().toLocaleString(undefined, {
        timeZone: "Asia/Kolkata",
      }),
    },
    waitlist: { $elemMatch: { $eq: req.user._id } },
  })
    .populate("organiser", "-password")
    .populate("players", "-password")
    .populate("waitlist", "-password");
  return res.status(200).send(events);
};

module.exports = {
  addNewEvent,
  getEvents,
  getSingleEvent,
  addToWaitlist,
  addToPlayers,
  getPlaying,
  getWaitlisted,
};
