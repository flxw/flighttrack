(function() {
'use strict';
// ------------------------------------
angular
  .module("myApp")
  .factory("TripService", tripService);

tripService.$inject = ["$q", "$resource"];

function tripService($q, $resource) {
  var s = {};
  var Trip = $resource('/trip/:tripId', null, { 'update': { method:'PUT' }});

  s.trips = {};

  s.getTrip = function(tripId) {
    /*if (!(tripId in s.trips)) {
      s.trips[tripId] = { };
      s.trips[tripId] = Trip.get({ tripId: tripId });
    }*/

    return Trip.get({ tripId: tripId });
  };

  s.saveTrip = function(trip) {
    if (trip._id) {
      return Trip.update({ tripId: trip._id }, trip);
    }
  };

  return s;
}

// ------------------------------------
})();