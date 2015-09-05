var mongoose = require('mongoose'); 
    mongoose.connect('mongodb://localhost:27017/fitgeneration');

    var User = require('.models/User');

    var newUsers; 

    newUsers = [
    {
      email: hi@hi.com
      password: hi

    ]
  }

  newUsers.forEach(function(user){
        User.register(new User({
          name: user.name,
          age: user.age,
          zipCode: user.zipCode,
          bio: user.bio,
          picture: user.picture,
          puppies: user.puppies
        });
      )};

        mongoose.disconnect();
