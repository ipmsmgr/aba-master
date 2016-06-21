'use strict';

angular.module('pi').service('ChartDataService', ['MetricService', function (MetricService) {

 this.getAggregates = function(subjectAnalyses,tagAnalyses){
        
        // This gives us an object where the keys are the
        // metric IDs and the values are a list of values
        // from the selected analyses.
        var values = getMetricValues(subjectAnalyses,tagAnalyses);
        
        var aggregates = [];
        
        // Create new object where we not only store the values
        // but all the aggregates we will be computing
        for(var key in values){
            aggregates.push({key:key, values:values[key]});
        }
        
        // Now we add the aggregate values.
        for(var i=0; i<aggregates.length;i++){
            var key = aggregates[i].key;
            aggregates[i].variance = getVariance(values[key]);
            aggregates[i].average = getAverage(values[key]);
        }
        
        
        //console.log(JSON.stringify(aggregates));
        return aggregates;
        
    }
    
    var getMetricValues = function (subjectAnalyses,tagAnalyses) {
        
        if(subjectAnalyses == null) return;

        var scores = {};
        
        var keys = MetricService.getFlatMetrics();
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i].id;
            scores[key] = [];
            for (var k = 0; k < subjectAnalyses.length; k++) {
                scores[key].push(getScoreById(subjectAnalyses[k],key));
            }
            for (var k = 0; k < tagAnalyses.length; k++) {
                try{
                scores[key].push(tagAnalyses[k].scores[key].avg);
                } catch (err){}
            }
        }
        return scores;
    }
    
    
    var getVariance = function(values){
        var min = null;
        var max = null;
        for(var i=0;i<values.length;i++){
            if((min==null)||(values[i]<min)) min=values[i];
            if((max==null)||(values[i]>max)) max=values[i];
        }
        return max-min;
    }
    
    var getAverage = function(values){
        
        // Avoid DIV by zero exception
        if (values.length == 0) return 0;
        
        var total = 0;
        for(var i=0;i<values.length;i++){
            total += values[i];
        }
        
        return total / values.length;
    };
    
    }]);