var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

/*  source in require model */
var User = require('./User');

/* Define Workout Schema */
var Workout = new mongoose.Schema({
    name:     String, 
    reps:     Number,
    sets:     Number, 
    weight:   String, 
    content:  String,
    date:     Date, 
    bodypart: String,
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
});

/* export workout schema */
module.exports = mongoose.model('Workout', Workout);
