'use strict';

angular.module('pi').directive('piSunburst', function () {

    function linkFunction(scope, iElement, iAttrs, ctrl) {


        scope.$on('visualize', function (event, args) {

            scope.showChart(scope.profile);
        });

        scope.showChart = function (profile) {
            if (profile == null) {
                return;
            }

            var chart = new PersonalitySunburstChart('sunburstChart');
            chart.show(profile);
        }

        var pi_profile = '';

        function postSunburst(profile) {
            pi_profile = profile;
        }

        function post_to_url(url) {





            var form = document.createElement('form');
            form.action = url;
            form.method = 'POST';
            //form.target = '_blank';

            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "data");
            hiddenField.setAttribute("value", JSON.stringify(pi_profile));
            form.appendChild(hiddenField);
            document.body.appendChild(form);
            form.submit();
        }

        function postSunburstRequest() {

            $.post("sunburst", function (data) {

            });


        }


    }


    return {
        restrict: 'EA',
        replace: true,
        scope: {
            profile: '='
        },
        templateUrl: 'directives/sunburst/SunburstTemplate.html',
        link: linkFunction
    }
});
