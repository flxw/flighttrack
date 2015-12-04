(function() {
'use strict';
// ------------------------------------

angular
  .module('myApp')
  .controller("ProfileCtrl", profileCtrl);

profileCtrl.$inject = ["ProfileService", "$state"];

function profileCtrl(ProfileService, $state) {
  var vm = this;

  vm.getCurrentProfileTrips = ProfileService.getCurrentProfileTrips;
  vm.getCurrentProfile      = ProfileService.getCurrentProfile;
  vm.openTrip = function(tripId) { $state.go('profile.trip', { userId: $state.params.userId, tripId: tripId }) }
};

// ------------------------------------
})();