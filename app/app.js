(function() {
  'use strict';
  // ------------------------------------

  angular
    .module('myApp', ['uiGmapgoogle-maps', 'ngMaterial', 'ngMessages', 'hc.marked', 'ngFileUpload', 'ui.router'])
    .config(config)
    .run(run);

  config.$inject = ['uiGmapGoogleMapApiProvider', "markedProvider", "$stateProvider", "$urlRouterProvider"];
  run.$inject = ['$rootScope', '$state', 'LoginService'];

  function config(GoogleMapApiProviders, markedProvider, $stateProvider, $urlRouterProvider) {
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
      .state('home', {
        abstract: true,
        template: '<div class="content" ui-view=""></div>',
      })
      .state('home.loggedIn', {
        url: '/',
        templateUrl: 'home.loggedIn/home.html'
      })
      .state('home.loggedOut', {
        templateUrl: 'home.loggedOut/home.html',
        abstract: true
      })
      .state('home.loggedOut.login', {
        url: '/login',
        templateUrl: 'home.loggedOut/login.html'
      })
      .state('home.loggedOut.default', {
        url: '/',
        templateUrl: 'home.loggedOut/default.html'
      })
  }

  function run($rootScope, $state, LoginService) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

      // logged out is logged out
      var doRedirectToLoggedOut = !LoginService.isLoggedIn && toState.name === "home.loggedIn";

      if (doRedirectToLoggedOut) {
        event.preventDefault();
        $state.go("home.loggedOut.default");
      }

      // logged in is logged in
      var doRedirectToLoggedIn = LoginService.isLoggedIn && toState.name === "home.loggedOut";

      if (doRedirectToLoggedIn) {
        event.preventDefault();
        $state.go("home.loggedIn");
      }
    });
  }

  // ------------------------------------
})()
