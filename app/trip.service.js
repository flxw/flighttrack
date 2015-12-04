(function() {
'use strict';
// ------------------------------------
angular
  .module("myApp")
  .factory("TripService", tripService);

tripService.$inject = ["$q", "$resource", "$cacheFactory", "$rootScope"];

function tripService($q, $resource, $cacheFactory, $rootScope) {
  var s = {};
  var tripCache = $cacheFactory('Trips');
  var resourceOptions = {
    update: {
      method:'PUT'
    },
    get: {
      method: 'GET',
      cache: tripCache
    }
  };
  var Trip = $resource('/trip/:tripId', null, resourceOptions);

  s.trips = {};

  s.getTrip = function(tripId) {
    if (!(tripId in s.trips)) {
      s.trips[tripId] = { };
      s.trips[tripId] = Trip.get({ tripId: tripId });

      s.trips[tripId].$promise.then(function() {
        $rootScope.$emit('trips.updated')
      });
    }

    return s.trips[tripId];
  };

  s.saveTrip = function(trip) {
    if (trip._id) {
      s.trips[trip._id] = _.cloneDeep(trip);
      Trip.update({ tripId: trip._id }, trip);
      $rootScope.$emit('trips.updated')
    }
  };

  s.updateImages = function(tripId, images) {
    s.trips[tripId].images = images;
  };

  s.updateCallback = function() {};

  return s;
}

// ------------------------------------
})();