const { Schema, model, default: mongoose } = require("mongoose");

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String },
    maxPlayers: { type: Number, required: true },
    organiser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    waitlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const EventModel = model("Event", EventSchema);

module.exports = EventModel;
