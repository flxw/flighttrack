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
    maxZoom: 13
  };
  vm.center = {
    latitude: 0,
    longitude: 0
  };
  vm.markerControl = {};
  vm.coordinates = [];
  vm.events = {
  };

  vm.handleMarkerClick = function(marker) {
    $state.go('trip', { tripId: marker.model._id })
  };

  // act accordingly to current state, to reduce some lag, since
  // the map component would otherwise be loaded multiple times
  $rootScope.$on('trips.updated', setCurrentMarkerCoordinates);
  $rootScope.$on('$stateChangeSuccess', function(event, toState) {
    switch(toState.name) {
      case 'landing':
      case 'profile':
      case 'trip':
      case 'trip.edit': setCurrentMarkerCoordinates(); break;
      default: break;
    }
  });

  function setCurrentMarkerCoordinates() {
    var coordinates;

    try {
      switch ($state.current.name) {
        case 'trip':
        case 'trip.edit':
          var t = TripService.getTrip($state.params.tripId)
          coordinates = [t]
          break;

        case 'profile':
          coordinates = ProfileService.getCurrentProfileTrips()
          break;

        case 'landing':
          coordinates = TripService.getMostRecentTrips()
          break;
      }
    } catch(e) {
      return
    }

    for (var i = 0; i < coordinates.length; ++i) {
      coordinates[i].icon = '/img/map-marker.png';

      // prevent map component from breaking while requests are pending
      if (!coordinates[i]._id || coordinates[i].$resolved === false) {
        coordinates[i]._id = i
      }
    }

    vm.coordinates = coordinates;
  };
}

// ------------------------------------
})();