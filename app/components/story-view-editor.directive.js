(function() {
  'use strict';
  angular
    .module('myApp')
    .directive("storyViewEditor", storyViewEditorDirective)

  function storyViewEditorDirective() {
    return {
      bindToController: {
        tripId: "="
      },
      scope: true,
      controller: storyViewEditorCtrl,
      controllerAs: "sveCtrl",
      templateUrl: "components/story-view-editor.template.html"
    }
  }

  storyViewEditorCtrl.$inject = ["tripService"];

  function storyViewEditorCtrl(tripService) {
    var vm = this;

    vm.isEditing = false
    vm.trip = _.cloneDeep(tripService.trips[vm.tripId]);

    vm.goBack = function() { vm.tripId = null }
    vm.edit = function() { vm.isEditing = true }
    vm.saveChanges = function() { vm.isEditing = false; tripService.changeTrip(vm.tripId, vm.trip) }
    vm.cancelChanges = function() { vm.isEditing = false; vm.trip = tripService.trips[vm.tripId] }
  }
})()