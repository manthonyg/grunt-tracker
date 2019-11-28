
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
        date: Date,
        appointment_type: String
     
        }
    ], 

   

});

module.exports = Marine = mongoose.model('marine', MarineSchema);
