(function() {
'use strict';
angular
  .module('myApp')
  .controller("flightListItemCtrl", flightListItemCtrl)
  .directive("flightListItem", flightListItemDirective)

function flightListItemDirective() {
  return {
    bindToController: {
      flight: "="
    },
    scope: true,
    controller: flightListItemCtrl,
    controllerAs: "ctrl",
    templateUrl: "components/flight-list-item.template.html"
  }
}

flightListItemCtrl.$inject = ["$scope", "airports"];

function flightListItemCtrl($scope, airports) {
  var vm = this;

  vm.isEditing = false;
  vm.origin = $scope.flight.origin.city + " (" + $scope.flight.origin.code + ")";
  vm.destination = $scope.flight.destination.city + " (" + $scope.flight.destination.code + ")";
  vm.airports = airports;
  vm.departureTimestamp = $scope.flight.departureTimestamp;
  vm.arrivalTimestamp = $scope.flight.arrivalTimestamp;
  vm.airline = $scope.flight.airline;

  vm.startEdit   = function() { vm.isEditing = true };
  vm.saveChanges = function() {
    vm.isEditing = false;

    // just get the airport code here
    $scope.flight.origin.city = vm.origin.substring(0, vm.origin.length-6) // remove outer braces
    $scope.flight.origin.code = vm.origin.substring(vm.origin.length-4, vm.origin.length-1) // remove outer braces

    $scope.flight.destination.city = vm.destination.substring(0, vm.destination.length-6) // remove outer braces
    $scope.flight.destination.code = vm.destination.substring(vm.destination.length-4, vm.destination.length-1) // remove outer braces

    $scope.flight.departureTimestamp = vm.departureTimestamp;
    $scope.flight.arrivalTimestamp = vm.arrivalTimestamp;

    $scope.flight.airline = vm.airline
  };
}
})()