'use strict';

var tripHandler = require('./triphandler.js');
var multer      = require('multer');

var storage     = multer.memoryStorage();
var upload      = multer({ storage: storage });

module.exports = function(app) {
  // TODO: watch out for route protection when deleting
  app
    .route('/trip/:tripId/img/:imageId')
    .delete(tripHandler.deleteImage);

  app
    .route('/trip/:tripId/img')
    .post(upload.single('image'), tripHandler.postTripImage)

  app
    .route('/trip/:id')
    .get(tripHandler.getTrip)
    .put(isLoggedIn, tripHandler.updateTrip)
    .delete(isLoggedIn, tripHandler.deleteTrip)

  app
    .route('/trip')
    .post(isLoggedIn, tripHandler.postTrip);
};

function isLoggedIn(req,res,next) {
  if (req.isAuthenticated()) return next();
  else res.sendStatus(401);
};