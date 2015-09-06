var mongoose = require('mongoose'); 


var passportLocalMongoose = require('passport-local-mongoose');


var User = new mongoose.Schema({
  username: String, 
  password: String,
  email:String,
  weight:    Number,
  status: String  

});


User.plugin(passportLocalMongoose);


module.exports = mongoose.model ('User', User);