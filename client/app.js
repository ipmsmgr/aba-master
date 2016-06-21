'use strict';

// Declare app level module which depends on views, and components
angular.module('pi', [
  'ngRoute',
  'ngFileUpload',
  'ngMaterial',
  'angularMoment',
    'ngFileSaver'
//    ,'nvd3ChartDirectives'
    ,'chart.js'
    ,'ui.sortable'
    ,'nvd3',
    'ui.tree',
    '720kb.datepicker',
    '720kb.tooltips',
    'pi.import',
    'pi.subject',
    'pi.splash',
    'ngSanitize',
    'pi.summary',
    'rzModule',
    'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/splash'});
}])

.filter('abs', function() {
    return function(num) { return Math.abs(num); }
});
