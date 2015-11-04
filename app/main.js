(function() {
'use strict';
// ------------------------------------

angular
  .module('myApp')
  .controller("someCtrl", someControllerFn);

someControllerFn.$inject = ['$scope', 'uiGmapGoogleMapApi', '$mdDialog'];

function someControllerFn($scope, uiGmapGoogleMapApi, $mdDialog) {
  $scope.map = {
    center: {
      latitude: 30,
      longitude: 9
    },
    zoom: 5,
    options: {
      disableDefaultUI: true
    }
  };

  $scope.flights = [
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
}

// ------------------------------------
})();