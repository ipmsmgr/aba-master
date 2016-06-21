'use strict';

angular.module('pi').directive('piRating', ['$timeout', 'DataService', function ($timeout, DataService) {

    function linkFunction(scope, iElement, iAttrs, ctrl) {

        scope.rating = null;

        scope.$on('visualize', function (event, args) {
            refresh(DataService.analysis);
        });



        var refresh = function (analysis) {

            if (analysis == null) {
                scope.rating = null;
                return;
            }

            scope.wordCnt = analysis.profile.word_count;

            var r = null;
            for (var i = 0; i < ratings.length; i++) {
                if ((ratings[i].count <= scope.wordCnt) && ((r == null) || (ratings[i].count > r.count))) {
                    r = ratings[i];
                }
            }
            scope.rating = r;
        };



        var ratings = [
            {
                count: 6000,
                level: "verystrong",
                label: "Very Strong Analysis",
                message: "A word count of 6000 or more is a high-quality assessment of someone's personality."
          },

            {
                count: 3500,
                level: "strong",
                label: "Strong Analysis",
                message: "This is a confident read of someone's personality. It's statistically significant. With 6000 words, you will get a high-quality assessment."
          },

            {
                count: 1500,
                level: "decent",
                label: "Decent Analysis",
                message: "These results are a general impression of this person, and they should be taken with a grain of salt. A strong analysis requires 3500 words."
          },

            {
                count: 0,
                level: "weak",
                label: "Weak Analysis",
                message: "With this many words, you can 't get a fair read on someone's personality.Can you use at least 1500 toget a general impression? "
          }
          ]


    }


    return {
        restrict: 'EA',
        templateUrl: 'directives/rating/RatingTemplate.html',
        link: linkFunction
    }
}]);
