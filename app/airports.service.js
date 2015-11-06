(function() {
// ------------------------------------

angular
  .module('myApp')
  .factory('airports', airports);

function airports() {
  return [
    { code: "FRA", city: 'Frankfurt', coordinates: { latitude:  50.036512, longitude: 8.558235 } },
    { code:"DXB", city: 'Dubai', coordinates: { latitude: 25.253834, longitude: 55.364814 } },
    { code: "BNE", city: 'Brisbane', coordinates: { latitude: -27.394051, longitude: 153.121133 } },
    { city: "Sydney", code: "SYD", coordinates: { latitude: -33.946111, longitude: 151.177222 } },
    { city: "Cairns", code: "CNS", coordinates: { latitude: -16.885833, longitude: 145.755278 } },
    { city: "Shanghai", code: "PVG", coordinates: { latitude: 31.143378, longitude: 121.805214 } },
    { city: "Cologne", code: "CGN", coordinates: { latitude: 50.865917, longitude: 7.142744 } },
    { city: "Kuala Lumpur",code: "KUL", coordinates: { latitude: 2.745578, longitude: 101.709917 } },
    { city: "Delhi", code: "DEL", coordinates: { latitude: 28.5665, longitude: 77.103088 } }
  ]
}
// ------------------------------------
})()