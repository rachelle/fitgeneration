var mongoose = require('mongoose'); 
var Schema   = mongoose.Schema; 

/* require user model */
var User     = require('./User');
var Exercise = require('./Exercise');
var Workout  = require('./Workout');

var Exercise = new mongoose.Schema({
    description: String, 
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
      }, 
    workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout'
    }
}); 

/* exports Schema */
module.exports = mongoose.model('Exercise', Exercise); 
