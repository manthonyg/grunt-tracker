
const mongoose = require('mongoose');


const MarineSchema = new mongoose.Schema({
    first: {
        type: String,
       
    },
    last: {
        type: String,
       
    },
    rank: {
        type: String,
      
    },
    unit: {
        type: String,
       
    },
    company: {
        type: String,
        
    },
    platoon: {
        type: String,
       
    },
    squad: {
        type: String,
        
    },
    team: {
        type: String,
        
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
    gear: [
        {
        name: String,
        amount: Number
        }
    ],
    body: 
        {
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
        ],
     }
    

   

});

module.exports = Marine = mongoose.model('marine', MarineSchema);
