'use strict';


/**
{"id": "Openness", "name": "Openness", "category": "personality", "percentage": 0.9408021112461741, "sampling_error": 0.0467607752, "children": []}
**/

angular.module('pi').directive('piSliderScore', ['$compile', 'TooltipService', function ($compile, TooltipService) {
    
    function linkFunction(scope, iElement, iAttrs, ctrl){
        
        scope.limit = 3;
        scope.sliderLimit = 3;
        scope.tooltips = TooltipService;
        
    }
    
    
  return {
    restrict: 'E',
    replace: true,
      scope: {
        score: '=',
        expanded: '='
      },      
  templateUrl: 'directives/sliderscore/SliderScoreTemplate.html',
    link: linkFunction
  }
}]);