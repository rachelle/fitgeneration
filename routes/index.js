var express = require('express');
var router  = express.Router();
var multer = require('multer');
var passport       = require('passport');
var methodOverride = require('method-override');

var User = require('../models/User');

// require controllers 
var SessionsController  = require('../controllers/Sessions');
var PhotosController    = require('../controllers/Photos');
var WorkoutsController  = require('../controllers/Workouts');
var UsersController     = require('../controllers/Users');
var ExercisesController = require('../controllers/Exercises');
var PlansController      = require('../controllers/Plans');

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
    }),                SessionsController.sessionsCreate);
router.get('/logout',  SessionsController.sessionsDelete);

/* renders photos controller */
router.get('/photos',          isLoggedIn, PhotosController.renderPhotosIndex);
router.get('/photos/new',      isLoggedIn, PhotosController.renderPhotosNew); 
router.post('/photos',         isLoggedIn, PhotosController.renderPhotosCreate);
router.get('/photos/:id/edit', isLoggedIn, PhotosController.renderPhotosEdit);
router.put('/photos/:id',      isLoggedIn, PhotosController.renderPhotosUpdate); 
router.get('/photos/:id',      isLoggedIn, PhotosController.renderPhotosShow);
router.delete('/photos/:id',   isLoggedIn, PhotosController.deletePhoto);

/* workouts controller */
router.get('/workouts',          isLoggedIn, WorkoutsController.renderWorkoutsIndex);
router.get('/workouts/new',      isLoggedIn, WorkoutsController.renderWorkoutsNew);
router.post('/workouts',         isLoggedIn, WorkoutsController.renderWorkoutsCreate);
router.get('/workouts/:id/edit', isLoggedIn, WorkoutsController.renderWorkoutsEdit);
router.put('/workouts/:id',      isLoggedIn, WorkoutsController.renderWorkoutsUpdate);
router.get('/workouts/:id',      isLoggedIn, WorkoutsController.renderWorkoutsShow);
router.delete('/workouts/:id',   isLoggedIn, WorkoutsController.deleteWorkout);

/* exercises controller */
router.get('/exercises',          isLoggedIn, ExercisesController.renderExercisesIndex);
router.get('/exercises/new',      isLoggedIn, ExercisesController.renderExercisesNew);
router.post('/exercises',         isLoggedIn, ExercisesController.renderExercisesCreate); 
router.get('/exercises/:id/edit', isLoggedIn, ExercisesController.renderExercisesEdit);
router.put('/exercises/:id',      isLoggedIn, ExercisesController.renderExercisesUpdate); 
router.get('/exercises/:id',       isLoggedIn, ExercisesController.renderExercisesShow);
router.delete('/exercises/:id',   isLoggedIn, ExercisesController.deleteExercise);

/* plans controller */
router.get('/plans/new',    isLoggedIn, PlansController.renderPlanNew); 
router.post('/plans',       isLoggedIn, PlansController.renderPlansCreate);
router.get('/plans/:id',    isLoggedIn, PlansController.renderPlansShow);
router.delete('/plans/:id', isLoggedin, PlansController.deletePlan);

/* users controller */
router.get('/auth/register',              UsersController.usersNew);
router.post('/auth/register',             UsersController.usersCreate);
router.get('/users',          isLoggedIn, UsersController.usersIndex);
router.get('/users/:id',      isLoggedIn, UsersController.userShow);
router.get('/users/:id/edit', isLoggedIn, UsersController.userEdit);
router.put('/users/:id',      isLoggedIn, UsersController.userUpdate);
router.delete('/users/:id',   isLoggedIn, UsersController.userDelete);

module.exports = router;