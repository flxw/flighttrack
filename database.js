'use strict';

var config = require('./config.js');
var q = require('q');
var winston    = require('winston');

var User  = require('./models/user.js');
var Trip  = require('./models/trip.js');
var Image = require('./models/image.js');

exports.getTripsForUser = function(uid) {
  var deferred = q.defer()

  // TODO trips need to know about their travellers
  User
    .findById(uid)
    //.populate('trips')
    .exec(function(e,u) {
      deferred.resolve(u._doc.trips)
    });

  return deferred.promise
};

exports.addTripImage = function(tripId, image) {
  var deferred = q.defer();
  var img      = new Image(image);

  // save image to db
  img.save(image, function(err, savedImg) {

    // append image id to trip afterwards
    Trip.findByIdAndUpdate(tripId, { $push: { images: savedImg._id }}, function (err) {
      if (err) {
        winston.error(err);
        deferred.reject(err)
      } else {
        deferred.resolve({
          _id: savedImg._id,
          originalname: savedImg.originalname
        })
      }
    });
  });

  return deferred.promise
};

exports.getTripImage = function(imageId) {
  Image.findById(imageId, function(err, img) {
    if (err || !img) {
      winston.error(err);
      deferred.reject(err)
    } else {
      deferred.resolve(img._doc.buffer)
    }
  });
};

exports.deleteTripImage = function(imageId) {
  var deferred = q.defer();

  Image.findByIdAndRemove(imageId, function(err) {
    if (err) {
      winston.error(err);
      deferred.reject(err)
    } else {
      Trip.update({}, {$pull: {images: {$in: [imageId]}}}, {multi: true}, function (err) {
        if (err) {
          winston.error(err);
          deferred.reject(err)
        } else {
          deferred.resolve()
        }
      })
    }
  });

  return deferred.promise
};