(function() {
'use strict';
// ------------------------------------

angular
  .module('myApp')
  .controller("ProfileCtrl", profileCtrl);

profileCtrl.$inject = ["ProfileService", "LoginService", "$state"];

function profileCtrl(ProfileService, LoginService, $state) {
  var vm = this;

  vm.canEdit = LoginService.canEdit;

  vm.addTrip                = ProfileService.addTrip;
  vm.deleteTrip             = ProfileService.deleteTrip;
  vm.getCurrentProfileTrips = ProfileService.getCurrentProfileTrips;
  vm.getCurrentProfile      = ProfileService.getCurrentProfile;
  vm.openTrip = function(tripId) { $state.go('trip', { tripId: tripId }) }
};

// ------------------------------------
})();