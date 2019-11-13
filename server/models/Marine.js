// models/Book.js

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
  }
});

module.exports = Marine = mongoose.model('marine', MarineSchema);
