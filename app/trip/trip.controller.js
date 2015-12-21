(function() {
'use strict';
// ------------------------------------

angular
  .module('myApp')
  .controller("TripController", tripController);

  tripController.$inject = ["TripService", "PlacesService", "Upload", "LoginService", "$http", "$state", "$mdDialog"];

function tripController(TripService,  PlacesService, Upload, LoginService, $http, $state, $mdDialog) {
  var vm = this;

  vm.isEditing = false;
  vm.upload  = { hidden: true, progress: 0, image: '' };
  vm.destinationSearch = { text: '', query: PlacesService.searchPlace };

  vm.trip = TripService.getTrip($state.params.tripId);

  vm.canEdit = LoginService.canEdit;
  vm.goBack = function () { $state.go('profile', { userId: $state.params.userId }) }

  vm.edit = function () {
    vm.trip = _.cloneDeep(vm.trip);

    vm.trip.dates.start = new Date(vm.trip.dates.start)
    vm.trip.dates.end = new Date(vm.trip.dates.end)

    vm.isEditing = true;
  }

  vm.saveChanges = function () {
    vm.isEditing = false;
    TripService.saveTrip(vm.trip)
  };

  vm.cancelChanges = function () {
    var modifiedImages = _.cloneDeep(vm.trip.images);
    vm.isEditing = false;
    vm.trip      = TripService.getTrip($state.params.tripId);

    if (! _.isEqual(vm.trip.images, modifiedImages)) {
      vm.trip.images = modifiedImages
      TripService.updateImages(vm.trip._id, modifiedImages)
    }
  };

  vm.uploadImage = function(image) {
    if (image === null || image === undefined) return;

    vm.upload.hidden = false;
    Upload.upload({
        url: '/trip/' + vm.trip._id + '/img',
        data: { image: image }
      })
      .progress(function(evt) { vm.upload.progress = 100 * evt.loaded / evt.total })
      .then(function(res) { vm.trip.images.push(res.data._id) })
      .finally(function() { vm.upload.hidden = true; })
  };

  vm.deleteImage = function(image, imageIndex) {
    $http.delete('/trip/' + $state.params.tripId + '/img/' + image)
      .then(function() {
        vm.trip.images.splice(imageIndex, 1)
      })
  };

  vm.showImage = function(p) {
    var templateString = ''

    templateString += '<md-dialog aria-label="' + p.alt + '">';
    templateString += '<img src="' + p.src + '">';
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