'use strict';

angular.module('pi').directive('piTags', ['$location','TagService', 'DataService', 'StateService', function ($location,TagService, DataService, StateService) {

    function linkFunction(scope, iElement, iAttrs, ctrl) {
        
        scope.tags2 = {};
        scope.subjects = [];
        
        var init = function(){
            // Pull the entire tag tree fromt the DB
            TagService.getTagObj().then(function(tags){
                scope.tags2 = tags;
                
                // Pull a list of subjects
                DataService.getSubjects().then(function(subjects){
                    scope.subjects = [];
                    
                    for(var i=0;i<subjects.length;i++){
                        scope.subjects.push({name:subjects[i]})
                    }
                });
                
                // Collapse all categories initially
                for(var i=0;i<scope.tags2.length;i++){
                    scope.tags2[i].collapsed = true;
                }
                
                if ((!StateService.subject) || (!StateService.subject.id)){
                    setDefaults(scope.tags2);
                    //for(var i=0;i<scope.tags2.length;i++){
                        scope.tags2[0].collapsed = false;
                    //}
                } else {
                    
                }
            })
        };
        init();

        
        var setDefaults = function(tags){
           // scope.toggleTag(tags[0].tags[3]);    
        }
        
        scope.updateTags = function(){
            ApiService.tags.updateTags(scope.tags).then(function(tags){
               // Nothig to to do here.
            });
        }
        
        scope.toggleTag = function(tag){
            tag.selected = !tag.selected
            if(tag.selected){
                DataService.addScoresForTag(tag.label);
            } else {
                DataService.removeScoresForTag(tag.label);
            }
        };
        
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
        templateUrl: 'directives/tags/TagsTemplate.html',
        link: linkFunction
    }
}]);
