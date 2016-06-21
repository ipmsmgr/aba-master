'use strict';

angular.module('pi').directive('piImport', ['$rootScope', 'ApiService', 'StateService', 'TagService', function ($rootScope, ApiService, StateService, TagService) {

    function linkFunction(scope, iElement, iAttrs, ctrl) {


        scope.state = StateService;
        scope.states = StateService.states;

        scope.analysisTags = [];

        var init = function () {
            TagService.getTagObj().then(function (tagObj) {
                scope.tags = tagObj;
            })
        };
        init();

        scope.uploadFiles = function (files) {
            scope.files = files;
        };

        scope.extractText = function () {
            // Send documents to server for text extraction
            ApiService.extractText(scope.files, scope.subjectId).then(function (text) {
                scope.text = text;
                scope.files = [];
                scope.state.set(scope.states.reviewText);
            });
        };


        scope.analyze = function () {

            // Send documents to server and display analysis results
            ApiService.analyze(scope.subjectId, scope.text, scope.analysisLabel, scope.analysisTags).then(function (analysis) {

                scope.$emit('analysisComplete', {
                    analyses: [analysis]
                });

            });
        };

        scope.extractAndAnalyze = function () {
            // Send documents to server for text extraction and analysis
            ApiService.extractAndAnalyze(scope.files).then(function (analyses) {
                scope.$emit('analysisComplete', {
                    analyses: analyses
                });
            });
        }

        scope.toggleCategory = function (sc) {
            sc.toggle();
        };

        scope.addTag = function (tag) {
            // Add tag if it isn't yet in the list
            if (scope.analysisTags.indexOf(tag.label) < 0) {
                scope.analysisTags.push(tag.label);
            }

        };

        scope.addTagToDocs = function (tag) {

            for (var i = 0; i < scope.files.length; i++) {
                var f = scope.files[i];
                if (f.selected) {

                    // Make sure property is there
                    if (f.tags == null) {
                        f.tags = [];
                    }

                    // Add tag if it isn't yet in the list
                    if (f.tags.indexOf(tag.label) < 0) {
                        f.tags.push(tag.label);
                    }
                }
            }

            // tag.selected = !tag.selected;
        };

        scope.getTagLabel = function (tagId) {
            return TagService.getTagLabel(tagId);
        }

        scope.getLabelFromFileName = function (fileName) {
            return fileName.replace(/\..+$/, '').replace("_", " ").replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
    }


    return {
        restrict: 'EA',
        scope: {
            subjectId: '='
        },
        replace: true,
        templateUrl: 'directives/import/ImportTemplate.html',
        link: linkFunction
    }
}]);
