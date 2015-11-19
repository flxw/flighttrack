var mongoose = require('mongoose')
var config = require('../config.js')

var imageSchema = new mongoose.Schema({
  buffer: Buffer,
  encoding: String,
  mimetype: String,
  originalname: String,
  size: Number
});

module.exports = mongoose.model('Image', imageSchema)