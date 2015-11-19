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

  storyViewEditorCtrl.$inject = ["tripService", "PlacesService", "Upload"];

  function storyViewEditorCtrl(tripService,  placesService, Upload) {
    var vm = this;

    vm.isEditing = false;
    vm.upload  = { hidden: true, progress: 0, image: '' };
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
      vm.isEditing = false;
      vm.trip = tripService.getCurrentTripCopy();
    }

    vm.uploadImage = function(image) {
      vm.upload.hidden = false;
      Upload.upload({
        url: '/trips/img',
        data: { image: image, 'id': vm.trip._id }
      })
        .progress(function(evt) { vm.upload.value = 100 * evt.loaded / evt.total })
        .finally(function() { vm.upload.hidden = true; })
    }

    vm.destinationSearch = {
      text: '',
      query: placesService.searchPlace
    }
  }
})();