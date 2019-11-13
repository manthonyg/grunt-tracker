// models/Book.js

const mongoose = require('mongoose');


const SquadSchema = new mongoose.Schema({
  unit: {
    type: String,
    required: true
  },
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
    type: String,
    required: true
  },

});

module.exports = Squad = mongoose.model('squad', SquadSchema);
