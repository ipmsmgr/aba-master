'use strict';

angular.module('pi').directive('piMetricsTree', ['MetricsService', 'StateService', function (MetricsService,StateService) {

    function linkFunction(scope, iElement, iAttrs, ctrl) {

        scope.metrics = MetricsService.metrics;
        
        scope.state = StateService;

        scope.toggleMetric = function (node) {
            MetricsService.toggleMetric(node);
        }

        scope.toggle2 = function (nodescope) {
            nodescope.toggle();
        };
        
        scope.selectChildren = function(parent){
            MetricsService.selectChildren(parent);
        };
    
         scope.deselectChildren = function(parent){
            MetricsService.deselectChildren(parent);
        };



    }


    return {
        restrict: 'EA',
        replace: true,
        scope: {},
        templateUrl: 'directives/metricsTree/MetricsTreeTemplate.html',
        link: linkFunction
    }
}]);
