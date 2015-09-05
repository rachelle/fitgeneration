var Workout = require('../models/Workout');

var index = function(req, res, next) {
  Workout.find({}, function (err, workouts) {
    if (err) res.send(err);

    res.json(workouts);
  });
};

var show = function(req, res, next) {
  Workout.findById(req.params.id, function(err, workout) {
    if (err) res.send(err);

    res.json(workout);
  });
};

var create = function(req, res, next) {
  Workout.create(req.body.workout, function (err, workout) {
    if (err) res.send(err);

    res.json(workout);
  });
};

var destroy = function(req, res, next) {
  console.log(req.params)
  Workout.findByIdAndRemove(req.params.id, function (err, workout) {
    if (err) res.send(err);

    res.json(workout);
  });
};

module.exports = {
  index:   index,
  show:    show,
  create:  create,
  destroy: destroy
};