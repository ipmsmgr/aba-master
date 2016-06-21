var Q = require('q');

var MetricsController = require('./MetricsController');

// Calculates aggregate scores for sets of analyses. This is needed when representing
// a set of analyses, such as all analyses tagged "tweets" or all analyses from "John Doe"

AggregateController = function () {};

// Takes a set of analyses and computes an aggregate for each score.
AggregateController.prototype.computeAggregate = function (label, analyses) {


    var metrics = MetricsController.flatmetrics;

//    console.log(analyses.length + " analyses to flatten...");

    // Flatten the profile tree for all categories
    for (var i = 0; i < analyses.length; i++) {
        var analysis = analyses[i];
        analysis.scores = flattenScores(analysis, metrics);
    }

    console.log("Done flattening...");

    // Collect values based on tag
    var aggregate = {};
    for (var i = 0; i < metrics.length; i++) {
        var key = metrics[i];
        aggregate[key] = {
            values: []
        };

        for (var k = 0; k < analyses.length; k++) {
            aggregate[key].values.push(analyses[k].scores[key]);
        }
    }


    // Calculate aggregates
    for (key in aggregate) {
        var total = 0;
        for (var i = 0; i < aggregate[key].values.length; i++) {
            total += aggregate[key].values[i];
        }
        aggregate[key].total = total

        // Catch null values
        if (analyses.length <= 0) {
            aggregate[key].avg = 0.5
        } else {
            aggregate[key].avg = total / analyses.length;
        }
    }


    return {
        label: label,
        scores: aggregate
    };



};

/**
 * Takes all the scores and creates a flat 
 * object that lists the scores without hierarchy.
 **/
var flattenScores = function (analysis, metrics) {
    // Collect the scores for each of the keys
    var flat = {};
    for (var i = 0; i < metrics.length; i++) {
        var metricId = metrics[i];
        flat[metricId] = getScoreById(analysis, metricId);
    }
    return flat;
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






module.exports = new AggregateController();
