(function() {
  'use strict';
  angular
    .module('myApp')
    .directive("storyViewEditor", storyViewEditorDirective)

  function storyViewEditorDirective() {
    return {
      scope: true,
      controller: storyViewEditorCtrl,
      controllerAs: "sveCtrl",
      templateUrl: "components/story-view-editor.template.html"
    }
  }

  storyViewEditorCtrl.$inject = ["tripService", "PlacesService", "Upload", "$http"];

  function storyViewEditorCtrl(tripService,  placesService, Upload, $http) {
    var vm = this;

    vm.isEditing = false;
    vm.upload  = { hidden: true, progress: 0, image: '' };
    vm.destinationSearch = {
      text: '',
      query: placesService.searchPlace
    }
    vm.trip = tripService.getCurrentTripCopy();

    vm.goBack = function () {
      tripService.selectTrip(null);
    }

    vm.edit = function () {
      vm.isEditing = true
    }

    vm.saveChanges = function () {
      vm.isEditing = false;
      tripService.changeCurrentTrip(vm.trip)
    }

    vm.cancelChanges = function () {
      var images = vm.trip.images;

      // preserve the information about previosly uploaded images :)
      vm.isEditing = false;
      vm.trip = tripService.getCurrentTripCopy();
      debugger
      vm.trip.images = images;
      tripService.changeCurrentTrip(vm.trip);
    }

    vm.uploadImage = function(image) {
      vm.upload.hidden = false;
      Upload.upload({
        url: '/trip/img',
        data: { image: image, 'id': vm.trip._id }
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
    }
  }
})();