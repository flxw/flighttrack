(function() {
'use strict';
// ------------------------------------

angular
  .module('myApp')
  .controller("TripController", tripController);

  tripController.$inject = ["TripService", "LoginService", "$state", "$mdDialog"];

function tripController(TripService, LoginService, $state, $mdDialog) {
  var vm = this;

  vm.trip = TripService.getTrip($state.params.tripId);

  vm.canEdit = LoginService.canEdit;
  vm.goEdit = function() { $state.go('trip.edit') };

  vm.showImage = function(img) {
    var templateString = ''

    templateString += '<md-dialog aria-label="' + img.alt + '">';
    templateString += '<img src="' + img.src + '">';
    templateString += '</md-dialog>';

    $mdDialog.show({
      template : templateString,
      parent: angular.element(document.body),
      clickOutsideToClose: true
    })

  }
}

// ------------------------------------
})();