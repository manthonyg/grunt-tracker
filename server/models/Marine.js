// models/Marine.js

const mongoose = require('mongoose');

const MarineSchema = new mongoose.Schema({
  first: {
    type: String,
    required: true
  },
  last: {
    type: String,
    required: true
  },
  rank: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true,
    
  },
  company: {
    type: String,
    required: true,
    
  },
  platoon: {
    type: String,
    required: true,
  },
  squad: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  appointments: {
    type: Date, default: Date.now
  }

});

module.exports = Marine = mongoose.model('marine', MarineSchema);
