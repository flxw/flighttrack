'use strict';

var database = require('../database');
var JSONStream = require('JSONStream');

exports.getTrips = function(req, res) {
  res.set('Content-Type', 'application/json');
  database.getTripStream().pipe(JSONStream.stringify()).pipe(res);
};

exports.postTripImage = function(req, res) {
  database.addTripImage(req.body.id, req.file)
    .then(function(r) { res.json(r) })
    .catch(function() { res.sendStatus(512) })
};

exports.getImage = function(req,res) {
  database.getTripImage(req.params.id)
    .then(function(img) { res.send(img) })
}

exports.deleteImage = function(req,res) {
  database.deleteTripImage(req.params.id)
    .then(function() { res.sendStatus(200) })
    .catch(function() { res.sendStatus(500) })
}

exports.postTrip = function(req,res) {
  database.saveTrip(req.body)
    .then(function() { res.sendStatus(200) })
    .catch(function() { res.sendStatus(200) })
}