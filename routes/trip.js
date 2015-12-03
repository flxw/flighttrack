'use strict';

var tripHandler = require('./triphandler.js');
var multer      = require('multer');

var storage     = multer.memoryStorage();
var upload      = multer({ storage: storage });

module.exports = function(app) {
  // TODO: watch out for route protection when deleting
  app
    .route('/trip/img/:imageId')
    .get(tripHandler.getImage);

  app
    .route('/trip/:tripId/img/:imageId')
    .delete(tripHandler.deleteImage);

  app
    .route('/trip/:tripId/img')
    .post(upload.single('image'), tripHandler.postTripImage)

  app
    .route('/trip/:id')
    .get(tripHandler.getTrip)
    .put(tripHandler.updateTrip)
    .post(tripHandler.postTrip);
};