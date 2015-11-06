(function() {
'use strict';
angular
  .module('myApp')
  .controller("flightListItemCtrl", flightListItemCtrl)
  .directive("flightListItem", flightListItemDirective)

function flightListItemDirective() {
  return {
    bindToController: {
      flight: "=",
      removeItem: "&"
    },
    scope: true,
    controller: flightListItemCtrl,
    controllerAs: "ctrl",
    templateUrl: "components/flight-list-item.template.html"
  }
}

flightListItemCtrl.$inject = ["$scope", "$timeout", "airports"];

function flightListItemCtrl($scope, $timeout, airports) {
  var vm = this;

  vm.isEditing = $scope.flight.isNew || false;
  vm.origin = $scope.flight.origin.city + " (" + $scope.flight.origin.code + ")";
  vm.destination = $scope.flight.destination.city + " (" + $scope.flight.destination.code + ")";
  vm.airports = airports;
  vm.departureTimestamp = $scope.flight.departureTimestamp;
  vm.arrivalTimestamp = $scope.flight.arrivalTimestamp;
  vm.airline = $scope.flight.airline;

  vm.startEdit   = function() {
    $timeout(function() { // for ripple completion
      vm.isEditing = true
    }, 150)
  };

  vm.saveChanges = function() {
    $timeout(function() { // for ripple completion
      delete $scope.flight.isNew;
      vm.isEditing = $scope.isEditing = false;

      // just get the airport code here
      $scope.flight.origin.city = vm.origin.substring(0, vm.origin.length-6) // remove outer braces
      $scope.flight.origin.code = vm.origin.substring(vm.origin.length-4, vm.origin.length-1)
      $scope.flight.origin.coordinates = getAirportCoordinates($scope.flight.origin.code)

      $scope.flight.destination.city = vm.destination.substring(0, vm.destination.length-6) // remove outer braces
      $scope.flight.destination.code = vm.destination.substring(vm.destination.length-4, vm.destination.length-1)
      $scope.flight.destination.coordinates = getAirportCoordinates($scope.flight.destination.code)

      $scope.flight.departureTimestamp = vm.departureTimestamp;
      $scope.flight.arrivalTimestamp = vm.arrivalTimestamp;

      $scope.flight.airline = vm.airline
    }, 150)
  };

  vm.outboundRemove = function() { // for ripple completion
    $timeout(function() {
      vm.removeItem()
    }, 150)
  };

  function getAirportCoordinates(code) {
    var port = airports.find(function(e,i,a) {
      return e.code == code
    });

    return port.coordinates;
  };
}
})()