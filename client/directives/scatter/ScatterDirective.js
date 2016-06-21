'use strict';

angular.module('pi').directive('piScatter', [function () {

    function linkFunction(scope, iElement, iAttrs, ctrl) {


        // Event handler fired by UI
        scope.$on('visualize', function (event, args) {

            // Reset chart data object


            // We only run comparisons for more than one analyses
            if ((scope.analyses == null) || (scope.analyses.length < 2)) {
                return;
            }

            render();
        });


        var render = function () {
            var chart = new CanvasJS.Chart("chartContainer", {
                title: {
                    text: "Import Cost Impact on Business",
                    fontFamily: "arial black",
                    fontColor: "DarkSlateGrey"
                },
                animationEnabled: true,
                axisX: {
                    title: "Ease of Doing Business(1 = most friendly)",
                    titleFontFamily: "arial"

                },
                axisY: {
                    title: "Import cost per container",
                    titleFontFamily: "arial",
                    valueFormatString: "0 USD",
                    titleFontSize: 12
                },

                data: [
                    {
                        type: "scatter",
                        toolTipContent: "<span style='\"'color: {color};'\"'><strong>{name}</strong></span> <br/> <strong>Cost/ container</strong> {y} $<br/> <strong>Ease of Business</strong> {x} ",
                        dataPoints: [

                            {
                                x: 132,
                                y: 1070,
                                name: "India"
                            },
                            {
                                x: 126,
                                y: 2275,
                                name: "Brazil"
                            },
                            {
                                x: 100,
                                y: 1265,
                                name: "Greece"
                            },
                            {
                                x: 110,
                                y: 755,
                                name: "Egypt"
                            },
                            {
                                x: 120,
                                y: 1800,
                                name: "Russia"
                            },
                            {
                                x: 91,
                                y: 545,
                                name: "China"
                            },
                            {
                                x: 87,
                                y: 1245,
                                name: "Italy"
                            },
                            {
                                x: 44,
                                y: 1221,
                                name: "Spain"
                            },
                            {
                                x: 21,
                                y: 801,
                                name: "Latvia"
                            },
                            {
                                x: 18,
                                y: 435,
                                name: "Malaysia"
                            },
                            {
                                x: 53,
                                y: 1780,
                                name: "Mexico"
                            },
                            {
                                x: 20,
                                y: 970,
                                name: "Japan"
                            },
                            {
                                x: 35,
                                y: 1795,
                                name: "South Africa"
                            },
                            {
                                x: 19,
                                y: 937,
                                name: "Germany"
                            },
                            {
                                x: 6,
                                y: 729,
                                name: "Norway"
                            },
                            {
                                x: 4,
                                y: 1315,
                                name: "USA"
                            },
                            {
                                x: 13,
                                y: 1660,
                                name: "Canada"
                            },
                            {
                                x: 26,
                                y: 1540,
                                name: "Switzerland"
                            },
                            {
                                x: 1,
                                y: 439,
                                name: "Singapore"
                            },
                            {
                                x: 164,
                                y: 3650,
                                name: "Iraq"
                            },
                            {
                                x: 148,
                                y: 1318,
                                name: "Algeria"
                            },
                            {
                                x: 142,
                                y: 2805,
                                name: "Bhutan"
                            },
                            {
                                x: 135,
                                y: 2900,
                                name: "Sudan"
                            },
                            {
                                x: 123,
                                y: 3015,
                                name: "Uganda"
                            },
                            {
                                x: 105,
                                y: 705,
                                name: "Pakistan"
                            },
                            {
                                x: 113,
                                y: 180,
                                name: "Argentina"
                            },
                            {
                                x: 102,
                                y: 1750,
                                name: "Paraguay"
                            },
                            {
                                x: 80,
                                y: 1180,
                                name: "Croatia"
                            },
                            {
                                x: 71,
                                y: 1063,
                                name: "Turkey"
                            },
                            {
                                x: 51,
                                y: 1085,
                                name: "Hungary"
                            },
                            {
                                x: 42,
                                y: 2830,
                                name: "Columbia"
                            },
                            {
                                x: 30,
                                y: 899,
                                name: "Portugal"
                            },
                            {
                                x: 12,
                                y: 686,
                                name: "Saudi Arabia"
                            },
                            {
                                x: 29,
                                y: 1248,
                                name: "France"
                            },
                            {
                                x: 7,
                                y: 1045,
                                name: "UK"
                            },
                            {
                                x: 16,
                                y: 1715,
                                name: "Georgia"
                            },
                            {
                                x: 9,
                                y: 1674,
                                name: "Iceland"
                            }

				]
			}
			]
            });

            chart.render();
        }


    }


    return {
        restrict: 'EA',
        scope: {
            profile: '='
        },
        replace: true,
        templateUrl: 'directives/scatter/ScatterTemplate.html',
        link: linkFunction
    }
}]);
