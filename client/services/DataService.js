'use strict';

angular.module('pi').service('DataService', ['$rootScope', '$q', 'ApiService', 'MetricsService', function ($rootScope, $q, ApiService, MetricsService) {

    this.thresholds = {
        min: 0.4,
        max: 0.6
    };

    this.analysis = null;




    function intersection_destructive(a, b) {
        var result = [];
        while (a.length > 0 && b.length > 0) {
            if (a[0] < b[0]) {
                a.shift();
            } else if (a[0] > b[0]) {
                b.shift();
            } else /* they're equal */ {
                result.push(a.shift());
                b.shift();
            }
        }

        return result;
    };


    // Takes a response from the server after retrieving all
    // the entries for dividing data by tag. It then spits out
    // a data structure that can be visualized in a barchart.
    this.getChartData = function (tagTree) {

        if (tagTree != null) {


            // Flatten the profile tree for all categories
            for (var tag in tagTree) {
                for (var i = 0; i < tagTree[tag].length; i++) {
                    var analysis = tagTree[tag][i];
                    analysis.scores = this.flattenScores(analysis);
                }
            }

            // Grab all the keys
            var keys = MetricsService.getFlatMetrics();

            // Collect values based on tag
            var acc = {};
            for (var tag in tagTree) {
                acc[tag] = {};
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i].id;
                    acc[tag][key] = {
                        values: []
                    };
                    for (var k = 0; k < tagTree[tag].length; k++) {
                        acc[tag][key].values.push(tagTree[tag][k].scores[key]);
                    }
                }
            }


            // Calculate aggregate
            for (var tag in acc) {
                for (key in acc[tag]) {
                    var total = 0;
                    for (var i = 0; i < acc[tag][key].values.length; i++) {
                        total += acc[tag][key].values[i];
                    }
                    acc[tag][key].total = total
                    acc[tag][key].avg = total / tagTree[tag].length;
                }
            }



            // Prepare chart data
            var chart = [];
            for (var tag in acc) {

                var series = {
                    key: tag,
                    values: [],
                    "color": getRandomColor()
                };

                for (key in acc[tag]) {
                    series.values.push({
                        label: key,
                        value: acc[tag][key].avg - 0.5
                    });
                }
                chart.push(series);
            }

        }

        scope.options.chart.height = getHeight();
        scope.api.updateWithTimeout(100);

    }


    // TODO remove!
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
        azure: "#f0ffff"
    };
    Colors.random = function () {
        var result;
        var count = 0;
        for (var prop in this.names)
            if (Math.random() < 1 / ++count)
                result = prop;
        return result;
    };
    

    this.subject = {
        id: null,
        analyses: []
    };
    this.scores = [];

    this.addScoresForTag = function (tag) {
        var self = this;
        ApiService.getScoresByTag(tag).then(function (scores) {
            self.scores.push(scores);
            $rootScope.$broadcast('visualizeTags', {
                scores: self.scores
            });
            $rootScope.$broadcast('visualize', {});
        });
    };

    this.removeScoresForTag = function (tag) {
        this.scores = _.without(this.scores, _.findWhere(this.scores, {
            label: tag
        }));
        $rootScope.$broadcast('visualizeTags', {
            scores: this.scores
        });
        $rootScope.$broadcast('visualize', {});
    };

    this.addScoresForSubject = function (subject) {
        var self = this;
        ApiService.getScoresBySubject(subject).then(function (scores) {
            self.scores.push(scores);
            $rootScope.$broadcast('visualizeTags', {
                scores: self.scores
            });
            $rootScope.$broadcast('visualize', {});
        });
    };

    this.removeScoresForSubject = function (subject) {
        this.scores = _.without(this.scores, _.findWhere(this.scores, {
            label: subject
        }));
        $rootScope.$broadcast('visualizeTags', {
            scores: this.scores
        });
        $rootScope.$broadcast('visualize', {});
    };

    // Provides the list of all subjects that are mentioned in
    // analyses. If the object has not been intialized, it queries
    // the db.
//    this.subjects = null;
    this.getSubjects = function () {
        var deferred = $q.defer();
        
        var self = this;

//        if (this.subjects != null) {
//            deferred.resolve(this.subjects);
//        } else {
            ApiService.getSubjects().then(function (subjects) {
                self.subjects = subjects;
                deferred.resolve(subjects);
            });
//        }
        
        return deferred.promise;
    }
    
    
    // Sets the global thresholds and notifies all directives about
    // it's change. The values needs to be between 0 and 1.
    this.setThresholds = function(min,max){
        
        if((min!=null)&&(min>=0)&&(min<=1)){
            this.thresholds.min = min;
        } else{
            console.log("Value " + min + " for MIN threshold invalid. ");
        }
        
        if((max!=null)&&(max>=0)&&(max<=1)){
            this.thresholds.max = max;
        } else{
            console.log("Value " + max + " for MAX threshold invalid. ")
        }
        
        $rootScope.$broadcast('visualize', {});
    }


}]);
