'use strict';

var database = require('../database')
var JSONStream = require('JSONStream')

exports.getTrips = function(req, res) {
  res.set('Content-Type', 'application/json');
  database.getTripStream().pipe(JSONStream.stringify()).pipe(res);
};