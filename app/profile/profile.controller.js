(function() {
'use strict';
// ------------------------------------

angular
  .module('myApp')
  .controller("ProfileCtrl", profileCtrl);

profileCtrl.$inject = ["ProfileService", "$stateParams", "$state"];

function profileCtrl(ProfileService, $stateParams, $state) {
  var vm = this;

  vm.getCurrentProfileTrips = ProfileService.getCurrentProfileTrips;
  vm.openTrip = function(tripId) { $state.go('profile.trip', { userId: $stateParams.userId, tripId: tripId }) }
};

// ------------------------------------
})();