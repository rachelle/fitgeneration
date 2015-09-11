var mongoose = require('mongoose'); 
    
var Comment = new mongoose.Schema({
    content: String, 
    user: {
      type: mongoose.Schema.Types.Object.Id, ref:'User'
    }
});


module.exports = mongoose.model('Comment', Comment); 