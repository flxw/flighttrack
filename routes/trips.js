'use strict';

var tripHandler = require('./triphandler.js')

module.exports = function(app) {
  app
    .route('/trips')
    .get(tripHandler.getTrips);
};