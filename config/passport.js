'use strict';

var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user');

module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent home.loggedIn sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user._doc);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for home.loggedIn and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to home.loggedIn already exists
        User.findOne({ email: email }, function(err, user) {
          // if there are any errors, return the error
          if (err) return done(err);

          // check to see if theres already a user with that email
          if (user) {
            return done(null, false, 'That username is already taken.');
          } else {
            var newUser = new User();

            // set the user's local credentials
            newUser.email     = req.body.email;
            newUser.password  = newUser.generateHash(password);
            newUser.firstname = req.body.firstname;
            newUser.lastname  = req.body.lastname;

            // save the user
            newUser.save(function(err) {
              if (err) throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }
  ));

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, _id, password, done) { // callback with email and password from our form

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOneById(_id, function(err, user) {
        if (err) return done(err);

        if (!user)
          return done(null, false, 'No user found.');

        if (!user.validPassword(password))
          return done(null, false, 'Oops! Wrong password.');

        return done(null, user);
      });

    }
  ));
};
