'use strict';

var database = require('../database');
var JSONStream = require('JSONStream');

exports.getTrips = function(req, res) {
  res.set('Content-Type', 'application/json');
  database.getTripStream().pipe(JSONStream.stringify()).pipe(res);
};

exports.postTripImage = function(req, res) {
  database.addTripImage(req.body.id, req.image)
    .then(function() { res.sendStatus(200) })
    .catch(function() { res.sendStatus(512) })
};