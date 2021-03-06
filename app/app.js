(function() {
  'use strict';
  // ------------------------------------

  angular
    .module('myApp', ['uiGmapgoogle-maps', 'ngMaterial', 'ngMessages', 'hc.marked', 'ngFileUpload', 'ui.router', 'ngResource'])
    .config(config)
    .run(run);

  config.$inject = [
    'uiGmapGoogleMapApiProvider',
    "markedProvider",
    "$stateProvider",
    "$urlRouterProvider",
    "$mdThemingProvider"
  ];

  run.$inject = [
    '$rootScope',
    '$state',
    'LoginService'
  ];

  function config(GoogleMapApiProviders, markedProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider) {
    GoogleMapApiProviders.configure({
      key: 'AIzaSyD0lPD-ReozzrAEWR4eFKv6v0OzEp0bMWE',
      v: '3.20',
      libraries: 'geometry,places'
    });

    markedProvider.setRenderer({
      image: function (href, title, text) {
        var imageString;

        imageString  = "<img src='/img/" + href + "' ";
        imageString += "onclick='angular.element(document.querySelector(\"#master-content\")).scope().tripCtrl.showImage(this)' ";
        imageString += "alt='" + escape(text) + "'>"

        return imageString;
      }
    });

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('landing', {
        url: '/',
        views: {
          'master': {
            templateUrl: 'landing/master.html'
          }
        }
      })
      .state('register', {
        url: '/register',
        views: {
          'master': {
            templateUrl: 'register/master.html',
            controller: 'RegisterController',
            controllerAs: 'ctrl'
          }
        }
      })
      .state('profile', {
        url: '/u/:userId',
        views: {
          'master': {
            templateUrl: 'profile/master.html',
            controller: 'ProfileCtrl',
            controllerAs: 'profileCtrl'
          }
        }
      })
      .state('trip', {
        url: '/t/:tripId',
        views: {
          'master': {
            templateUrl: 'trip/master.html',
            controller: 'TripController',
            controllerAs: 'tripCtrl'
          }
        }
      })
      .state('trip.edit', {
        url: '/edit',
        views: {
          'master@': {
            templateUrl: 'trip.edit/master.html',
            controller: 'TripEditController',
            controllerAs: 'tripEditCtrl'
          }
        }
      })

    $mdThemingProvider
      .theme('dark')
      .primaryPalette('yellow');

    $mdThemingProvider.theme('default')
      .primaryPalette('cyan', {
        'default': '700'
      })
  }

  function run($rootScope, $state, LoginService) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      var redirectToTripPage = !LoginService.canEdit && toState.name === "trip.edit";

      if (redirectToTripPage) {
        event.preventDefault();
        $state.go("trip");
      }
    })
  }

  // ------------------------------------
})()
