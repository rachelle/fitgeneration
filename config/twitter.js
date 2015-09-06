require('dotenv').load();
var passport        = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy;


passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
    //   return done(err, user);
    console.log(token);
    console.log(profile);

    done(null, profile);

}));




module.exports = passport;

