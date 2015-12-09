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
      var payload = { email: _id, password: password };

      $http
        .post('/account/login', payload)
        .then(function (response) {
        });
    };

    s.register = function(userObject) {
      var deferred = $q.defer();

      $http
        .post('/user/register', userObject)
        .then(deferred.resolve)
        .catch(deferred.reject)

      return deferred.promise
    }

    s.isLoggedIn = function() { return false };

    return s;
  }
})();