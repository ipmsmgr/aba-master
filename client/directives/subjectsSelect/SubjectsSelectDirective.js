'use strict';

angular.module('pi').directive('piSubjectsSelect', ['$location','TagService', 'DataService', 'StateService', function ($location,TagService, DataService, StateService) {

    function linkFunction(scope, iElement, iAttrs, ctrl) {
        
        scope.subjects = [];
        
        var init = function(){
            // Pull the entire tag tree fromt the DB
                
            // Pull a list of subjects
            DataService.getSubjects().then(function(subjects){
                scope.subjects = [];

                for(var i=0;i<subjects.length;i++){
                    scope.subjects.push({name:subjects[i]})
                }
            })
        };
        init();


        
        scope.toggleSubject = function(subject){
            subject.selected = !subject.selected
            if(subject.selected){
                DataService.addScoresForSubject(subject.name);
            } else {
                DataService.removeScoresForSubject(subject.name);
            }
        };
        
        scope.goToSubject = function(subject){
             $location.path("/subject/"+subject);
        }


    }


    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'directives/subjectsSelect/SubjectsSelectTemplate.html',
        link: linkFunction
    }
}]);
