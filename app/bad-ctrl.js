(function() {
'use strict';
// ------------------------------------

angular
  .module('myApp')
  .controller("BadCtrl", badCtrl);

badCtrl.$inject = ["tripService"];

function badCtrl(tripService) {
  var vm = this;

  vm.map = {
    center: {
      latitude: 5,
      longitude: 80
    },
    zoom: 3,
    options: {
      disableDefaultUI: true
    }
  };

  vm.trips = tripService.trips;

  vm.selectedTripIndex = null;

  vm.selectTrip = function(index) {
    vm.selectedTripIndex = index;
    vm.map.center = vm.trips[vm.selectedTripIndex].destination.coordinates
    vm.map.zoom = 9
  }
};

// ------------------------------------
})();