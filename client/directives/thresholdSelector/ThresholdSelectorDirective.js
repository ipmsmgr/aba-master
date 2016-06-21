'use strict';

angular.module('pi').directive('piThresholdSelector', ['DataService', function (DataService) {

    function linkFunction(scope, iElement, iAttrs, ctrl) {
        
        scope.steps = [];
        
        
        // Sets the threshold.
        scope.selectThreshold = function(step){
            
            // Clear all steps
            for(var i=0;i<scope.steps.length;i++){
                scope.steps[i].selected = false;
            }
            
            // Set the selected
            step.selected=true;
            
            // Apply change to shared Data Service
            DataService.setThresholds((step.min/100),(step.max/100));
        }       
        
        
        function init(){
            
            // Add step configuration
            scope.steps.push({min:10,max:90});
            scope.steps.push({min:20,max:80,selected:true});
            scope.steps.push({min:30,max:70});
            scope.steps.push({min:40,max:60});
            scope.steps.push({min:50,max:50});

            // Set the appropriate step based on thresholds
            scope.selectThreshold(scope.steps[2]);
        }
        init();
        


    }


    return {
        restrict: 'EA',
        replace: true,
        scope: {},
        templateUrl: 'directives/thresholdSelector/ThresholdSelectorTemplate.html',
        link: linkFunction
    }
}]);
