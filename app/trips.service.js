(function() {
'use strict';
// ------------------------------------
angular
  .module("myApp")
  .factory("tripService", tripService);

tripService.$inject = ["$q", "$http"];

function tripService($q, $http) {
  var s = {};
  var selectedTripId = null;
  var currentProfileId = null;

  s.trips = {};
  s.coordinates = {};

  s.getTripsForUser = function(uid) {
    var deferred = $q.defer()

    if (ui in s.trips)

    return deferred.promise
  } };

  /*

  s.updateCoordinateCallback = function() {};

  s.changeCurrentTrip = function(t) {
    return $http.post('/trip', t)
            .then(function() { s.trips[selectedTripId] = t })
            .catch(function() {});
  };

  s.selectTrip = function(index) {
    selectedTripId = index;
    recalculateCoordinates()
  };

  s.getCurrentTripCopy = function() {
    return _.cloneDeep(s.trips[selectedTripId])
  }

  s.getCurrentTripRef = function() {
    return s.trips[selectedTripId]
  }

  s.isTripSelected = function() {
    return selectedTripId !== null;
  }

  s.loadTrips = function() {
    $http.get('/trips', { reponseType: 'json' })
      .then(function(res) {
        s.trips = res.data;

        for (var i = 0, j = res.data.length; i < j; ++i) {
          s.trips[i].dates.start = new Date(s.trips[i].dates.start)
          s.trips[i].dates.end = new Date(s.trips[i].dates.end)
        }

        recalculateCoordinates();
      })
  };

  function recalculateBounds() {
    var coordinateLoop = [];

    // collect the coordinates that should be included in the boundary
    if (selectedTripId !== null) {
      coordinateLoop = [s.trips[selectedTripId].destination.coordinates];
      coordinateLoop.concat(s.trips[selectedTripId].stops)
    } else {
      coordinateLoop = _.map(s.trips, 'destination.coordinates')
    }

    if (coordinateLoop.length < 2) return;

    var latitudes  = _.map(coordinateLoop, 'latitude');
    var longitudes = _.map(coordinateLoop, 'longitude');

    // reset boundary
    s.coordinates.boundaries = {
      northeast: {
        latitude: _.max(latitudes),
        longitude: _.max(longitudes)
      },
      southwest: {
        latitude: _.min(latitudes),
        longitude: _.min(longitudes)
      }
    };
  }

  function recalculateCenter() {
    if (selectedTripId !== null) {
      s.coordinates.center = s.trips[selectedTripId].destination.coordinates
    } else {
      s.coordinates.center = { latitude: 0, longitude: 0 }
    }
  }

  function recalculateCoordinates() {
    recalculateBounds();
    recalculateCenter();
    s.updateCoordinateCallback();
  }

  s.loadTrips();

  return s;
}*/

// ------------------------------------
})();