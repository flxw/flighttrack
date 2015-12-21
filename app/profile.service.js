(function() {
  'use strict';
  // ------------------------------------
  angular
    .module("myApp")
    .factory("ProfileService", profileService);

  profileService.$inject = ["$resource", "$state", "TripService"];

  function profileService($resource, $state, TripService) {
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
      return s.getTripsForUser($state.params.userId)
    };

    s.getCurrentProfile = function() {
      return s.profiles[$state.params.userId]
    };

    s.addTrip = function() {
      TripService
        .createTrip()
        .then(function(newTrip) {
          var uid = $state.params.userId;

          s.profiles[uid].trips.push(newTrip._id);
          $state.go('profile.trip', { tripId: newTrip._id });
        })
    };

    s.deleteTrip = function(id) {
      TripService
        .deleteTrip(id)
        .then(function() {
          function comparer(tripId) { return tripId === id }
          _.remove(s.profiles[$state.params.userId].trips, comparer)
        })
    }

    return s;
  };
  // ------------------------------------
})();