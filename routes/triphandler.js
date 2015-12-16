'use strict';

var Trip  = require('../models/trip.js');
var Image = require('../models/image.js');
var User  = require('../models/user.js');

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
  var t = new Trip();

  t.save(function(e,nt){
    if (e) {
      res.sendStatus(500)
    } else {
      User.findByIdAndUpdate(req.user._id, { $push: { trips: nt._doc._id } }, function(e) {
        if (e) return res.sendStatus(500)
        else res.json(nt)
      });
    }
  })
};

exports.getTrip = function(req,res) {
  Trip.findById(req.params.id, function(e,t) {
    if (e) res.sendStatus(500)
    else res.json(t)
  })
};

exports.updateTrip = function(req,res) {
  var t = req.body;

  Trip.update({_id: t._id}, { $set: t }, function(e,nt){
    if (e) res.sendStatus(500)
    else res.sendStatus(200)
  });
}

exports.deleteTrip = function(req,res) {
  Trip.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      winston.error(err);
      res.sendStatus(500);
    } else {
      User.update({}, {$pull: { trips: {$in: [req.params.id]}}}, {multi: true}, function (err) {
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

exports.getMostRecentTrips = function(req,res) {
  Trip
    .find({}, { _id: 1, destination: 1 })
    .sort({ updated_at: -1})
    .limit(50)
    .exec(function(e,docs) {
      if (e) {
        winston.error(err)
        res.sendStatus(500)
      } else {
        res.json(docs);
      }
    })
};