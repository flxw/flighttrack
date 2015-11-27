(function() {
'use strict';
// ------------------------------------

angular
  .module('myApp')
  .controller("TripController", tripController);

tripController.$inject = ["ProfileService", "$stateParams", "$state"];

function tripController(ProfileService, $stateParams, $state) {
  var vm = this;

  vm.userId = $stateParams.userId;

  vm.getTrips = ProfileService.getTripsForUser
  vm.openTrip = function(tripId) { $state.go('trip', { profileId: $stateParams.userId, tripId: tripId }) }
};

// ------------------------------------
})();