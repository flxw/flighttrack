(function() {
  'use strict';
  // ------------------------------------
  angular
    .module("myApp")
    .factory("ProfileService", profileService);

  profileService.$inject = ["$q", "$http", "$resource", "$stateParams"];

  function profileService($q, $http, $resource, $stateParams) {
    var s = {};

    var Trips = $resource('/user/:userId/trips');

    s.profiles = {};

    s.getTripsForUser = function(uid) {
      if (!(uid in s.profiles)) {
        s.profiles[uid] = { trips: [] }
        s.profiles[uid] = { trips: Trips.query({ userId: uid }) }
      }

      return s.profiles[uid].trips
    };

    s.getCurrentProfileTrips = function() {
      return s.getTripsForUser($stateParams.userId)
    };

    return s;
  };
  // ------------------------------------
})();