'use strict';

var config = require('./config.js');
var q = require('q');
var winston    = require('winston');


var Trip = require('./models/trip.js');


exports.getTripStream = function() {
  return Trip.find().stream()
};

exports.addTripImage = function(tripId, image) {
  var deferred = q.defer();

  Trip.findByIdAndUpdate(tripId, { $push: { images: image }}, function (err) {
    if (err) { winston.error(err); deferred.reject(err) }
    else { deferred.resolve() }
  });

  return deferred.promise
};