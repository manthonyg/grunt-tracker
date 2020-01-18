const mongoose = require("mongoose");

const AccountabilitySchema = new mongoose.Schema({
  accountedFor: { type: Boolean },
  date: { type: Date }
});
const MarineSchema = new mongoose.Schema({
  first: { type: String },
  last: { type: String },
  middle: { type: String },
  rank: { type: String },
  unit: { type: String },
  company: { type: String },
  platoon: { type: String },
  squad: { type: String },
  team: { type: String, default: "teamHq" },
  edipi: { type: String },
  blood_type: { type: String },
  religion: { type: String },
  accountability: {
    accountedFor: { type: Boolean, default: false },
    date: { type: Date }
  },

  appointments: [
    {
      date: String,
      appointment_type: String,
      location: String,
      time: String
    }
  ],

  weapons: [
    {
      name: String,
      serial: String
    }
  ],

  body: {
    pft: [
      {
        score: String,
        last_updated: String
      }
    ],
    cft: [
      {
        score: String,
        last_updated: String
      }
    ]
  },
  currSquad: { type: mongoose.Schema.Types.ObjectId, ref: "squad" }
});

module.exports = Marine = mongoose.model("marine", MarineSchema);
