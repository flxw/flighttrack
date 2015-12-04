'use strict';

var imageHandler = require('./imagehandler.js')

module.exports = function(app) {
  app
    .route('/img/:imageId')
    .get(imageHandler.getImage);
};