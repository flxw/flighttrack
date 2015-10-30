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

function flightListItemCtrl($scope) {
  var vm = this;

  vm.isEditing = false;
  vm.origin = $scope.flight.origin
  vm.destination = $scope.flight.destination
  vm.airline = $scope.flight.airline
  vm.airports = [
    { name: "Kuala Lumpur", code: "KLX" },
    { name: "Frankfurt am Main", code: "FRA" }
  ]
  vm.departureTime = ''
  vm.arrivalTime = ''

  vm.startEdit   = function() { vm.isEditing = true };
  vm.saveChanges = function() { vm.isEditing = false };
}
})()