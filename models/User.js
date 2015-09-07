var mongoose = require('mongoose'); 
var passportLocalMongoose = require('passport-local-mongoose');

/* require photo model */
var Photo = require('./Photo');

var User = new mongoose.Schema({
  // the passport-local-mongoose module 
  // creates username and email for the User
  name:     String,
  weight:   Number,
  gym:      String, 
  photo:    String,
  goals:    String,
  status:   String,
  photos: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Photo'
  }]  

});


User.plugin(passportLocalMongoose);

module.exports = mongoose.model ('User', User);