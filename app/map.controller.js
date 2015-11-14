(function() {
  'use strict';
// ------------------------------------

  angular
    .module('myApp')
    .controller("MapController", MapController);

  MapController.$inject = ["$scope", "tripService", "uiGmapGoogleMapApi"];

function MapController($scope, tripService, gmapApi) {
  var vm = this;

  vm.options = {
    disableDefaultUI: true
  };
  vm.zoom = 7;
  vm.pan = true;
  $scope.boundaries = tripService.coordinateBoundaries;
  vm.center = { latitude: 0, longitude: 0 };
  vm.control = {};

  $scope.$watch('boundaries', function() {
    gmapApi.then(function(maps) {
      var northEast = new google.maps.LatLng($scope.boundaries.northeast.latitude, $scope.boundaries.northeast.longitude);
      var southWest = new google.maps.LatLng($scope.boundaries.southwest.latitude, $scope.boundaries.southwest.longitude);
      var bounds = new google.maps.LatLngBounds(southWest,northEast);
      vm.control.getGMap().fitBounds(bounds);
    });
  })
};

// ------------------------------------
})();