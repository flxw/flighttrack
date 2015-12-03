(function() {
  'use strict';
// ------------------------------------

angular
  .module('myApp')
  .controller("MapController", MapController);

MapController.$inject = ["ProfileService", "TripService", "$state", "$rootScope"];

function MapController(ProfileService, TripService, $state, $rootScope) {
  var vm = this;

  vm.cachedBounds = null;
  vm.zoom = 3;
  vm.pan = true;
  vm.control = {};
  vm.options = {
    disableDefaultUI: true,
    minZoom: 2,
    maxZoom: 12
  };
  vm.center = {
    latitude: 0,
    longitude: 0
  };
  vm.markerControl = {};
  vm.coordinates = [];

  $rootScope.$on('trips.updated', setCurrentMarkerCoordinates);
  $rootScope.$on('$stateChangeSuccess', function(event, toState) {
    switch(toState.name) {
      case 'profile':
      case 'profile.trip': setCurrentMarkerCoordinates(); break;
      default: break;
    }
  });

  function setCurrentMarkerCoordinates() {
    var coordinates;

    try {
      if ($state.params.tripId) {
        var t = TripService.getTrip($state.params.tripId)
        coordinates = [t.destination.coordinates]
      } else {
        coordinates = _.map(ProfileService.getCurrentProfileTrips(), 'destination.coordinates')
      }
    } catch(e) {
      return
    }

    for (var i = 0; i < coordinates.length; ++i) {
      if (coordinates[i] === undefined) continue;
      coordinates[i].id = i;
    }

    vm.coordinates = coordinates
  };

  // make map controller global to avoid reloading of the heavy DOM element
  // make it distinguish between trip view mode and the normal mode by selecting
  // the stateParams.tripId
  // controllerProvider does not work unfortunately...
}

// ------------------------------------
})();