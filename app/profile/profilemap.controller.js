(function() {
  'use strict';
// ------------------------------------

  angular
    .module('myApp')
    .controller("ProfileMapController", MapController);

  MapController.$inject = ["uiGmapGoogleMapApi", "ProfileService"];

function MapController(gmapApi, profileService) {
  var vm = this;

  vm.options = {
    disableDefaultUI: true,
    minZoom: 2
  };
  vm.zoom = 3;
  vm.pan = true;
  vm.control = {};
  vm.center = { latitude: 0, longitude: 0 };
  vm.getTrips = profileService.getCurrentProfileTrips;

  vm.calculateBounds = function() {
    var coordinateLoop = _.map(profileService.getCurrentProfileTrips(), 'destination.coordinates')

    if (coordinateLoop.length < 2) return;

    var latitudes  = _.map(coordinateLoop, 'latitude');
    var longitudes = _.map(coordinateLoop, 'longitude');

    // reset boundary
    return {
      northeast: {
        latitude:  _.max(latitudes),
        longitude: _.max(longitudes)
      },
      southwest: {
        latitude:  _.min(latitudes),
        longitude: _.min(longitudes)
      }
    };
  };
}

// ------------------------------------
})();