var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.database.url);

var Trip = require('../models/trip.js');

new Trip({
  destination: { name: 'Dubai', coordinates: { latitude: 25.253834, longitude: 55.364814 } },
  dates: {
    start: new Date(2016, 2, 14),
    end: new Date(2016, 2, 15)
  }
}).save();

new Trip({
  destination: { name: 'Melbourne', coordinates: { latitude: -37.8589546, longitude: 144.5191752 } },
  dates: {
    start: new Date(2016, 2, 14),
    end: new Date(2016, 2, 15)
  }
}).save();

new Trip({
  destination: { name: 'Brisbane', coordinates: { latitude: -27.4790396, longitude: 152.4423969 } },
  dates: {
    start: new Date(2016, 2, 14),
    end: new Date(2016, 2, 15)
  }
}).save();