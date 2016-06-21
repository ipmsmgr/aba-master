'use strict';

angular.module('pi').directive('piDetailsMultiple', ['DataService', 'ApiService', 'MetricsService', 'SummaryService', function (DataService,ApiService,MetricsService,SummaryService) {

    function linkFunction(scope, iElement, iAttrs, ctrl) {

        scope.subjectAnalyses = [];
        scope.thresholds = DataService.thresholds;

        var init = function () {
            // Pull the entire tag tree fromt the DB
            ApiService.tags.getTags().then(function (tags) {
                scope.tags = tags;
            })
        };
        init();

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
                analyses = args.analyses;
            } else if (args.analysis) {
                analyses = [args.analysis];
            }
            
            // Prepare data and visualize it
            convertToChartData(scope.scores, analyses);
        });


        // Adjust the height of the chart with the number
        // of series so that the bars don't become to skinny
        var getHeight = function () {

            var height = 150;
            if ((scope.data != null) && (scope.data.length)) {
                height += (scope.data.length * scope.data[0].values.length * 30);
            }
            return height;
        }

        scope.options = {
            chart: {
                type: 'multiBarHorizontalChart',
                height: getHeight(),
                //            width: 900,
                x: function (d) {
                    return d.label;
                },
                y: function (d) {
                    return d.value;
                },
                showControls: false,
                showValues: false,
                duration: 500,
                groupSpacing: .4,
                margin: {
                    left: 150
                },
                xAxis: {
                    showMaxMin: false
                        //                    ,axisLabelDistance:300
                },
                yAxis: {
                    //                    axisLabelDistance:300,
                    axisLabel: 'Values',
                    tickFormat: function (d) {
                        return d3.format(',.0f')((d + 0.5) * 100);
                    }
                },
                yDomain: [-0.5, 0.5]
            }
        };



        // Takes a response from the server after retrieving all
        // the entries for dividing data by tag. It then spits out
        // a data structure that can be visualized in a barchart.
        var convertToChartData = function (scores, subjectAnalyses) {

            if (scores == null) {
                scores = scope.scores;
            }

            if (subjectAnalyses == null) {
                subjectAnalyses = scope.subjectAnalyses;
            }
            
            scope.aggregates = DataService.getAggregates();

            scope.data = [];
            colorIndex = 0;
            scope.scores = scores;
            scope.subjectAnalyses = subjectAnalyses;


            // Flatten the profile tree for all analyses
            for (var i = 0; i < subjectAnalyses.length; i++) {
                var analysis = subjectAnalyses[i];
                var analysisScores = DataService.flattenScores(analysis);
                analysis.scores = {};
                for (key in analysisScores) {
                    analysis.scores[key] = {
                        values: [analysisScores[key]],
                        total: analysisScores[key],
                        avg: analysisScores[key]
                    }
                }
            }

            var all = scores.concat(subjectAnalyses);


            // Prepare data structure for chart
            for (var i = 0; i < all.length; i++) {

                var series = {
                    key: all[i].label,
                    values: [],
                    "color": getRandomColor()
                };

                for (var key in all[i].scores) {
                    // Check if metric was selected for display
                    if (MetricsService.isSelected(key)) {
                        series.values.push({
                            label: key,
                            value: all[i].scores[key].avg - 0.5,
                            description: SummaryService.getFacetDetails(key,all[i].scores[key].avg),
                            obj: all[i].scores[key]
                        });
                    }
                }
                scope.data.push(series);
            }


            scope.options.chart.height = getHeight();
            //scope.api.updateWithTimeout(100);

        }




        scope.refreshLayout = function () {
            //scope.api.updateWithTimeout(100);
        }

        var barcolors = ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];
        var colorIndex = 0;

        function getRandomColor() {
            var color = null;
            if ((colorIndex != null) && (colorIndex < barcolors.length)) {
                color = barcolors[colorIndex];
            } else {
                color = Colors.random();
            }
            colorIndex++;
            return color;
        }
        var Colors = {};
        Colors.names = {
            aqua: "#00ffff",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            black: "#000000",
            blue: "#0000ff",
            brown: "#a52a2a",
            cyan: "#00ffff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgrey: "#a9a9a9",
            darkgreen: "#006400",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkviolet: "#9400d3",
            fuchsia: "#ff00ff",
            gold: "#ffd700",
            green: "#008000",
            indigo: "#4b0082",
            khaki: "#f0e68c",
            lightblue: "#add8e6",
            lightcyan: "#e0ffff",
            lightgreen: "#90ee90",
            lightgrey: "#d3d3d3",
            lightpink: "#ffb6c1",
            lightyellow: "#ffffe0",
            lime: "#00ff00",
            magenta: "#ff00ff",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            orange: "#ffa500",
            pink: "#ffc0cb",
            purple: "#800080",
            violet: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            white: "#ffffff",
            yellow: "#ffff00"
        };
        Colors.random = function () {
            var result;
            var count = 0;
            for (var prop in this.names)
                if (Math.random() < 1 / ++count)
                    result = prop;
            return result;
        };


    }


    return {
        restrict: 'EA',
        scope: {
            analysis: '=',
            analyses: '='
        },
        templateUrl: 'directives/detailsMultiple/DetailsMultipleTemplate.html',
        link: linkFunction
    }
}]);
