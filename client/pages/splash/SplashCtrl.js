'use strict';

angular.module('pi.splash', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/splash', {
        templateUrl: 'pages/splash/Splash.html',
        controller: 'SplashCtrl'
    });
}])

.controller('SplashCtrl', ['$scope', '$location', 'StateService', function ($scope, $location) {

    $scope.loadSubject = function(subject){
        $location.path("/subject/"+subject);
    };
    
    $scope.analyze = function(){
        $location.path("/import");
    };
    
    $scope.discover = function(){
        $location.path("/explore");
    };
    
    



}]);
