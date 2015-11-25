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
      templateUrl: "components/logo-home.loggedIn-bar.template.html"
    }
  }

  logoLoginBarCtrl.$inject = ["LoginService"];

  function logoLoginBarCtrl(loginService) {
    var vm = this;

    vm._id = '';
    vm.password = '';

    vm.login = loginService.login;
  }
})();