'use strict';

angular.module('pi').service('ChartDataService', [function () {


    var keys = ["Achievement striving", "Adventurousness", "Anger", "Artistic interests", "Cautiousness", "Cheerfulness", "Conscientiousness", "Cooperation", "Depression", "Emotionality", "Excitement-seeking", "Harmony", "Ideal", "Imagination", "Intellect", "Liberty", "Modesty", "Neuroticism", "Openness", "Openness to change", "Practicality", "Self-discipline", "Self-enhancement", "Self-transcendence", "Stability", "Trust", "Sympathy", "Vulnerability", "Liberalism", "Dutifulness", "Orderliness", "Self-efficacy", "Activity level", "Assertiveness", "Friendliness", "Gregariousness", "Altruism", "Uncompromising", "Anxiety", "Fiery", "Melancholy", "Immoderation", "Self-consciousness", "Vulnerability", "Challenge", "Closeness", "Curiosity", "Excitement", "Love", "Self-expression", "Structure", "Conservation", "Hedonism", "Extraversion", "Agreeableness"];

    
    
        /**
     * Takes all the scores and creates a flat 
     * object that lists the scores without hierarchy.
     **/
    this.flattenScores = function (analysis) {
        // Collect the scores for each of the keys
        var flat = {};
        for (var i = 0; i < keys.length; i++) {
            flat[keys[i]] = getScoreById(analysis, keys[i]);
        }
        return flat;
    }
    

    this.getChartData = function (subjectAnalyses, tagAnalyses) {

        // This gives us an object where the keys are the
        // metric IDs and the values are a list of values
        // from the selected analyses.
        var values = getMetricValues(subjectAnalyses, tagAnalyses);

        var aggregates = [];

        // Create new object where we not only store the values
        // but all the aggregates we will be computing
        for (var key in values) {
            aggregates.push({
                key: key,
                values: values[key]
            });
        }

        // Now we add the aggregate values.
        for (var i = 0; i < aggregates.length; i++) {
            var key = aggregates[i].key;
            aggregates[i].variance = getVariance(values[key]);
            aggregates[i].average = getAverage(values[key]);
        }


        //console.log(JSON.stringify(aggregates));
        return aggregates;

    }

    var getMetricValues = function (subjectAnalyses, tagAnalyses) {

        if (subjectAnalyses == null) return;

        var scores = {};

        
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            scores[key] = [];
            for (var k = 0; k < subjectAnalyses.length; k++) {
                scores[key].push(getScoreById(subjectAnalyses[k], key));
            }
            for (var k = 0; k < tagAnalyses.length; k++) {
                try {
                    scores[key].push(tagAnalyses[k].scores[key].avg);
                } catch (err) {}
            }
        }
        return scores;
    }
    
    

    var getScoreById = function (analysis, id) {

        if (analysis == null) {
            return null;
        }

        // If this is the score with the matching ID return its value
        if (('id' in analysis) && (id == analysis.id)) return analysis.percentage;

        // .. otherwise look in it's children
        if ('children' in analysis) {
            for (var i = 0; i < analysis.children.length; i++) {
                var val = getScoreById(analysis.children[i], id);
                if (val) {
                    return val;
                };
            }
        } else {
            if ('profile' in analysis) {
                return getScoreById(analysis.profile.tree, id);
            } else {
                return null;
            }
        }

        return null;
    };


    var getVariance = function (values) {
        var min = null;
        var max = null;
        for (var i = 0; i < values.length; i++) {
            if ((min == null) || (values[i] < min)) min = values[i];
            if ((max == null) || (values[i] > max)) max = values[i];
        }
        return max - min;
    }

    var getAverage = function (values) {

        // Avoid DIV by zero exception
        if (values.length == 0) return 0;

        var total = 0;
        for (var i = 0; i < values.length; i++) {
            total += values[i];
        }

        return total / values.length;
    };


    }]);
