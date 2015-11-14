(function() {
'use strict';
// ------------------------------------

angular
  .module('myApp')
  .controller("BadCtrl", badCtrl);

badCtrl.$inject = ["tripService"];

function badCtrl(tripService) {
  var vm = this;

  vm.trips = tripService.trips;
  vm.selectTrip = tripService.selectTrip;
  vm.isTripSelected = tripService.isTripSelected;
};

// ------------------------------------
})();