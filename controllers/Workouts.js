var express  = require('express'); 
var mongoose = require('mongoose'); 

/* source in require models */
var Workout = require('../models/Workout');
var User    = require('../models/User');

var router = express.Router();

/* get all users workouts */
module.exports.renderWorkoutsIndex = function(req, res, next){
    Workout.find(function(err, workouts) {
      if (err) res.send('> ' + err);
        res.render('./workouts',
        {
          workouts: workouts, 
          user: req.user
        });
    });
};

/* renders a new workout plan */
module.exports.renderWorkoutsNew = function(req, res){
    var workouts = Workout.all 
      res.render('./workouts/new', {user: req.user, workouts:workouts});
};

/* create a workout plan */
module.exports.renderWorkoutsCreate = function(req, res, next){
    var Workout = new Workout({
      name: req.body.name,
      reps: req.body.reps, 
      sets: req.body.sets, 
      weight: req.body.weight, 
      content: req.body.content, 
      date: req.body.date,
      bodypart: req.body.bodypart, 
      user: req.user
    });
    console.log(req.body); 
    workout.save(function(err){
      if(err){res.send('> ', + err);}
        req.user.workouts.push(workout); 
        req.user.save(); 
        res.redirect('/workouts/' + workout.id)
    });
};

/* edit your workout plan */
module.exports.renderWorkoutsEdit = function(req, res, next){
  var id = req.params.id; 
  var workout_id = req.params.id; 

  Workout.findById({_id:id}, function(err, workout){
    console.log('workout', workout);
    if(err) res.send(err); 
      res.render(
        './workouts/edit', {
          workout: workout, 
          user: req.user
        });
    })
};

/* update workout for any changes */
module.exports.renderWorkoutsUpdate = function(req, res, next){
    var id = req.params.id; 

    Workout.findById({_id:id}, function(err, workout){
      if(err) res.send(err); 
        if (req.body.name) workout.name = req.body.name; 
        if (req.body.reps) workout.reps = req.body.reps;
        if (req.body.sets) workout.sets = req.body.sets; 
        if (req.body.weight) workout.weight = req.body.weight; 
        if (req.body.content) workout.content = req.body.content; 
        if (req.body.date) workout.date = req.body.date; 
        if (req.body.bodypart) workout.bodypart = req.body.bodypart; 
    
    workout.save(function(error) {
      if (error) res.send(error); 
        res.redirect('/workouts/' + id);
    });

  });
};

/* renders workout show page */
module.exports.renderWorkoutsShow = function(req, res, next){
    var id = req.params.id; 

    Workout.findById({_id:id}, function (error, workout) {
      console.log('workout', workout);
      if(error) res.send(error); 
      res.render(
        './workouts/show', {
          workout: workout, 
          user: req.user
        });
    });
};

/* user can delete their workout plan */
module.exports.deleteWorkout = function(req, res) {
    var id = req.params.id; 
    var workout_id = req.params.id; 

    Workout.findByIdAndRemove({_id:id}, function (error) {
    if (error) res.send(error);
      res.redirect('/workouts')
  });
};

