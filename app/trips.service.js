(function() {
'use strict';
// ------------------------------------
angular
  .module("myApp")
  .factory("tripService", tripService);

tripService.$inject = ["$http"];

function tripService($http) {
  var s = {};
  var selectedTripIndex = null;
  var trips = [];

  s.coordinates = {};

  s.getTrips = function() {
    return s.trips;
  };

  s.updateCoordinateCallback = function() {};

  s.changeCurrentTrip = function(t) {
    s.trips[selectedTripIndex] = t;
  };

  s.selectTrip = function(index) {
    selectedTripIndex = index;
    recalculateCoordinates()
  };

  s.getCurrentTripCopy = function() {
    return _.cloneDeep(s.trips[selectedTripIndex])
  }

  s.getCurrentTripRef = function() {
    return s.trips[selectedTripIndex]
  }

  s.isTripSelected = function() {
    return selectedTripIndex !== null;
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
    if (selectedTripIndex !== null) {
      coordinateLoop = [s.trips[selectedTripIndex].destination.coordinates];
      coordinateLoop.concat(s.trips[selectedTripIndex].stops)
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
    if (selectedTripIndex !== null) {
      s.coordinates.center = s.trips[selectedTripIndex].destination.coordinates
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
}

// ------------------------------------
})();