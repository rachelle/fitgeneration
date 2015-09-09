var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

/* require user model */
var User = require('./User');

/* Define Photo Schema */
var Photo = new mongoose.Schema({
    image:      String, 
    caption:    String, 
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
}); 

/* export schema */
module.exports = mongoose.model ('Photo', Photo);