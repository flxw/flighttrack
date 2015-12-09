'use strict';

var userHandler = require('./userhandler.js');

module.exports = function(app, passport) {
  app
    .route('/user/:uid')
    .get(userHandler.getUser);

  app
    .route('/user/login')
    .post(passport.authenticate('local-login'), function(error,req,res) {
      debugger
    });

  app
    .route('/user/logout')
    .get(userHandler.logout);

  app
    .route('/user/register')
    .post(passport.authenticate('local-signup'), userHandler.registerUser);
};