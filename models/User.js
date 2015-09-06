var mongoose = require('mongoose'); 


var passportLocalMongoose = require('passport-local-mongoose');


var User = new mongoose.Schema({
  username: String, 
  name: String,
  password: String,
  email:String,
  weight:    Number,
  gym: String, 
  photo: String,
  goals: String,
  status: String  

});


User.plugin(passportLocalMongoose);


module.exports = mongoose.model ('User', User);