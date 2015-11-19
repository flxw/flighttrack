(function() {
'use strict';
// ------------------------------------

angular
  .module('myApp', ['uiGmapgoogle-maps', 'ngMaterial', 'ngMessages', 'hc.marked', 'ngFileUpload'])
  .config(config);

config.$inject = ['uiGmapGoogleMapApiProvider', "markedProvider"];

function config(GoogleMapApiProviders, markedProvider) {
  GoogleMapApiProviders.configure({
    key: 'AIzaSyD0lPD-ReozzrAEWR4eFKv6v0OzEp0bMWE',
    v: '3.20',
    libraries: 'geometry,places'
  });

  markedProvider.setRenderer({
    image: function(href, title, text) {
      return "<img src='/trip/img/" + href + "'>";
    }
  });
}

// ------------------------------------
})();

