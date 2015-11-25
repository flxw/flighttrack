(function() {
  'use strict';
// ------------------------------------
  angular
    .module("myApp")
    .factory("LoginService", LoginService);

  LoginService.$inject = ["$http", "$q"];

  function LoginService($http, $q) {
    var s = {};

    s.login =  function(_id, password) {
      var payload = { _id: _id, password: password };

      $http
        .post('/account/login', payload)
        .then(function (response) {
        });
    };

    return s;
  }
})();