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

flightListItemCtrl.$inject = ["$scope", "$timeout", "$q", "airports"];

function flightListItemCtrl($scope, $timeout, $q, airports) {
  var vm = this;

  vm.isEditing = $scope.flight.isNew || false;
  vm.origin = $scope.flight.origin;
  vm.destination = $scope.flight.destination;
  vm.airports = airports;
  vm.departureTimestamp = $scope.flight.departureTimestamp;
  vm.arrivalTimestamp = $scope.flight.arrivalTimestamp;
  vm.airline = $scope.flight.airline;

  vm.destinationSearchText = "";
  vm.originSearchText = "";

  vm.startEdit   = function() { $timeout(function() { vm.isEditing = true }, 150) };
  vm.outboundRemove = function() { $timeout(function() { vm.removeItem() }, 150) };

  vm.saveChanges = saveChanges;
  vm.searchAirport = searchAirport;

  function getAirportCoordinates(code) {
    var port = airports.find(function(e,i,a) {
      return e.code == code
    });

    return port.coordinates;
  };

  function saveChanges() {
    $timeout(function() { // for ripple completion
      delete $scope.flight.isNew;
      vm.isEditing = $scope.isEditing = false;

      // just get the airport code here
      $scope.flight.origin = vm.origin;
      $scope.flight.destination = vm.destination;

      $scope.flight.departureTimestamp = vm.departureTimestamp;
      $scope.flight.arrivalTimestamp = vm.arrivalTimestamp;

      $scope.flight.airline = vm.airline
    }, 150)
  };

  function searchAirport(searchString) {
    var deferred = $q.defer()

    $timeout(function() {
      var results = searchString ? airports.filter( createFilterFor(searchString) ) : airports;
      deferred.resolve(results);
    }, 200);

    return deferred.promise
  };

  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(airport) {
      return (angular.lowercase(airport.city).indexOf(lowercaseQuery) === 0);
    };
  };
}
})()