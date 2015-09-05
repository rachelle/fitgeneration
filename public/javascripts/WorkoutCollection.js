var WorkoutCollection = function(el, model) {
  this.list = [];
  this.$el  = $(el);

  model.collection = this;
};

WorkoutCollection.prototype.load = function() {
  // save reference to current object as self
  var self = this;

  $.ajax({
    method:   "GET",
    url:      "http://localhost:3000/workouts",
    dataType: "json"
  })
    .success(function(workouts) {
      // clear out the donuts list
      self.list = [];

      // add each downloaded doughnut to the list
      workouts.forEach(function(workout) {
        self.list.push(
          new Workout(workout.title, workout.bodypart, workout.id)
        );
      });

      // using .map!
      // self.list = doughnuts.map(function(doughnut) {
      //   return new Doughnut(doughnut.flavor, doughnut.style));
      // });

      // clear out and then re-render the list
      console.log("**RENDER WORKOUTS LIST**");
      self.$el.empty();
      self.$el.append(self.render());
    })
    .fail(function(err) {
      console.log(err);
    });
};
// alias #load as #reload for semantic purposes
WorkoutCollection.prototype.reload = WorkoutCollection.prototype.load;

WorkoutCollection.prototype.render = function() {
  // create a placeholder html list
  var $list = $('<ul>').attr('id', 'workout');

  // add all the doughnuts
  this.list.forEach(function(workout) {
    $list.append(workout.render());
  });

  return $list;
};

WorkoutCollection.prototype.push = function(workout) {
  workout.create();
};