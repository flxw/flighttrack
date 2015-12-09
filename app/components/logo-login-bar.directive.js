(function() {
  'use strict';
  angular
    .module('myApp')
    .directive("logoLoginBar", logoLoginBarDirective)

  function logoLoginBarDirective() {
    return {
      scope: true,
      controller: logoLoginBarCtrl,
      controllerAs: "ctrl",
      templateUrl: "components/logo-login-bar.template.html"
    }
  }

  logoLoginBarCtrl.$inject = ["LoginService", "ProfileService", "$state"];

  function logoLoginBarCtrl(LoginService, ProfileService, $state) {
    var vm = this;
    var state = 'default';

    vm.email = '';
    vm.password = '';

    vm.getState = function() {
      if (LoginService.isLoggedIn()) {
        return 'logged-in'
      } else {
        return state
      }
    };

    vm.showLoginControls = function() {
      state = 'login'
    };

    vm.hideLoginControls = function() {
      state = 'default';
    };

    vm.login = function() {
      LoginService.login(vm.email, vm.password)
        .catch(function() {
          vm.password = "";
        })
    };

    vm.register = function() {
      $state.go('register');
    };
  }
})();