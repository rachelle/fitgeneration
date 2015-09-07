var express = require('express');
var router  = express.Router();

var passport       = require('passport');
var methodOverride = require('method-override');

var User = require('../models/User');


// require controllers 
var SessionsController = require('../controllers/Sessions');
var UsersController    = require('../controllers/Users');
var PhotosController   = require('../controllers/Photos');
var WorkoutsController = require('../controllers/Workouts');


/* Adding a root route */
router.get('/', function (req, res) {
  res.render('index', {user: req.user});
});


/* oauth authentication for fb/twitter accounts */
router.get('/auth/facebook', passport.authenticate('facebook',
  {
    scope:
      [
        'email',
        'user_birthday',
        'user_location'
      ]
  })
);

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/home',
  failureRedirect: '/login'
  })
);

router.get('/auth/twitter', passport.authenticate('twitter',
  {
    scope:
      [
        'email',
        'user_location'
      ]
  })
);

router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/home',
  failureRedirect: '/login'
  })
);

/* checks if users is logged in */
var isLoggedIn = function(req, res, next) {
  
  if (!req.isAuthenticated()) {
   res.redirect('/login');

  }
    return next();
};

// renders sessions controller
router.get('/login',    SessionsController.sessionsNew);
router.post('/login', passport.authenticate(
  'local',
  {
    failureRedirect: '/login'
  }),                  SessionsController.sessionsCreate);
router.get('/logout',  SessionsController.sessionsDelete);

/* renders photos controllers */
router.get('/photos',          isLoggedIn, PhotosController.renderPhotosIndex);
router.get('/photos/new',      isLoggedIn, PhotosController.renderPhotosNew); 
router.post('/photos',         isLoggedIn, PhotosController.renderPhotosCreate);
router.get('/photos/:id/edit', isLoggedIn, PhotosController.renderPhotosEdit);
router.put('/photos/:id',      isLoggedIn, PhotosController.renderPhotosUpdate); 
router.get('/photos/:id',      isLoggedIn, PhotosController.renderPhotosShow);
router.delete('/photos/:id',   isLoggedIn, PhotosController.deletePhoto);

/* users controllers */
router.get('/auth/register',                UsersController.usersNew);
router.post('/auth/register',               UsersController.usersCreate);
router.get('/users',            isLoggedIn, UsersController.usersIndex);
router.get('/users/:id',        isLoggedIn, UsersController.userShow);
router.get('/users/:id/edit',   isLoggedIn, UsersController.userEdit);
router.put('/users/:id',        isLoggedIn, UsersController.userUpdate);
router.delete('/users/:id',     isLoggedIn, UsersController.userDelete);

/* workouts controllers */
router.get('/workouts',     isLoggedIn, WorkoutsController.WorkoutsIndex);
router.get('/workouts/new', isLoggedIn, WorkoutsController.WorkoutsNew);
router.post('/workouts',    isLoggedIn)
router.post(   '/workouts',    isLoggedIn,  WorkoutsController.create);
router.get(    '/workouts/:id', isLoggedIn, WorkoutsController.show);
router.delete( '/workouts/:id', isLoggedIn,WorkoutsController.destroy);


module.exports = router;


