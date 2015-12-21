(function() {
'use strict';
// ------------------------------------

angular
  .module('myApp')
  .controller("TripEditController", TripEditController);

  TripEditController.$inject = ["TripService", "PlacesService", "Upload", "$http", "$state"];

function TripEditController(TripService,  PlacesService, Upload, $http, $state) {
  var vm = this;

  vm.upload  = { hidden: true, progress: 0, image: '' };
  vm.destinationSearch = { text: '', query: PlacesService.searchPlace };
  vm.trip = TripService.getTrip($state.params.tripId);

  vm.trip
    .$promise
    .then(function() {
    vm.trip = _.cloneDeep(vm.trip);

    vm.trip.dates.start = new Date(vm.trip.dates.start);
    vm.trip.dates.end = new Date(vm.trip.dates.end)
  });

  vm.saveChanges = function () {
    TripService.saveTrip(vm.trip)
    $state.go('profile.trip')
  };

  vm.cancelChanges = function () {
    // still save image uploads on client side
    // to avoid bad updates
    var modifiedImages = _.cloneDeep(vm.trip.images);
    vm.trip            = TripService.getTrip($state.params.tripId);

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
}

// ------------------------------------
})();