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

  storyViewEditorCtrl.$inject = ["tripService"];

  function storyViewEditorCtrl(tripService) {
    var vm = this;

    vm.isEditing = false;
    vm.trip = tripService.getCurrentTripCopy();

    vm.goBack = function() { tripService.selectTrip(null); }
    vm.edit = function() { vm.isEditing = true }
    vm.saveChanges = function() { vm.isEditing = false; tripService.changeCurrentTrip(vm.trip) }
    vm.cancelChanges = function() { vm.isEditing = false; vm.trip = tripService.getCurrentTripCopy(); }
  }
})()