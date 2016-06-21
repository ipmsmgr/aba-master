'use strict';

angular.module('pi').directive('piNarrative', function() {
    
    function linkFunction(scope, iElement, iAttrs, ctrl){
        
      
    }
    
    
  return {
    restrict: 'EA',
    templateUrl: 'directives/narrative/NarrativeTemplate.html',
    link: linkFunction
  }
});