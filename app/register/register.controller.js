(function() {
  'use strict';
// ------------------------------------

  angular
    .module('myApp')
    .controller("RegisterController", registerController);

  registerController.$inject = ["LoginService", "$state"];

  function registerController(LoginService, $state) {
    var vm = this;

    vm.user = {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    };
    vm.isNoRobot = false;

    vm.register = function() {
      LoginService
        .register(vm.user)
        .then(function(user) {
          $state.go('profile', { userId: user._id })
        })
    }
  };

// ------------------------------------
})();