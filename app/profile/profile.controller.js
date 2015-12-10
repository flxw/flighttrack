(function() {
'use strict';
// ------------------------------------

angular
  .module('myApp')
  .controller("ProfileCtrl", profileCtrl);

profileCtrl.$inject = ["ProfileService", "LoginService", "$state"];

function profileCtrl(ProfileService, LoginService, $state) {
  var vm = this;

  vm.canBeEdited = function() {
    var b = false;
    try {
      b = LoginService.isLoggedIn && $state.params.userId === LoginService.currentUser._id;
    } finally {
      return b;
    }
  };

  vm.addTrip                = ProfileService.addTrip;
  vm.getCurrentProfileTrips = ProfileService.getCurrentProfileTrips;
  vm.getCurrentProfile      = ProfileService.getCurrentProfile;
  vm.openTrip = function(tripId) { $state.go('profile.trip', { userId: $state.params.userId, tripId: tripId }) }
};

// ------------------------------------
})();