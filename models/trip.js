var mongoose = require('mongoose');
var config = require('../config.js');
var timestamps = require('mongoose-timestamp');

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
  images: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Image'} ],
  storyMarkdown: String
});

tripSchema.plugin(timestamps,  {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = mongoose.model('Trip', tripSchema)