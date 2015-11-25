'use strict';

var accountHandler = require('./accounthandler.js');

module.exports = function(app, passport) {
  app
    .route('/account/login')
    .post(passport.authenticate('local-login'), function(error,req,res) {
      debugger
    });

  app
    .route('/account/logout')
    .get(accountHandler.logout);
};