'use strict';

var Image = require('../models/image.js');
var winston = require('winston');

exports.getImage = function(req,res) {
  Image.findById(req.params.imageId, function(err, img) {
    if (err || !img) {
      winston.error(err);
      res.sendStatus(500);
    } else {
      res.send(img._doc.buffer)
    }
  });
};