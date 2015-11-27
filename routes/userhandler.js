'use strict';

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