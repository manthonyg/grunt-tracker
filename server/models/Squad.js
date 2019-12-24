// models/Squad.js

const mongoose = require('mongoose');


const MarineSchema = new mongoose.Schema(
    {
    first: {type: String},
    last: {type: String},
    middle: {type: String},
    rank: {type: String},
    unit: {type: String},
    company: {type: String},
    platoon: {type: String},
    squad: {type: String},
    team: {type: String, default: '1'},
    edipi: {type: String},
    blood_type: {type: String},
    religion: {type: String},
    accountability: {type: Boolean},

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

    });


const SquadSchema = new mongoose.Schema({

  company: {type: String,required: true},

  platoon: {type: String, required: true},

  squad: {type: String, required: true},

  callsign: {type: String},

  team_hq: [MarineSchema],

  team_one: [MarineSchema],

  team_two: [MarineSchema], 

  team_three: [MarineSchema]

});

module.exports = Squad = mongoose.model('squad', SquadSchema);
