var mongoose = require('mongoose'); 
var Schema   = mongoose.Schema; 

var User = require('./User');
var Meal = require('./Meal');

var Meal = new mongoose.Schema({
  description: String, 
  numOfCals :  String, 
  meal:        String, 
  user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
      }
  });

 module.exports = mongoose.model('Meal', Meal);