var express  = require('express'); 
var mongoose = require('mongoose'); 

/* source in require models */
var Workout = require('../models/Workout');
var User    = require('../models/User');

var router = express.Router();

/* get all users workouts */
var WorkoutsIndex = function(req, res, next) {
    Workouts.find({}, function (err, workouts) {
      if (err) res.send(err);
        res.render('./workouts',
          {
            workouts: workouts, 
            user: req.user
          });
      });
};

/* renders a new workout plan */
var WorkoutsNew = function(req, res) {
    var workouts = Workout.all 
      res.render('./workouts/new', {user: req.user, workouts:workouts});
};

/* create a workout plan */
var WorkoutsCreate = function(req, res, next) {
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
        req.user.workouts.push(workouts); 
        req.user.save(); 
        res.redirect('/workouts/' + workout.id)
    });
};

/* edit your workout plan */
var WorkoutsEdit = function(req, res, next) {
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
var WorkoutsUpdate = function(req, res, next) {
    var id = req.params.id; 

    Workout.findById({_id:id}, function(err, workout) {
      if(err) res.send(err); 
        if (req.body.name) workout.name = req.body.name; 
        if (req.body.reps) workout.reps = req.body.reps;
        if (req.body.sets) workout.sets = req.body.sets; 
        if (req.body.weight) workout.weight = req.body.weight; 
        if (req.body.content) workout.content = req.body.content; 
        if (req.body.date) workout.date = req.body.date; 
        if (req.body.bodypart) workout.bodypart = req.body.bodypart; 
    
    workout.save(function(err) {
      if (err) res.send(err); 
        res.redirect('/workouts/' + id);
    });

  });
};

/* renders workout show page */
var WorkoutsShow = function(req, res, next) {
    var id = req.params.id; 

    Workout.findByAndRemove({_id:id}, function(err, workout) {
      if(err) res.send(err); 
      res.render(
        './workouts/show', {
          workout: workout, 
          user: req.user
        });
    });
};

/* user can delete their workout plan */
var WorkoutDelete = function(req, res) {
    var id = req.params.id; 
    var workout_id = req.params.id; 

    Workouts.findByIdAndRemove({_id:id}, function (err) {
    if (err) res.send(err);
      res.redirect('/workouts')
  });
};

/* export workout module */
module.exports = {
  
  WorkoutsIndex:  WorkoutsIndex,
  WorkoutsNew:    WorkoutsNew, 
  WorkoutsCreate: WorkoutsCreate, 
  WorkoutsEdit:   WorkoutsEdit,
  WorkoutsUpdate: WorkoutsUpdate, 
  WorkoutsShow:   WorkoutsShow, 
  WorkoutDelete:  WorkoutDelete,

};