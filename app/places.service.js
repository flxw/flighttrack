(function() {
  'use strict';
// ------------------------------------
angular
  .module("myApp")
  .factory("PlacesService", PlacesService);

PlacesService.$inject = ["uiGmapIsReady", "$q"];

function PlacesService(uiGmapIsReady, $q) {
  var s = {};

  var mapInstance;
  var placeService;

  // grab map object to create the place service
  uiGmapIsReady.promise(1).then(function(instances) {
    mapInstance = instances[0].map;
    placeService = new google.maps.places.PlacesService(mapInstance);
  });

  s.searchPlace = function(t) {
    var deferred = $q.defer();
    var request = {
      query: t,
      types: [ "locality", "political" ]
    };

    placeService.textSearch(request, function(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        var formattedResults = [];

        for (var i = 0, j = results.length; i < j; ++i) {
          formattedResults.push({
            name: results[i].formatted_address,
            coordinates: {
              latitude: results[i].geometry.location.lat(),
              longitude: results[i].geometry.location.lng()
            }
          });
        }

        deferred.resolve(formattedResults);
      }
    });

    return deferred.promise;
  };

  return s;
}
// ------------------------------------
})()