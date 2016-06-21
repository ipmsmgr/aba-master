'use strict';

angular.module('pi.import', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/import', {
        templateUrl: 'pages/import/Import.html',
        controller: 'ImportCtrl'
    });
}])

.controller('ImportCtrl', ['$scope', '$location', 'StateService', 'ApiService', 'TagService', 'DataService',  function ($scope, $location, StateService, ApiService, TagService, DataService) {


    $scope.state = StateService;
    $scope.states = StateService.states;

            $scope.state = StateService;
        $scope.states = StateService.states;

        $scope.analysisTags = [];

        var init = function () {
            TagService.getTagObj().then(function (tagObj) {
                $scope.tags = tagObj;
            })
        };
        init();

        // Ties the selected files to the scope variable holding file information
        $scope.uploadFiles = function (files) {
            $scope.files = files;
        };

        $scope.extractAndAnalyze = function () {
            // Send documents to server for text extraction and analysis
            ApiService.extractAndAnalyze($scope.files).then(function (analyses) {
                $scope.$emit('analysisComplete', {
                    analyses: analyses
                });
                
                // Route back to the splash page unless a subject was loaded
                if(($scope.files.length)&&($scope.files[0].subject)){
                    $location.path("/subject/" + $scope.files[0].subject);
                } else if ((DataService.subject) && (DataService.subject.id)){
                    $location.path("/subject/"+DataService.subject.id);
                } else {
                    $location.path("/splash");
                }
            });
        }

        $scope.toggleCategory = function (sc) {
            sc.toggle();
        };

        $scope.addTag = function (tag) {
            // Add tag if it isn't yet in the list
            if ($scope.analysisTags.indexOf(tag.label) < 0) {
                $scope.analysisTags.push(tag.label);
            }

        };

        $scope.addTagToDocs = function (tag) {

            for (var i = 0; i < $scope.files.length; i++) {
                var f = $scope.files[i];
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

        $scope.getTagLabel = function (tagId) {
            return TagService.getTagLabel(tagId);
        }

        $scope.getLabelFromFileName = function (fileName) {
            return fileName.replace(/\..+$/, '').replace("_", " ").replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
        
        $scope.reset = function(){
            $scope.files = [];
        }
        
        // Sets the subject id for each file to the current subject
        // if one is selected.
        $scope.getCurrentSubject = function(){
            if (DataService.subject && DataService.subject.id){
                return DataService.subject.id;
            } else {
                return ""
            }
        };
    
    $scope.enableAnalyze = function(){
        
        // Disable button if no files 
        // have been selected
        if ($scope.files.length<=0){
            return false;
        }
        
        // If either label or subject is not set for
        // one or more of the selected files, we'll disable
        // the anlayze button
        for(var i=0;i<$scope.files.length;i++){
            var f = $scope.files[i];
            if(!f.label || !f.label.length || !f.subject || !f.subject.length){
                return false;
            }
        }
        
        return true;
    }

    var init = function () {
        $scope.files = [];
        $scope.state.set($scope.states.selectDocs);
    };
    init();


}]);
