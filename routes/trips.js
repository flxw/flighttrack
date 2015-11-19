'use strict';

var tripHandler = require('./triphandler.js');
var multer = require('multer');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

module.exports = function(app) {
  app
    .route('/trips')
    .get(tripHandler.getTrips);

  app
    .route('/trips/img')
    .get
    .post(upload.single('image'), tripHandler.postTripImage)
};