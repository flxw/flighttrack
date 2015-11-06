(function() {
'use strict';
// ------------------------------------

angular
  .module('myApp')
  .controller("someCtrl", someControllerFn);

//someControllerFn.$inject = ['$scope'];

function someControllerFn() {
  var vm = this;

  vm.map = {
    center: {
      latitude: 5,
      longitude: 80
    },
    zoom: 2,
    options: {
      disableDefaultUI: true
    }
  };

  vm.flights = [
    {
      origin: { code: 'FRA', city: 'Frankfurt', coordinates: { latitude:  50.036512, longitude: 8.558235 } },
      destination: { code:'DXB', city: 'Dubai', coordinates: { latitude: 25.253834, longitude: 55.364814 } },
      departureTimestamp: new Date(2015, 7, 14),
      arrivalTimestamp: new Date(2015, 7, 15),
      airline: 'Emirates'
    },
    {
      origin: { code:'DXB', city: 'Dubai', coordinates: { latitude: 25.253834, longitude: 55.364814 } },
      destination: { code: 'BNE', city: 'Brisbane', coordinates: { latitude: -27.394051, longitude: 153.121133 } },
      departureTimestamp: new Date(2015, 7, 15),
      arrivalTimestamp: new Date(2015, 7, 16),
      airline: 'Emirates'
    },
    {
      origin: { code: 'BNE', city: 'Brisbane', coordinates: { latitude: -27.394051, longitude: 153.121133 } },
      destination: { code:'SYD', city: 'Sydney', coordinates: { latitude: -33.9399228, longitude: 151.1730877 } },
      departureTimestamp: new Date(2015, 9, 17),
      arrivalTimestamp: new Date(2015, 9, 17),
      airline: 'Tigerair'
    },
    {
      origin: { code: 'BNE', city: 'Brisbane', coordinates: { latitude: -27.394051, longitude: 153.121133 } },
      destination: { code:'CNS', city: 'Cairns', coordinates: { latitude: -16.885833, longitude: 145.755278 } },
      departureTimestamp: new Date(2015, 10, 6),
      arrivalTimestamp: new Date(2015, 10, 6),
      airline: 'Virgin Air'
    }
  ];

  // add flight here
  // at top of the list
  vm.addFlight = addFlight;
  vm.removeFlight = removeFlight;

  function addFlight() {
    var nf = {
      isNew: true,
      origin: { code: '', city: '', coordinates: { latitude:  0, longitude: 0 } },
      destination: { code:'', city: '', coordinates: { latitude: 0, longitude: 0 } },
      departureTimestamp: new Date('2015','01','01'),
      arrivalTimestamp: new Date('2015','01','01'),
      airline: ''
    }

    vm.flights.unshift(nf)
  }

  function removeFlight(idx) {
    vm.flights.splice(idx, 1)
  }
}

// ------------------------------------
})();