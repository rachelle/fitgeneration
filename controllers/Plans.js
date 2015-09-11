var express = require("express"); 
var mongoose = require("mongoose"); 

/* source in models */
var Plan = require('../models/Plan'); 
var User = require('../models/User'); 


var router = express.Router(); 


module.exports.renderPlansIndex = function(req, res, next){
  Plan.find(function(err, plans){
    if (err) res.send('> ' + err);
      res.render('./plans', 
      {
        plans: plans, 
        user: req.user
      });
  });
};

/* render a new random workout */
module.exports.renderPlansNew = function(req, res, next) {
  var plans = Plan.all 
    res.render('./plans/new', {user: req.user, plans:plans}); 
};

module.exports.renderPlansCreate = function(req, res){
  var plan = new Plan({
    name:    req.body.name, 
    reps:    req.body.reps, 
    sets:    req.body.set, 
    part:    req.body.part, 
    user_id: req.user.id
  }); 
  console.log(req.body); 
  plan.save(function(error){
    if(error){res.send('> ' + err);}
    res.redirect('/plans/' + plan.id);
  });
};

module.exports.renderPlansShow = function(req, res, next) {
  var id = req.params.id; 

  Plan.findById({_id: id}, function (error, plan) {
    console.log('plan', plan); 
    if (error) res.send(error); 
      res.render(
        './plans/show', {
          plan: plan, 
          user: req.user
        });
  });
};

module.exports.deletePlan = function(req, res){
  var id = req.params.id; 
  var plan_id = req.params.id; 

  Plan.findByIdAndRemove({_id:id}, function (error){
    if (error) res.send(error);
      res.redirect('/plans');
  }); 
};
    