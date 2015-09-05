var Workout = function(title, bodypart, id) {
  this.id        = id;
  this.title     = title;
  this.bodypart     = bodypart;
};

Workout.prototype.render = function() {
  console.log("Rendering workout: ", this);

  // save reference to current object as self
  var self = this;

  // render from the template (found at the bottom of the HTML!)
  var $li = $(Workout.template({workout: this}));

  // user $#find() to search through the HTML and add an event listener
  $li.find('button.destroy').on('click', function(e) {
    self.destroy();
  });

  return $li;
};

Workout.prototype.destroy = function() {
  console.log("Destroying workout: " + this.id);

  // save reference to current object as self
  var self = this;

  $.ajax({
    method:   "DELETE",
    url:      "http://localhost:3000/workouts/" + this.id,
    dataType: "json"
  })
    .success(function(data) {
      console.log('Destroyed workout: ', self, ' with status: ', data);
      Workout.collection.reload(); // the DoughnutCollection
    })
    .fail(function(err) {
      console.log(err);
    });
}

Workout.prototype.create = function() {
  console.log("Creating workout...");

  // save reference to current object as self
  var self = this;

  $.ajax({
    method:   "POST",
    url:      "http://localhost:3000/workouts",
    data:     $.param({
      workout: {
        title: this.title,
        bodypart:  this.bodypart
      }
    }),
    dataType: "json"
  })
    .success(function(data) {
      console.log('Created bodypart: ', data);
      Workout.collection.reload(); // the DoughnutCollection
    })
    .fail(function(err) {
      console.log(err);
    });
};