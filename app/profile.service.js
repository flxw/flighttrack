(function() {
  'use strict';
  // ------------------------------------
  angular
    .module("myApp")
    .factory("ProfileService", profileService);

  profileService.$inject = ["$q", "$http", "$resource", "$stateParams", "TripService"];

  function profileService($q, $http, $resource, $stateParams, TripService) {
    var s = {};

    var User = $resource('/user/:userId');

    s.profiles = {};

    s.getTripsForUser = function(uid) {
      if (!(uid in s.profiles)) {
        s.profiles[uid] = User.get({ userId: uid })
      }

      var tripIds = s.profiles[uid].trips || [];
      var trips = []

      for (var i = 0; i < tripIds.length; ++i) {
        trips.push(TripService.getTrip(tripIds[i]));
      }

      return trips
    };

    s.getCurrentProfileTrips = function() {
      return s.getTripsForUser($stateParams.userId)
    };

    s.getCurrentProfile = function() {
      return s.profiles[$stateParams.userId]
    };

    return s;
  };
  // ------------------------------------
})();