'use strict';

angular.module('pi').directive('piSummary', ['SummaryService', 'DataService', function (SummaryService,DataService) {

    function linkFunction(scope, iElement, iAttrs, ctrl) {

        // Event handler fired by UI
        scope.$on('visualize', function (event, args) {
            if (args.analysis) {
                refresh(args.analysis);
            } else{
                refresh(DataService.analysis); // reset chart
            }
        });
        
        
        scope.summary = {text:"",lines:[],details:{}};
        
        var refresh = function(analysis){
            
            scope.summary = {text:"",lines:[],details:{}};
            
            if(analysis==null) return;
                
                var summary = SummaryService.getSummary(analysis.profile);
                scope.summary = {text: summary,lines:summary.split("\n")};
                scope.summary.details = SummaryService.getSummaryDetails(analysis.profile);
        }
    }


    return {
        restrict: 'EA',
        templateUrl: 'directives/summary/SummaryTemplate.html',
        link: linkFunction
    }
}]);
