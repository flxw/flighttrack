(function() {
'use strict';
// ------------------------------------

angular
  .module('myApp', ['uiGmapgoogle-maps', 'ngMaterial', 'ngMessages'])
  .config(config);

config.$inject = ['uiGmapGoogleMapApiProvider'];

function config(GoogleMapApiProviders) {
  GoogleMapApiProviders.configure({
    key: 'AIzaSyD0lPD-ReozzrAEWR4eFKv6v0OzEp0bMWE',
    v: '3.20',
    libraries: 'geometry'
  });
}

// ------------------------------------
})();

