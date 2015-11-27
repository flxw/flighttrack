(function() {
'use strict';
// ------------------------------------

angular
  .module('myApp')
  .controller("ProfileCtrl", profileCtrl);

profileCtrl.$inject = ["ProfileService", "$stateParams", "$state"];

function profileCtrl(ProfileService, $stateParams, $state) {
  var vm = this;

  vm.userId = $stateParams.userId;

  vm.getTrips = ProfileService.getTripsForUser
  vm.openTrip = function(tripId) { $state.go('trip', { profileId: $stateParams.userId, tripId: tripId }) }
};

// ------------------------------------
})();