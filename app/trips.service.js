(function() {
'use strict';
// ------------------------------------
angular
  .module("myApp")
  .factory("tripService", tripService)

function tripService() {
  var s = {};

  s.trips = [
    {
      destination: { name: 'Dubai', coordinates: { latitude: 25.253834, longitude: 55.364814 } },
      startDate: new Date(2015, 7, 14),
      endDate: new Date(2015, 7, 15),
      stops: []
    }
  ];

  s.changeTrip = function(i, t) { s.trips[i] = t };

  return s;
}
})();