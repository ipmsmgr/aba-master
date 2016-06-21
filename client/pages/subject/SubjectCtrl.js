'use strict';

angular.module('pi.subject', ['ngRoute'])

.config(['$routeProvider', function($routeProvider, $routeParams) {
  $routeProvider.when('/subject/:subjectId', {
    templateUrl: 'pages/subject/Subject.html',
    controller: 'SubjectCtrl'
  });
    
$routeProvider.when('/explore', {
    templateUrl: 'pages/subject/Subject.html',
    controller: 'SubjectCtrl'
  });
}])

.controller('SubjectCtrl', ['$scope', '$rootScope', '$timeout', '$routeParams', '$location', 'Upload', 'ApiService', 'StateService', 'Resources', 'TagService', 'DataService', 'SummaryService', function($scope, $rootScope, $timeout, $routeParams, $location, Upload, ApiService, StateService, Resources, TagService, DataService, SummaryService) {
    
    
    $scope.output = null;
    $scope.showUploadContainer = false;
    $scope.showText = false;
    $scope.analyses = [];
    $scope.selectMultiple = false;
    $scope.analysisLabel = null;
    $scope.behaviors = {};

    $scope.state = StateService;
    $scope.states = StateService.states;
    $scope.panels = StateService.panels;
    
    $scope.tagObj = {};
    
    
    //Range slider config
    
    $scope.slider = {
        value: 10,//Math.abs((DataService.thresholds.max*100)-50),
        options: {
            step: 5,
            floor: 0,
            ceil: 50,
            onChange: function() {
                var min = (50-$scope.slider.value) / 100;
                var max = (50+$scope.slider.value) / 100;
                DataService.setThresholds(min,max);
            },
            showTicks: true,
            translate: function(value, sliderId, label) {
              switch (label) {
                case 'model':
                  return '' + (50-value) + '%'+ ' - ' + (50+value) + '%';
                case 'ceil':
                    return ''  
                default:
                  return value + '%';
              }
            }
        }
    };
    
    
    
//    $scope.slider2 = {
//        minValue: DataService.thresholds.min*100,
//        maxValue: DataService.thresholds.max*100,
//        options: {
//            floor: 0,
//            ceil: 100,
//            step: 1,
//            onEnd: function(id) {
//                console.log($scope.slider.minValue + ' to ' + $scope.slider.maxValue); // logs 'on end slider-id'
//                DataService.thresholds.min = $scope.slider.minValue / 100;
//                DataService.thresholds.max = $scope.slider.maxValue / 100;
//                var summary = SummaryService.getSummary($scope.analysis.profile);
//                $scope.analysis.summary = {text: summary,lines:summary.split("\n")};
//                $scope.analysis.summaryDetails = SummaryService.getSummaryDetails($scope.analysis.profile);
//                $rootScope.$broadcast('visualize',{});
//            },
//            onChange: function (id, min, max) {
//              if(min!=(DataService.thresholds.min*100)){
//                 // Min changed. Make the max slider match min.
//                $scope.slider.maxValue = 50 + Math.abs(min-50);
//              } else{
//                // Max changed. Make min match the max slider.
//                $scope.slider.minValue = Math.abs(max-100);
//               }
//            },
//            translate: function(value, sliderId, label) {
//              switch (label) {
//                case 'model':
//                  return '<b>Min:</b> ' + value + '%';
//                case 'high':
//                  return '<b>Max:</b> ' + value + '%';
//                default:
//                  return value + '%';
//              }
//            },
//            draggableRange: true
//        }
//    };
    
    //$scope.temp = {min:$scope.slider.minValue,max:$scope.slider.maxValue};
    
    
    
    $scope.thresholds = DataService.thresholds;
    
    $scope.setThresholds = function(){
        $rootScope.$broadcast('visualize',{});
    }



    $scope.$on('analysisComplete', function (event, args) {

        // Update the subject object with the new analysis.
        $scope.analyses = $scope.analyses.concat(args.analyses);

        // Select the analysis that was just produced
        var latest = $scope.getLatestAnalysis();
        $scope.selectAnalysis(latest);

        // Reset analysis label
        $scope.analysisLabel = null;

        //        $rootScope.state = $rootScope.states.single;
        StateService.set(StateService.states.single)
    });

    $scope.saveProfile = function () {

        // Send documents to server and display analysis results
        ApiService.saveProfile($scope.subjectId, $scope.profile).then(function () {
            console.log('Successfully saved!')
        });
    }



    // Loads the information about the subject after
    // the user entered the subject ID and clicked "Load Subject"
    $scope.loadSubject = function (subjectId) {
        
        $scope.subjectId = subjectId;
        DataService.subject = {id:subjectId,analyses:[]};
        
        ApiService.loadSubject(subjectId).then(function (analyses) {

            $scope.analyses = analyses;
            DataService.subject.analyses = analyses;

            if ($scope.analyses.length <= 0) {
                StateService.set(StateService.states.selectDocs)
            } else {

                // Select the last analysis
                var latest = $scope.getLatestAnalysis();
                $scope.addRemoveAnalysis(latest, true);
            }
        });
    };

    $scope.newAnalysis = function () {
        $location.path("/import");
    };

    $scope.getLatestAnalysis = function () {
        return $scope.analyses[$scope.analyses.length - 1];
    }

    $scope.selectAnalysis = function (analysis) {



        // If no analysis clear the scope variable
        if (analysis == null) {
            $scope.analysis = null;
            DataService.analysis = null;
            $rootScope.$broadcast('visualize', {
                profile: null,
                analysis: null
            });
            return;
        }


        analysis.selected = true;
        $scope.analysis = analysis;
        DataService.analysis = analysis;
        
        // Derive summary from profile
        var summary = SummaryService.getSummary($scope.analysis.profile);
        $scope.analysis.summary = {text: summary,lines:summary.split("\n")};
        $scope.analysis.summaryDetails = SummaryService.getSummaryDetails($scope.analysis.profile);
        
        $rootScope.$broadcast('visualize', {
            profile: analysis.profile,
            analysis: analysis
        });
    }

    $scope.generateReport = function (analysis) {
        var elements = {};
        
        elements["subject"] = DataService.subject.id;
        elements["source"] = analysis.source;
        if ($scope.panels.tags){
            elements["barchart"] = getBarchart();
        }
        elements["summary"] = analysis.summary.text;
        elements["behaviors"] = $scope.behaviors;
        
        ApiService.generateReport(analysis, elements);
    };

    $scope.export = function (analysis) {
        ApiService.export(analysis);
    };

    $scope.toggle = function (analysis) {

        // If we are in single-select mode,
        // we only show the one that was just clicked on
        if (!$scope.selectMultiple) {
            $scope.deselectAll();
            $scope.addRemoveAnalysis(analysis, true);
        } else {

            if (analysis.selected) {
                $scope.addRemoveAnalysis(analysis, false);
            } else {
                $scope.addRemoveAnalysis(analysis, true);
            }
        }

    };

    // Generates an array of selected analysis from the set
    // of all analyses that have been marked as selected.
    // That ensures consistency between the two.
    var getSelectedAnalyses = function () {

        var analyses = [];

        for (var i = 0; i < $scope.analyses.length; i++) {
            if ($scope.analyses[i].selected) {
                analyses.push($scope.analyses[i])
            }
        }

        analyses = _.sortBy(analyses, function(analysis){ return analysis.date; });
        return analyses;
    }

    $scope.multiSelectClick = function () {
        $scope.selectMultiple = !$scope.selectMultiple;
        if (!$scope.selectMultiple) {
            var selectedAnalyses = getSelectedAnalyses();
            if (getSelectedAnalyses().length >= 1) {
                // Re-select one analysis
                var temp = $scope.analyses[0];
                $scope.deselectAll();
                $scope.selectAnalysis(temp);
                StateService.set(StateService.states.single)
            }
        }
    }


    $scope.deselectAll = function () {
        for (var i = 0; i < $scope.analyses.length; i++) {
            $scope.analyses[i].selected = false;
        }
    };

    $scope.addRemoveAnalysis = function (analysis, add) {

        if (analysis == null) return;

        if (!add) {
            analysis.selected = false;
        } else {
            // .. otherwise, add it
            analysis.selected = true;
        }

        var analyses = getSelectedAnalyses();

        DataService.analyses = analyses;
        
        if (analyses.length > 1) {
            // De-select the analysis
            $scope.selectAnalysis(null);
            $scope.state.set($scope.states.comparison);
            $rootScope.$broadcast('visualize', {
                analyses: analyses
            });
        } else if (analyses.length == 1) {
            // Select the only analysis that is checked
            $scope.selectAnalysis(analyses[0]);
            //        $rootScope.state = $rootScope.states.single;
            StateService.set(StateService.states.single)
            $rootScope.$broadcast('visualize', {
                profile: analyses[0].profile,
                analysis: analyses[0]
            });
        }
    };



    // Gets serialized image of barchart
    var getBarchart = function(){
        
        // Adjust size of graph
//        var width = $('#barchartContainer').width();
//        d3.select('svg').style('width','500px')
        
//        $timeout( function(){  
//            $rootScope.$broadcast('visualize', {});
        
        canvg('barchart_canvas', $('#barchart').html());
        var canvas = document.getElementById('barchart_canvas'); 
        
        return canvas.toDataURL();
//        }, 1500);
        //$('#barchartContainer').width(540);
       
        
        // Reset chart width
        //$('#barchartContainer').width(width);
        //$rootScope.$broadcast('visualize', {});
        
        
        //return canvas.toDataURL();
    }


    function removeHidden(d) {
        d.scenarios = d.scenarios.filter(function (s) {
            return !s.hidden;
        });
        return d;
    }

    $scope.reset = function () {
        $scope.subject = null;
        DataService.subject = null;
        $scope.analysis = null;
        DataService.analysis = null;
        $scope.analyses = [];
        $scope.text = null;
        $scope.analysisLabel = null;
        $scope.userId = null;
        //    $rootScope.state = $rootScope.states.loadSubject;
        StateService.set(StateService.states.loadSubject)
        
        $location.path("/splash");
    }





    $scope.getTagLabel = function (tagId) {
        return TagService.getTagLabel(tagId);
    }


    $scope.getAnalysesByCategory = function (category) {
        ApiService.getAnalysesByCategory(category).then(function(data){
                        $rootScope.$broadcast('visualizeTags', {
                scores: data,
                            analyses:$scope.analyses
            });
        });
    }
    
    
    
        var init = function(){
        TagService.getTagObj().then(function(tagObj){
            $scope.tagObj = tagObj;
        });
        
        if ($routeParams.subjectId){
            $scope.loadSubject($routeParams.subjectId);
        }
    }
    init();

    
    
}]);