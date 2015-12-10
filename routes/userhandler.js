'use strict';

var User  = require('../models/user.js');

exports.login = function(req,res) {
  res.json({
    _id: req.user._id,
    firstname: req.user.firstname,
    lastname: req.user.lastname
  });
};

exports.logout = function(req, res) {
  req.logout();
  res.sendStatus(200);
};

exports.getUser = function(req, res) {
  // TODO trips need to know about their travellers
  User.findById(req.params.uid, function(e,u) {
    res.json(u._doc)
  });
};

exports.registerUser = function(req,res) {
  res.json({ _id: req.user._id })
}

exports.isLoggedIn = function(req,res,next) {
  if (req.isAuthenticated()) return next();
  else res.sendStatus(401);
};