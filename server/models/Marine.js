// models/Marine.js
const mongoose = require("mongoose");
let Marine;
const MarineSchema = new mongoose.Schema({
  // basic //
  first: { type: String },
  last: { type: String },
  middle: { type: String },
  rank: { type: String },
  billet: { type: String },

  // unit //
  unit: { type: String },
  company: { type: String },
  platoon: { type: String },
  squad: { type: String },
  team: { type: String, default: "teamHq" },

  //kill card //
  zap: { type: String },
  edipi: { type: String },
  blood_type: { type: String },
  religion: { type: String },

  //accountability//
  accountability: {
    accountedFor: { type: Boolean, default: false },
    date: { type: Date }
  },

  //appointments//
  appointments: [
    {
      date: Date,
      appointment_type: String,
      location: String,
      time: String
    }
  ],

  primary: {
    m4: { type: Boolean },
    m27: { type: Boolean },
    m38: { type: Boolean },
    m203: { type: Boolean },
    peq15: { type: Boolean },
    peq16: { type: Boolean }
  },
  optics: {
    rco: { type: Boolean },
    gls: { type: Boolean },
    sdo: { type: Boolean },
    leupold: { type: Boolean },
    pas28: { type: Boolean },
    pvs24: { type: Boolean },
    pvs14: { type: Boolean }
  },
  supplementary: {
    foretrex: { type: Boolean },
    compass: { type: Boolean },
    binos: { type: Boolean }
  },

  //body//
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
