var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.database.url);

var Trip = require('../models/trip.js');
var User = require('../models/user.js');

var tripa;
Trip.create({
  destination: { name: 'Dubai', coordinates: { latitude: 25.253834, longitude: 55.364814 } },
  dates: {
    start: new Date(2016, 2, 14),
    end: new Date(2016, 2, 15)
  }
}, function(e,t) {
  tripa = t
});
var tripb;
Trip.create({
  destination: { name: 'Melbourne', coordinates: { latitude: -37.8589546, longitude: 144.5191752 } },
  dates: {
    start: new Date(2016, 2, 14),
    end: new Date(2016, 2, 15)
  }
}, function(e,t) {
  tripb = t
});
var tripc;
Trip.create({
  destination: { name: 'Brisbane', coordinates: { latitude: -27.4790396, longitude: 152.4423969 } },
  dates: {
    start: new Date(2016, 2, 14),
    end: new Date(2016, 2, 15)
  }
}, function(e,t) {
  tripc = t
  User.create({
    firstname: 'Lukas',
    lastname: 'Faber',
    email: 'lukas.faber@student.hpi.de',
    password: 'wasd',
    trips: [tripa, tripb, tripc]
  })
});