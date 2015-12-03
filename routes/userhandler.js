'use strict';

var database = require('../database');
var User  = require('../models/user.js');

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

exports.getUser = function(req, res) {
  // TODO trips need to know about their travellers
  User.findById(req.params.uid, function(e,u) {
    res.json(u._doc)
  });
};