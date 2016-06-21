/*jslint browser: true, devel: true, node: true*/
/*global angular */
'use strict';

angular.module('pi').directive('piComparisonSummary', ['ComparisonSummaryService', 'DataService', 'SummaryService', 'ApiService', 'ChartDataService',  function (ComparisonSummaryService, DataService, SummaryService, ApiService, ChartDataService) {
    console.log("comparisonSummaryServiceMain");
    
    function linkFunction(scope, iElement, iAttrs, ctrl) {
        
        
        // Globals
        scope.focusAnalysis = {text: "", profile: null, summary: {text: "", lines: []}};
        scope.background = {text: "", scores: [], profile: null, summary: {text: "", lines: []}};
        scope.aggregate = {text: "", profile: null, summary: {text: "", lines: [], header: []}};
        
        var clearComparisonSummary,
            updateComparisonSummary,
            analyze;
        
        clearComparisonSummary = function () {
            scope.summary = {text: "", lines: [], details: []};
        };
        
        updateComparisonSummary = function () {
            
            if (scope.background.profile && scope.aggregate.profile) {
                var aggregateSummary = ComparisonSummaryService.getAggregateSummary(scope.aggregate.profile),
                    comparisonSummary = ComparisonSummaryService.getComparisonSummary(scope.background, scope.focusAnalysis);
                scope.aggregate.summary = {text: aggregateSummary, lines: aggregateSummary.split("\n"), header: ["Aggregate Summary"]};
                scope.background.summary = {text: comparisonSummary, lines: comparisonSummary.split("\n")};
            }
        };
        
        
        // This gets called whenever the comparison needs to be refreshed.
        // It takes the compiled text for aggregate and background and runs
        // it against the PI API to receive a new profile.
        // All that is stored in the respective objectives for aggreage and background.
        analyze = function () {
            
            // Seeting profiles to null to be able to detect
            // when both calls have been returned.
            scope.background.profile = null;
            scope.aggregate.profile = null;
            
            ApiService.analyze(scope.aggregate.text).then(function (profile) {
                scope.aggregate.profile = profile;
                if(profile != null){
                    scope.aggregate.summary = ComparisonSummaryService.getAggregateSummary(profile);
                    updateComparisonSummary();
                }
            });

            ApiService.analyze(scope.background.text).then(function (profile) {
                scope.background.profile = profile;
                if(profile != null){
                    scope.background.scores = ChartDataService.flattenScores(scope.background);
                    updateComparisonSummary();
                }
            });
        };
        
        // Event handler fired by UI
        scope.$on('visualize', function (event, args) {
            var i,
                backgroundAnalyses;
            
            console.log('received "compare"');
            if (DataService.analyses) {
                
                var analyses = angular.copy(DataService.analyses);
                
                // Compile the aggregate text and background text
                for (i = 0; i < analyses.length; i += 1) {
                    scope.aggregate.text += analyses[i].text;
                }

                // DataService.analyses are sorted by date of import
                // Split the most recent selected analysis (focus) off from the rest (background)
                scope.focusAnalysis = analyses.pop();

                // gather together the text from the remaining analyses
                for (i = 0; i < analyses.length; i += 1) {
                    scope.background.text += analyses[i].text;
                }
                //console.log("backgroundText: " + ComparisonSummaryService.backgroundText);
                ComparisonSummaryService.doCompare = true;
            }
            if (ComparisonSummaryService.doCompare) {
                analyze();
            } else {
                clearComparisonSummary();
            }
        });
        
    }
    
    return {
        restrict: 'EA',
        templateUrl: 'directives/comparisonSummary/ComparisonSummaryTemplate.html',
        link: linkFunction
    };
    
}]);