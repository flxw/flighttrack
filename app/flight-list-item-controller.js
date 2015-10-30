angular
  .module('myApp')
  .controller('flightListItemCtrl', flightListItemCtrl);

//flightListItemCtrl.$inject = []

function flightListItemCtrl() {
  var vm = this;

  vm.isEditing = true;

  vm.originAirport = ''
  vm.destinationAirport = ''
  vm.airports = [ "Kuala Lumpur (KLX)", "Frankfurt am Main (FRA)" ];
  vm.departureTime = ''
  vm.arrivalTime = ''

  vm.startEdit = function(e) { vm.isEditing = true };
}