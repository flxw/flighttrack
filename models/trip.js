var mongoose = require('mongoose');
var config = require('../config.js');
var timestamps = require('mongoose-timestamp');

var tripSchema = new mongoose.Schema({
  destination: {
    name: { type: String, default: 'New trip' },
    coordinates: {
      latitude:  { type: Number, default: 52.393787  },
      longitude: { type: Number, default: 13.1296473 }
    }
  },
  dates: {
    start: { type: Date, default: Date.now },
    end:   { type: Date, default: Date.now }
  },
  images: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Image'} ],
  storyMarkdown: { type: String, default: '' }
});

tripSchema.plugin(timestamps,  {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = mongoose.model('Trip', tripSchema)