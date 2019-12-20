// models/Squad.js

const mongoose = require('mongoose');


const SquadSchema = new mongoose.Schema({

  company: {
    type: String,
    required: true
  },
  platoon: {
    type: String,
    required: true
  },
  squad: {
    type: String,
    required: true
  },
  callsign: {
    type: String
  },

});

module.exports = Squad = mongoose.model('squad', SquadSchema);
