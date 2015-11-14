(function() {
'use strict';
// ------------------------------------
angular
  .module("myApp")
  .factory("tripService", tripService)

function tripService() {
  var s = {};
  var selectedTripIndex = null;

  s.trips = [
    {
      destination: { name: 'Sydney', coordinates: { latitude: 25.253834, longitude: 55.364814 } },
      startDate: new Date(2016, 2, 14),
      endDate: new Date(2016, 2, 15),
      stops: []
    },
    {
      destination: { name: 'Melbourne', coordinates: { latitude: -37.8589546, longitude: 144.5191752 } },
      startDate: new Date(2015, 10, 14),
      endDate: new Date(2015, 10, 15),
      stops: []
    },
    {
      destination: { name: 'Brisbane', coordinates: { latitude: -27.4790396, longitude: 152.4423969 } },
      startDate: new Date(2015, 10, 14),
      endDate: new Date(2015, 10, 16),
      stops: []
    }
  ];

  s.coordinates = {};

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

  recalculateCoordinates()

  return s;
}

// ------------------------------------
})();