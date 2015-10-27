(function() {
'use strict';
// ------------------------------------

angular
  .module('myApp')
  .controller("someController", someControllerFn);

someControllerFn.$inject = ['$scope', 'uiGmapGoogleMapApi'];

function someControllerFn($scope, uiGmapGoogleMapApi) {
  // Do stuff with your $scope.
  // Note: Some of the directives require at least something to be defined originally!
  // e.g. $scope.markers = []
  $scope.map = {
    center: {
      latitude: 30,
      longitude: 9
    },
    zoom: 2,
    options: {
      streetViewControl: false,
    }
  };

  $scope.line = {
    path: [
      { latitude:  50.036512, longitude: 8.558235},
      { latitude: -27.394051, longitude: 153.121133}
    ],
    geodesic: true,
    static: true,
    clickable: false
  }

  // uiGmapGoogleMapApi is a promise.
  // The "then" callback function provides the google.maps object.
  uiGmapGoogleMapApi.then(function(maps) {

  });
}

// ------------------------------------
})();