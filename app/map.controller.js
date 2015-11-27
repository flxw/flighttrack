(function() {
  'use strict';
// ------------------------------------

  angular
    .module('myApp')
    .controller("MapController", MapController);

  MapController.$inject = ["uiGmapGoogleMapApi", "ProfileService"];

function MapController(gmapApi, profileService) {
  var vm = this;

  vm.cachedBounds = null;
  vm.options = {
    disableDefaultUI: true,
    minZoom: 2
  };
  vm.zoom = 3;
  vm.pan = true;
  vm.control = {};
  vm.center = { latitude: 0, longitude: 0 };
  vm.getTrips = profileService.getCurrentProfileTrips;

  // does only update the bounds when returning an object constructor
  // sadly this leads to digest infinite loop?!
  vm.calculateBounds = function() {
    if (vm.cachedBounds != null) {
      return vm.cachedBounds;
    }

    var coordinateLoop = _.map(profileService.getCurrentProfileTrips(), 'destination.coordinates')

    if (coordinateLoop.length < 2) return;

    var latitudes  = _.map(coordinateLoop, 'latitude');
    var longitudes = _.map(coordinateLoop, 'longitude');

    var b= {
      northeast: {
        latitude:  _.max(latitudes),
        longitude: _.max(longitudes)
      },
      southwest: {
        latitude:  _.min(latitudes),
        longitude: _.min(longitudes)
      }
    };

    vm.cachedBounds = _.cloneDeep(b);

    return vm.cachedBounds;
  };

  // make map controller global to avoid reloading of the heavy DOM element
  // make it distinguish between trip view mode and the normal mode by selecting
  // the stateParams.tripId
}

// ------------------------------------
})();