var mongoose = require('mongoose');
var Schema = mongoose.Schema;  
var passportLocalMongoose = require('passport-local-mongoose');

/* require photo model */
var Photo = require('./Photo');
var Exercise = require('./Exercise');
var Workout = require('./Workout');
var Message = require('./Message');

var User = new mongoose.Schema({
  // the passport-local-mongoose module 
  // creates username and email for the User
  name:     String,
  weight:   Number,
  gym:      String, 
  url:      String,
  avatar:   String,
  image:    String,
  goals:    String,
  status:   String,

  photos: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Photo'
    }],
  workouts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workout'
  }], 
  exercises: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise'
  }],
  plans: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Plan'
  }]

});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model ('User', User);