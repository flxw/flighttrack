(function() {
'use strict';
// ------------------------------------

angular
  .module('myApp')
  .controller("TripController", tripController);

  tripController.$inject = ["TripService", "PlacesService", "Upload", "$http", "$stateParams", "$state"];

function tripController(TripService,  placesService, Upload, $http, $stateParams, $state) {
  var vm = this;

  vm.isEditing = false;
  vm.upload  = { hidden: true, progress: 0, image: '' };
  vm.destinationSearch = { text: '', query: placesService.searchPlace };

  vm.trip = TripService.getTrip($stateParams.tripId);

  vm.goBack = function () { $state.go('profile', { userId: $stateParams.userId }) }

  vm.edit = function () {
    vm.trip = _.cloneDeep(vm.trip);

    vm.trip.dates.start = new Date(vm.trip.dates.start)
    vm.trip.dates.end = new Date(vm.trip.dates.end)

    vm.isEditing = true;
  }

  vm.saveChanges = function () {
    vm.isEditing = false;
    TripService.saveTrip(vm.trip)
  }

  vm.cancelChanges = function () {
    vm.isEditing = false;

    // preserve the information about previously uploaded images :)
    var images = vm.trip.images;
    vm.trip    = TripService.getTrip($stateParams.tripId);

    if (vm.trip.images.length == images.length) return

    vm.trip.images = images;
    TripService.saveTrip(vm.trip);
  };

  vm.uploadImage = function(image) {
    vm.upload.hidden = false;
    Upload.upload({
        url: '/trip/' + vm.trip._id + '/img',
        data: { image: image }
      })
      .progress(function(evt) { vm.upload.value = 100 * evt.loaded / evt.total })
      .then(function(res) { vm.trip.images.push(res.data._id) })
      .finally(function() { vm.upload.hidden = true; })
  }

  vm.deleteImage = function(image, imageIndex) {
    $http.delete('/trip/img/' + image)
      .then(function() {
        vm.trip.images.splice(imageIndex, 1)
      })
  };
}

// ------------------------------------
})();