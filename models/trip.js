var mongoose = require('mongoose')
var config = require('../config.js')

var tripSchema = new mongoose.Schema({
  destination: {
    name: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  dates: {
    start: Date,
    end: Date
  },
  images: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Image'}, ]
});

module.exports = mongoose.model('Trip', tripSchema)