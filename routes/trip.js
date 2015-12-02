'use strict';

var tripHandler = require('./triphandler.js');
var multer = require('multer');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

module.exports = function(app) {
  // TODO: watch out for route protection when deleting
  app
    .route('/trip/img/:id')
    .get(tripHandler.getImage)
    .delete(tripHandler.deleteImage)

  app
    .route('/trip/img')
    .post(upload.single('image'), tripHandler.postTripImage)

  app
    .route('/trip/:id')
    .get(tripHandler.getTrip)
    .put(tripHandler.updateTrip)
    .post(tripHandler.postTrip)
};