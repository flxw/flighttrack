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
  vm.goBack = function() { $state.go('profile') };
  vm.goEdit = function() { $state.go('profile.trip.edit') };

  vm.delete = function() {
    TripService
      .deleteTrip($state.params.tripId)
      .then(vm.goBack)
  }

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