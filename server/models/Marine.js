// models/Marine.js

const mongoose = require('mongoose');

const Appointment = new mongoose.Schema({
    appointment: {
        type: Date
    }
})

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
    team: {
        type: String,
        required: true
    },
    appointments: {
        type: Array
    },
    accounted: {
        type: Boolean,
        default: false
    }

});

module.exports = Marine = mongoose.model('marine', MarineSchema);
