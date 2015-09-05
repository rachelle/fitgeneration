var express = require('express');
var passport = require('passport');
var User = require('../models/User');
var router = express.Router();


var methodOverride = require('method-override');

// require controllers 
var SessionsController = require('../controllers/Sessions');
var UsersController   = require('../controllers/Users');
var workoutsController = require("../controllers/workout");


/* Adding a root route */
router.get('/', function(req, res, next) {
  res.render('index', {user: req.user});
});

router.get('/register', function (req, res) {
  res.render('auth/register');
});

router.post('/register', function (req, res) {
  User.register(new User({username: req.body.username, name: req.body.name}), req.body.password, function(err, user) {
    if (err) return res.render('auth/register', {user: user});
    passport.authenticate('local')(req, res, function () {
      req.session.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login', {user : req.user});
});

router.post('/login', passport.authenticate(
  'local',
  {
    failureRedirect: '/login'
  }),
  function (req, res, next) {
    req.session.save(function (err) {
      if (err) return next(err);
      res.redirect('/');
    });
  }
);

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


// checks if user is logged in
var isLoggedIn = function(req, res, next) {
  
  if (!req.isAuthenticated()) 
    return next();
    
    res.redirect('/login');
  }

  router.get('/secret', isLoggedIn, function (req, res) {
  res.render('secret', {user: req.user});
});




// renders sessions controller
router.get('/login',                        SessionsController.sessionsNew);
router.post('/login', passport.authenticate(
  'local',
  {
    failureRedirect: '/login'
  }),                                       SessionsController.sessionsCreate);
router.get('/logout',                       SessionsController.sessionsDelete);


/* users controllers */
router.get('/auth/register',                UsersController.usersNew);
router.post('/auth/register',               UsersController.usersCreate);
router.get('/users/:id',        isLoggedIn, UsersController.userShow);
router.get('/users/:id/edit',   isLoggedIn, UsersController.userEdit);
router.put('/users/:id',        isLoggedIn, UsersController.userUpdate);
router.delete('/users/:id',     isLoggedIn, UsersController.userDelete);
module.exports = router;




