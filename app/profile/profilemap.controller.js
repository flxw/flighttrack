(function() {
  'use strict';
// ------------------------------------

  angular
    .module('myApp')
    .controller("MapController", MapController);

  MapController.$inject = ["tripService", "uiGmapGoogleMapApi"];

function MapController(tripService, gmapApi) {
  var vm = this;

  vm.options = {
    disableDefaultUI: true,
    minZoom: 3
  };
  vm.zoom = 3;
  vm.pan = true;
  vm.control = {};
  vm.center = { latitude: 0, longitude: 0 };
  vm.getTrips = tripService.getTrips;

  tripService.updateCoordinateCallback = updateCoordinateView;

  function updateCoordinateView() {
    gmapApi.then(function() {
      var northEast = new google.maps.LatLng(tripService.coordinates.boundaries.northeast.latitude, tripService.coordinates.boundaries.northeast.longitude);
      var southWest = new google.maps.LatLng(tripService.coordinates.boundaries.southwest.latitude, tripService.coordinates.boundaries.southwest.longitude);
      var bounds    = new google.maps.LatLngBounds(southWest,northEast);

      vm.control.getGMap().fitBounds(bounds);

      if (tripService.isTripSelected()) {
        var center = new google.maps.LatLng(tripService.coordinates.center.latitude, tripService.coordinates.center.longitude);
        vm.zoom = 10;
        vm.control.getGMap().panTo(center);
      }
    });
  };
}

// ------------------------------------
})();