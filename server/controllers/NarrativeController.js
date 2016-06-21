"use strict";

var narrative = require("./Narrative.js");
var dummy = require("./DummyData.js")


var NarrativeController = function() {};

NarrativeController.prototype.summary = function(profile) {
    var analyzer = narrative("en");
    return analyzer.getSummary(profile);
}



module.exports = new NarrativeController();