(function() {
  'use strict';
// ------------------------------------
  angular
    .module("myApp")
    .factory("LoginService", LoginService);

  LoginService.$inject = ["$http", "$q", "$state", "ProfileService"];

  function LoginService($http, $q, $state, ProfileService) {
    var s = {};

    s.currentUser = null;

    s.login =  function(email, password) {
      var deferred = $q.defer();
      var payload = { email: email, password: password };

      $http
        .post('/user/login', payload)
        .then(function (response) {
          s.currentUser = _.clone(response.data)
          deferred.resolve(response.data)
        })
        .catch(deferred.reject)

      return deferred.promise
    };

    s.logout = function() {
      var deferred = $q.defer()

      $http
        .get('/user/logout')
        .then(function() {
          s.currentUser = null;
          deferred.resolve()
        })
        .catch(deferred.reject)

      return deferred.promise
    };

    s.register = function(userObject) {
      var deferred = $q.defer();

      $http
        .post('/user/register', userObject)
        .then(function (response) {
          s.currentUser = _.clone(response.data);
          deferred.resolve(s.currentUser);
        })
        .catch(deferred.reject)

      return deferred.promise
    };

    s.isLoggedIn  = function() { return s.currentUser !== null };
    s.canEdit = function() {
      try {
        var isOwnProfile = $state.params.userId === s.currentUser._id;
        var isOwnTrip    = ProfileService.getTripIdsForUser(s.currentUser._id).indexOf($state.params.tripId) >= 0;

        return s.isLoggedIn() && (isOwnProfile || isOwnTrip)
      } catch(e) {
        return false
      }
    };

    // test for current logged in user
    $http
      .get('/user/login')
      .then(function (response) {
        s.currentUser = _.clone(response.data)
      })
      .catch()

    return s;
  }
})();