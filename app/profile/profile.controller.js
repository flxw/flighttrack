(function() {
'use strict';
// ------------------------------------

angular
  .module('myApp')
  .controller("BadCtrl", badCtrl);

badCtrl.$inject = ["tripService"];

function badCtrl(tripService) {
  var vm = this;
  vm.getTrips = tripService.getTrips;
  vm.selectTrip = tripService.selectTrip;
  vm.isTripSelected = tripService.isTripSelected;
};

// ------------------------------------
})();