'use strict';

angular.module('pi').directive('piComparison', ['DataService', function (DataService) {

    function linkFunction(scope, iElement, iAttrs, ctrl) {
        
   

        scope.chartData = [];

        // Event handler fired by UI
        scope.$on('visualize', function (event, args) {

            // Reset chart data object
            scope.chartData = {
                labels: [],
                series: [],
                data: []
            };

            scope.variance = {
                labels: [],
                series: [],
                data: []
            };

            scope.average = {
                labels: [],
                series: [],
                data: []
            };

            // We only run comparisons for more than one analyses
            if ((args.analyses == null) || (args.analyses.length < 2)) {
                return;
            }


            prepareKeys(args.analyses);
            prepareDataChart(args.analyses);
            computeVariance(scope.chartData);
            computeAverage(scope.chartData);
        });

        var prepareKeys = function (analyses) {
            // Extract keys from all profiles
            var keys = DataService.extractKeysFromAnalyses(analyses);
            
            
        
            for (var i = 0; i < analyses.length; i++) {
                analyses[i].scores = DataService.flattenScores(analyses[i]);
            }


            // Collect the scores for each of the keys identified above
            scope.reference = {}
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i]; //"Sympathy";
                scope.reference[key] = [];
                for (var k = 0; k < analyses.length; k++) {
                    var val = getScoreById(analyses[k], key);
                    scope.reference[key].push(val);
                }
            }
        }



     


        var prepareDataChart = function (analyses) {


            // Prepare the object that holds the information needed
            // to build the chart
            for (var key in scope.reference) {
                scope.chartData.labels.push(key);
            }
            for (var i = 0; i < analyses.length; i++) {
                var arr = [];
                for (key in scope.reference) {
                    arr.push(scope.reference[key][i])
                }
                scope.chartData.data.push(arr);
                scope.chartData.series.push(i);
            }

        }


        var computeVariance = function (dataObj) {

            scope.variance.series = ["Variance"];
            for (var i = 0; i < dataObj.labels.length; i++) {
                scope.variance.labels.push(dataObj.labels[i]); //dataObj.labels[i]
            }
            scope.variance.data = [[]];
            for (var i = 0; i < dataObj.data[0].length; i++) {
                var arr = [];
                for (var k = 0; k < dataObj.series.length; k++) {
                    arr.push(dataObj.data[k][i]);
                }
                scope.variance.data[0].push(scope.stddev(arr));

            }

        }


        var computeAverage = function (dataObj) {

            scope.average.series = ["Average"];
            for (var i = 0; i < dataObj.labels.length; i++) {
                scope.average.labels.push(dataObj.labels[i]); //dataObj.labels[i]
            }
            scope.average.data = [[]];
            for (var i = 0; i < dataObj.data[0].length; i++) {
                var arr = [];
                for (var k = 0; k < dataObj.series.length; k++) {
                    arr.push(dataObj.data[k][i]);
                }
                scope.average.data[0].push(scope.avg(arr));

            }

        }

        scope.stddev = function (arr) {
            return math.std(arr);
        }

        scope.stddevSort = function (el) {
            return math.std(el.scores);
        }

        scope.avg = function (arr) {
            var sum = 0;
            for (var i = 0; i < arr.length; i++) {
                sum += arr[i]; //don't forget to add the base
            }

            return sum / arr.length;
        }




        var getScoreById = function (analysis, id) {

            if (analysis == null) {
                return null;
            }

            // If this is the score with the matching ID return its value
            if (('id' in analysis) && (id == analysis.id)) return analysis.percentage;

            // .. otherwise look in it's children
            if ('children' in analysis) {
                for (var i = 0; i < analysis.children.length; i++) {
                    var val = getScoreById(analysis.children[i], id);
                    if (val) {
                        return val;
                    };
                }
            } else {
                if ('profile' in analysis) {
                    return getScoreById(analysis.profile.tree, id);
                } else {
                    return null;
                }
            }

            return null;
        };
        


    }


    return {
        restrict: 'EA',
        scope: {
            analyses: '='
        },
        templateUrl: 'directives/comparison/ComparisonTemplate.html',
        link: linkFunction
    }
}]);
