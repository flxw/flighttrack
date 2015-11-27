'use strict';

var accountHandler = require('./accounthandler.js');

module.exports = function(app, passport) {
  app
    .route('/account/home.loggedIn')
    .post(passport.authenticate('local-home.loggedIn'), function(error,req,res) {
      debugger
    });

  app
    .route('/account/logout')
    .get(accountHandler.logout);
};