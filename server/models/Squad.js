// models/Squad.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema

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
            current_squad: { type: mongoose.Schema.Types.ObjectId, ref: 'squad' }  

    });


const SquadSchema = new mongoose.Schema({

  company: {type: String,required: true},

  platoon: {type: String, required: true},

  squad: {type: String, required: true},

  callsign: {type: String},
  teams: {

    teamHq: [{ type: Schema.Types.ObjectId, ref: 'marine' }],

    teamOne: [{ type: Schema.Types.ObjectId, ref: 'marine' }],

    teamTwo: [{ type: Schema.Types.ObjectId, ref: 'marine' }], 

    teamThree: [{ type: Schema.Types.ObjectId, ref: 'marine' }]
  },
  marines: [{ type: Schema.Types.ObjectId, ref: 'marine' }]

});


module.exports = Squad = mongoose.model('squad', SquadSchema);
