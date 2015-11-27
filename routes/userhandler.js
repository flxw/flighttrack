'use strict';

var database = require('../database');

exports.login = function(req,res) {
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/')
};

exports.isLoggedIn = function(req,res,next) {
  if (req.isAuthenticated()) return next();
  else res.redirect('/');
};

exports.getTrips = function(req, res) {
  database
    .getTripsForUser(req.params.uid)
    .then(function(trips) {
      res.json(trips);
    })
    .catch(function(e) {
      res.sendStatus(500);
    });
};