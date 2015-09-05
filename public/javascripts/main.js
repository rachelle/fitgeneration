var _workouts;

$(function(){
  console.log("Document loaded!");

  // set the Doughnut model's template, using Underscore.js
  Workout.template = _.template($("#workout-template").html());

  // cache a reference to the list wrapper as a jQuery object
  // and initialize a doughnut collection that renders into it;
  // also set the doughnut model's collection to be this instance...
  _workouts = new WorkoutCollection($(".doughnuts-wrapper"), Workout);

  // load the doughnuts in the database
  _workouts.load();

  // when submitting a new doughnut form...
  $("#new-workout").on("submit", function(e) {
    // stop form from reloading page
    e.preventDefault();
    console.log("form submitted!");

    // create a new doughnut
    var title = $("#workout-title").val();
    var bodypart = $("#workout-bodypart").val();

    // clear the values in the form
    $("#workout-title").val('');
    $("#workout-bodypart").val($("#workout-title:first").val());

    // persist that doughnut (with a reference to the collection)
    _workouts.push(new Workout(title, bodypart));
  });
});