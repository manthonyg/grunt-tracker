
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
    appointments: {
        type: Array
    },
    accounted: {
        type: '',
    }

});

module.exports = Marine = mongoose.model('marine', MarineSchema);
