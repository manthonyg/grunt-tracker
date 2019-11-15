// models/Book.js

const mongoose = require('mongoose');

const MedicalAppointment = new Schema({
  Date: {
    type: Date
  }
});

const DentalAppointment = new Schema({
  Date: {
    type: Date
  }
});

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
  }
  medical: [MedicalAppointment],
  dental: [DentalAppointment],
  other: {
    type: String,
  }
});

module.exports = Marine = mongoose.model('marine', MarineSchema);
