'use strict';

var userHandler = require('./userhandler.js');

module.exports = function(app, passport) {
  app
    .route('/user/:uid([0-9a-fA-F]{24})')
    .get(userHandler.getUser);

  app
    .route('/user/login')
    .get(userHandler.isLoggedIn, userHandler.login)
    .post(passport.authenticate('local-login'), userHandler.login);

  app
    .route('/user/logout')
    .get(userHandler.logout);

  app
    .route('/user/register')
    .post(passport.authenticate('local-signup'), userHandler.registerUser);
};