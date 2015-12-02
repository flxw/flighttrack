(function() {
  'use strict';
  // ------------------------------------

  angular
    .module('myApp', ['uiGmapgoogle-maps', 'ngMaterial', 'ngMessages', 'hc.marked', 'ngFileUpload', 'ui.router', 'ngResource'])
    .config(config)
    .run(run);

  config.$inject = ['uiGmapGoogleMapApiProvider', "markedProvider", "$stateProvider", "$urlRouterProvider"];
  run.$inject = ['$rootScope', '$state', 'LoginService'];

  function config(GoogleMapApiProviders, markedProvider, $stateProvider, $urlRouterProvider, configProvider) {
    GoogleMapApiProviders.configure({
      key: 'AIzaSyD0lPD-ReozzrAEWR4eFKv6v0OzEp0bMWE',
      v: '3.20',
      libraries: 'geometry,places'
    });

    markedProvider.setRenderer({
      image: function (href, title, text) {
        return "<img src='/trip/img/" + href + "'>";
      }
    });

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('landing', {
        url: '/',
        views: {
          'master': {
            templateUrl: 'landing/master.html'
          },
          'detail': {
            templateUrl: 'landing/detail.html'
          }
        }
      })
      .state('login', {
        url: '/login',
        views: {
          'master': {
            templateUrl: 'login/master.html'
          },
          'detail': {
            templateUrl: 'login/detail.html'
          }
        }
      })
      .state('register', {
        url: '/register',
        views: {
          'master': {
            templateUrl: 'register/master.html'
          },
          'detail': {
            templateUrl: 'register/detail.html'
          }
        }
      })
      .state('profile', {
        url: '/:userId',
        views: {
          'master': {
            templateUrl: 'profile/master.html',
            controller: 'ProfileCtrl',
            controllerAs: 'profileCtrl'
          },
          'detail': {
            templateUrl: 'profile/detail.html',
            controller: 'MapController',
            controllerAs: 'ctrl'
          }
        }
      })
      .state('profile.trip', {
        url: '/:tripId',
        views: {
          'master@': {
            templateUrl: 'trip/master.html',
            controller: 'TripController',
            controllerAs: 'tripCtrl'
          }
        }
      })
  }

  function run($rootScope, $state, LoginService) {
    /*$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      var doRedirectToLoggedOut = !LoginService.isLoggedIn && toState.name === "home.loggedIn";
      var doRedirectToLoggedIn = LoginService.isLoggedIn && toState.name === "home.loggedOut.default";

      if (doRedirectToLoggedOut) {
        event.preventDefault();
        $state.go("home.loggedOut.default");
      } else if (doRedirectToLoggedIn) {
        event.preventDefault();
        $state.go("home.loggedIn");
      }
    });*/
  }

  // ------------------------------------
})()
