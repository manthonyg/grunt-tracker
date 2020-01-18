// models/Squad.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SquadSchema = new mongoose.Schema({
  company: { type: String, required: true },
  platoon: { type: String, required: true },
  squad: { type: String, required: true },
  callsign: { type: String },

  teams: {
    teamHq: [{ type: Schema.Types.ObjectId, ref: "marine" }],
    teamOne: [{ type: Schema.Types.ObjectId, ref: "marine" }],
    teamTwo: [{ type: Schema.Types.ObjectId, ref: "marine" }],
    teamThree: [{ type: Schema.Types.ObjectId, ref: "marine" }]
  },

  marines: [{ type: Schema.Types.ObjectId, ref: "marine" }]
});

module.exports = Squad = mongoose.model("squad", SquadSchema);
