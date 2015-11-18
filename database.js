'use strict';

var config = require('./config.js');
var q = require('q');

var Trip = require('./models/trip.js');


exports.getTripStream = function() {
  return Trip.find().stream()
};