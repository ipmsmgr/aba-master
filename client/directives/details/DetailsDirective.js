'use strict';

angular.module('pi').directive('piDetails', ['DataService', 'ApiService', 'MetricsService', 'SummaryService', 'ChartDataService', function (DataService,ApiService,MetricsService,SummaryService,ChartDataService) {

    function linkFunction(scope, iElement, iAttrs, ctrl) {

        scope.subjectAnalyses = [];
        scope.thresholds = DataService.thresholds;

        scope.$on('visualize', function (event, args) {
            // If a tag comparison was not already initiated, 
            // we are not doing anything here.
            if ((args.scores == null) && (scope.scores == null)) {
                scope.scores = [];
            }

            // If a comparison analysis is already shown,
            // update the reference with the newly selected
            // analyses
            var analyses = null;
            if ((args.analyses) && (args.analyses.length)) {
                convertToChartData(null);
            } else if (args.analysis) {
                convertToChartData(args.analysis);
            }
        });


        // Takes a response from the server after retrieving all
        // the entries for dividing data by tag. It then spits out
        // a data structure that can be visualized in a barchart.
        var convertToChartData = function (analysis) {
            
            scope.data = [];

            if (analysis == null) {
                return;
            }
  
            // Big 5 Personality Facets
            var facetData = {label:"Big 5 Personality Facets",values:[]};
            var facets = analysis.profile.tree.children[0].children[0].children[1].children;
            var facets = analysis.profile.tree.children[0].children[0].children;
            for (var i = 0; i < facets.length; i++) {
                var obj = facets[i];
                var details = SummaryService.getFacetDetails(obj.id,obj.percentage);
                for (var key in details){
                    obj[key] = details[key];
                }
                facetData.values.push(obj);
                
                for (var k = 0; k < facets[i].children.length; k++) {
                    var cobj = facets[i].children[k];
                    var details = SummaryService.getFacetDetails(cobj.id,cobj.percentage);
                    for (var key in details){
                        cobj[key] = details[key];
                    }
                    facetData.values.push(cobj);
                };
            };
            scope.data.push(facetData);
            
            // Needs
            var needsData = {label:"Needs",values:[]};
            var needs = analysis.profile.tree.children[1].children[0].children;
            for (var i = 0; i < needs.length; i++) {
                var obj = needs[i];
                var details = SummaryService.getNeedDetails(needs[i].id,needs[i].percentage);
                for (var key in details){
                    obj[key] = details[key];
                }
                needsData.values.push(obj);
            }
            scope.data.push(needsData);
            
            // Values
            var valuesData = {label:"Values",values:[]};
            var values = analysis.profile.tree.children[2].children[0].children;
            for (var i = 0; i < values.length; i++) {
                var obj = values[i];
                var details = SummaryService.getValueDetails(values[i].id,values[i].percentage);
                for (var key in details){
                    obj[key] = details[key];
                }
                valuesData.values.push(obj);
            }
            scope.data.push(valuesData);
        }
    }


    return {
        restrict: 'EA',
        scope: {
            analysis: '=',
            analyses: '='
        },
        templateUrl: 'directives/details/DetailsTemplate.html',
        link: linkFunction
    }
}]);
