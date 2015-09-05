var mongoose = require('mongoose');

var workoutSchema = new mongoose.Schema({
  title:  String,
  bodypart: String
});

var jsonFormatter = function (document, returnedObject, options) {
  returnedObject.id = returnedObject._id
  delete returnedObject._id;
  delete returnedObject.__v;
  return returnedObject;
};

workoutSchema.options.toJSON = {
  transform: jsonFormatter
};

module.exports = mongoose.model('Workout', workoutSchema);
