(function() {
'use strict';
// ------------------------------------

angular
  .module('myApp')
  .controller("someCtrl", someControllerFn);

someControllerFn.$inject = ['$scope', 'uiGmapGoogleMapApi', '$mdDialog'];

function someControllerFn($scope, uiGmapGoogleMapApi, $mdDialog) {
  $scope.map = {
    center: {
      latitude: 30,
      longitude: 9
    },
    zoom: 5,
    options: {
      disableDefaultUI: true
    }
  };

  $scope.flights = [
    {
      origin: { code: 'FRA', name: 'Frankfurt', coordinates: { latitude:  50.036512, longitude: 8.558235 } },
      destination: { code:'DXB', name: 'Dubai', coordinates: { latitude: 25.253834, longitude: 55.364814 } },
      departure: '14.08.2015',
      arrival: '15.08.2015',
      airline: 'Emirates'
    },
    {
      origin: { code:'DXB', name: 'Dubai', coordinates: { latitude: 25.253834, longitude: 55.364814 } },
      destination: { code: 'BNE', name: 'Brisbane', coordinates: { latitude: -27.394051, longitude: 153.121133 } },
      departure: '15.08.2015',
      arrival: '16.08.2015',
      airline: 'Emirates'
    },
    {
      origin: { code: 'BNE', name: 'Brisbane', coordinates: { latitude: -27.394051, longitude: 153.121133 } },
      destination: { code:'SYD', name: 'Sydney', coordinates: { latitude: -33.9399228, longitude: 151.1730877 } },
      departure: '8.10.2015',
      arrival: '8.10.2015',
      airline: 'Tigerair'
    }
  ];

  $scope.showDialog = showDialog;

  function showDialog($event) {
   var parentEl = angular.element(document.body);
   $mdDialog.show({
     parent: parentEl,
     targetEvent: $event,
     template:
      '<md-content layout-padding>' +
      '    <form name="userForm">' +
      '      <div layout layout-sm="column">' +
      '        <md-input-container style="width:70%">' +
      '          <label>Company (Disabled)</label>' +
      '          <input ng-model="user.company" disabled>' +
      '        </md-input-container>' +
      '        <md-datepicker ng-model="user.submissionDate" md-placeholder="Enter date"></md-datepicker>' +
      '      </div>' +
      '      <div layout layout-sm="column">' +
      '        <md-input-container flex>' +
      '          <label>First name</label>' +
      '          <input ng-model="user.firstName">' +
      '        </md-input-container>' +
      '        <md-input-container flex>' +
      '          <label>Last Name</label>' +
      '          <input ng-model="theMax">' +
      '        </md-input-container>' +
      '      </div>' +
      '      <md-input-container flex>' +
      '        <label>Address</label>' +
      '        <input ng-model="user.address">' +
      '      </md-input-container>' +
      '      <md-input-container md-no-float>' +
      '        <input ng-model="user.address2" placeholder="Address 2">' +
      '      </md-input-container>' +
      '      <div layout layout-sm="column">' +
      '        <md-input-container flex>' +
      '          <label>City</label>' +
      '          <input ng-model="user.city">' +
      '        </md-input-container>' +
      '        <md-input-container flex>' +
      '          <label>State</label>' +
      '          <md-select ng-model="user.state">' +
      '            <md-option ng-repeat="state in states" value="{{state.abbrev}}">' +
      '              {{state.abbrev}}' +
      '            </md-option>' +
      '          </md-select>' +
      '        </md-input-container>' +
      '        <md-input-container flex>' +
      '          <label>Postal Code</label>' +
      '          <input name="postalCode" ng-model="user.postalCode" placeholder="12345"' +
      '                 required ng-pattern="/^[0-9]{5}$/" md-maxlength="5">' +
      '          <div ng-messages="userForm.postalCode.$error" role="alert" multiple>' +
      '            <div ng-message="required" class="my-message">You must supply a postal code.</div>' +
      '            <div ng-message="pattern" class="my-message">That doesn\'t look like a valid postal' +
      '              code.' +
      '            </div>' +
      '            <div ng-message="md-maxlength" class="my-message">' +
      '              Don\'t use the long version silly...we don\'t need to be that specific...' +
      '            </div>' +
      '          </div>' +
      '        </md-input-container>' +
      '      </div>' +
      '      <md-input-container flex>' +
      '        <label>Biography</label>' +
      '        <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea>' +
      '      </md-input-container>' +
      '    </form>' +
      '  </md-content>',
     controller: DialogController
  });

  function DialogController($scope, $mdDialog) {
    $scope.closeDialog = function() {
      $mdDialog.hide();
    }

    $scope.user = {
      title: 'Developer',
      email: 'ipsum@lorem.com',
      firstName: '',
      lastName: '',
      company: 'Google',
      address: '1600 Amphitheatre Pkwy',
      city: 'Mountain View',
      state: 'CA',
      biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
      postalCode: '94043'
    };
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
      'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
      'WY').split(' ').map(function(state) { return {abbrev: state} })
    }
  }
}

// ------------------------------------
})();