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
  var recentTripCache = $cacheFactory('RecentTrips');

  var actions = {
    update: {
      method:'PUT'
    },
    get: {
      method: 'GET',
      cache: tripCache
    }
  };
  var Trip = $resource('/trip/:tripId', null, actions);

  var recentTripsActions = {
    get: {
      method: 'GET',
      cache: recentTripCache,
      isArray: true
    }
  };
  var RecentTrips = $resource('/trips/recent', null, recentTripsActions);
  var recentTrips = null;

  s.trips = {};

  s.getTrip = function(tripId) {
    if (!(tripId in s.trips)) {
      s.trips[tripId] = { };
      s.trips[tripId] = Trip.get({ tripId: tripId });

      s.trips[tripId]
        .$promise
        .then(function() {
          $rootScope.$emit('trips.updated')
        });
    }

    return s.trips[tripId];
  };

  s.saveTrip = function(trip) {
    s.trips[trip._id] = _.cloneDeep(trip);
    Trip.update({ tripId: trip._id }, trip);
    $rootScope.$emit('trips.updated')
  };

  s.createTrip = function() {
    return Trip.save({ tripId: '' }, {}).$promise;
  };

  s.deleteTrip = function(tripId) {
    var deferred = $q.defer()

    Trip
      .delete({ tripId: tripId })
      .$promise
      .then(function() {
        delete s.trips[tripId];
        deferred.resolve()
      })

    return deferred.promise
  }

  s.updateImages = function(tripId, images) {
    s.trips[tripId].images = images;
  };

  s.updateCallback = function() {};

  s.getMostRecentTrips = function() {
    if (recentTrips === null) {
      recentTrips = RecentTrips.get();

      recentTrips
        .$promise
        .then(function () {
          $rootScope.$emit('trips.updated')
        });
    }

    return recentTrips;
  };

  return s;
}

// ------------------------------------
})();