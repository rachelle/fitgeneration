var mongoose = require('mongoose'); 

/* require user model */

var User = require('./User');

/* Define Photo Schema */
var Photo = new mongoose.Schema({
  photo: String, 
  caption: String, 
  date_taken: Date,  
  comment: String,
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }
}); 

/* export schema */
module.exports = mongoose.model ('Photo', Photo);