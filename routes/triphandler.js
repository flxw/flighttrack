'use strict';

var Trip  = require('../models/trip.js');
var Image = require('../models/image.js');

var winston = require('winston');
var database = require('../database');

exports.postTripImage = function(req, res) {
  var img = new Image(req.file);

  // save image to db
  img.save(function(err, savedImg) {
    // append image id to trip afterwards
    Trip.findByIdAndUpdate(req.params.tripId, { $push: { images: savedImg._doc._id }}, function (err) {
      if (err) {
        winston.error(err);
        res.sendStatus(500);
      } else {
        res.json({
          _id: savedImg._id,
          originalname: savedImg.originalname
        });
      }
    });
  });
};

exports.deleteImage = function(req,res) {
  Image.findByIdAndRemove(req.params.imageId, function(err) {
    if (err) {
      winston.error(err);
      res.sendStatus(500);
    } else {
      Trip.update({_id: req.params.tripId}, {$pull: {images: {$in: [req.params.imageId]}}}, {multi: true}, function (err) {
        if (err) {
          winston.error(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      })
    }
  });
};

exports.postTrip = function(req,res) {
  database.saveTrip(req.body)
    .then(function() { res.sendStatus(200) })
    .catch(function() { res.sendStatus(200) })
}

exports.getTrip = function(req,res) {
  Trip.findById(req.params.id, function(e,t) {
    if (e) res.sendStatus(500)
    else res.json(t)
  })
}

exports.updateTrip = function(req,res) {
  var t = req.body;

  Trip.update({_id: t._id}, { $set: t }, function(e,nt){
    if (e) res.sendStatus(500)
    else res.sendStatus(200)
  });
}