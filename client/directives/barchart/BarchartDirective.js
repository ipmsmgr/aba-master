'use strict';

angular.module('pi').directive('piBarchart', ['DataService', function (DataService) {

    function linkFunction(scope, iElement, iAttrs, ctrl) {

        // Event handler fired by UI
        scope.$on('visualize', function (event, args) {

            if ((args.analyses) && (args.analyses.length)) {
                convertMultiple(args.analyses);
            } else if (args.analysis) {
                convertMultiple([args.analysis]);
            } else{
                convertMultiple(null); // reset chart
            }
        });


        var getHeight = function () {
            var height = 600;
            if (scope.analyses != null) {

                height += (scope.analyses.length * 300);
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


        var convertMultiple = function (analyses) {

            scope.data = [];

            if (analyses != null) {

                // Extract keys from all profiles
                var keys = DataService.extractKeysFromAnalyses(analyses);


                for (var i = 0; i < analyses.length; i++) {
                    var analysis = analyses[i];
                    var scores = DataService.flattenScores(analysis);
                    analysis.scores = scores;
                    var series = {
                        key: (analysis.label != null ? analysis.label : analysis.date),
                        values: [],
                        "color": getRandomColor(i)
                    };
                    for (var key in scores) {
                        series.values.push({
                            label: key,
                            value: scores[key] - 0.5
                        });
                    }
                    scope.data.push(series);
                }
            }

            scope.options.chart.height = getHeight();
            scope.api.updateWithTimeout(100);

        }
        
        
        // Need to refresh the graph whenever parent div is resized
        scope.$watch(
          function () {
            return [$("#barchartDiv")[0].offsetWidth, $("#barchartDiv")[0].offsetHeight].join('x');
          },
          function (value) {
              console.log("Refreshing layout");
            scope.refreshLayout();
          }
        )

        scope.refreshLayout = function () {
            scope.api.updateWithTimeout(100);
        }

        var barcolors = ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];

        function getRandomColor(index) {

            if ((index != null) && (index < barcolors.length)) {
                return barcolors[index];
            } else {
                return Colors.random();
            }
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
        templateUrl: 'directives/barchart/BarchartTemplate.html',
        link: linkFunction
    }
}]);
