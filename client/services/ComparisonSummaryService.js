/*jslint browser: true, devel: true, node: true, plusplus: true, vars: true*/
/*global angular */
'use strict';

angular.module('pi').service('ComparisonSummaryService', ['DataService', 'SummaryService', function (DataService, SummaryService) {

    console.log("ComaprisonSummaryService main");
    var backgroundAnalyses,
        focusHighAttribs = null,
        focusLowAttribs = null,
        focusSimilarAttribs = null,
        focusCompSummary,
        compileComparisonText,
        compareFocusBackground,
        addHighAttrib,
        addLowAttrib,
        addSimilarAttrib,
        doCompare;

//        aggregateProfile = DataService.getAggregates(),
//        allAnalyses = DataService.analyses,
//        focusAnalysis = DataService.analysis, // === allAnalyses[0]

    this.getAggregateSummary = function (aggregateProfile) {
        return SummaryService.getSummary(aggregateProfile);
    };

    compareFocusBackground = function (attribKey, backgroundProfile, focusAnalysis) {
        var epsilon = 0.1,
            fscore = focusAnalysis.scores[attribKey].avg,
            bscore = backgroundProfile.scores[attribKey],
            //change e.g. "Achievement striving", to "Achievement-striving"
            safeKey = attribKey.replace(/ /g, '-')
        if (attribDescriptions.hasOwnProperty(safeKey)) {
            if (fscore - epsilon > bscore) {
                addHighAttrib(safeKey);
            } else if (bscore - epsilon > fscore) {
                addLowAttrib(safeKey);
            } else {
                addSimilarAttrib(safeKey);
            }
        } else {
            // fires a lot
            //console.log("no text description for attribKey " + safeKey);
        }
    };

    compileComparisonText = function (focusAnalysis) {
        var focusCompSummary = "",
            focusCompSummaryPrefix = "The language in personality snapshot " + focusAnalysis.label;
        
        if (focusHighAttribs) {
            focusCompSummary += focusCompSummaryPrefix;
            focusCompSummary += focusHighAttribs;
            focusCompSummary += "\n";
        }
        if (focusLowAttribs) {
            focusCompSummary += focusCompSummaryPrefix;
            focusCompSummary += focusLowAttribs;
//            focusCompSummary += "\n";
        }
//        if (focusSimilarAttribs) {
//            focusCompSummary += focusCompSummaryPrefix;
//            focusCompSummary += focusSimilarAttribs;
//        }
        return focusCompSummary;
    };
    
    this.getComparisonSummary = function (backgroundProfile, focusAnalysis) {
        var i,
            attribKey;

        for (attribKey in focusAnalysis.scores) {
            if (focusAnalysis.scores.hasOwnProperty(attribKey)) {
                compareFocusBackground(attribKey, backgroundProfile, focusAnalysis);
            }
        }
        return compileComparisonText(focusAnalysis);
    };

    addHighAttrib = function (attribKey) {
        
        if (focusHighAttribs === null) {
            focusHighAttribs = " differs from the background personality snapshots suggesting higher:\n";
        }
        focusHighAttribs += attribDescriptions[attribKey] + "\n";
    };
    
    addLowAttrib = function (attribKey) {
        if (focusLowAttribs === null) {
            focusLowAttribs = " differs from the background personality snapshots suggesting lower:\n";
        }
        focusLowAttribs += attribDescriptions[attribKey] + "\n";
    };
    
    addSimilarAttrib = function (attribKey) {
        if (focusSimilarAttribs === null) {
            focusSimilarAttribs = " is consistent with the background personality snapshots suggesting similar:\n";
        }
        focusSimilarAttribs += attribDescriptions[attribKey];
        focusSimilarAttribs += "\n";
    };
    

    var attribDescriptions = {
        Friendliness: "inclination to make friends with others",
        Gregariousness: "desire for the company of others",
        Assertiveness: "tendency to take charge of situations",
        "Activity-level": "inclination toward a fast-paced, busy schedule",
        "Excitement-seeking": "desire for excitement",
        Cheerfulness: "cheerfulness",
        Trust: "willingness to trust others",
        Cooperation: "willingness to accommodate others",
        Altruism: "willingness to helping others",
        Morality: "willingness to take advantage of others",
        Modesty: "discomfort being the center of attention",
        Sympathy: "empathy with others",
        "Self-efficacy": "confidence in their own abilities",
        Orderliness: "need for structure in their life",
        Dutifulness: "tendency to take rules and obligations seriously",
        "Achievement-striving": "inclination to set and achieve ambitious goals",
        "Self-discipline": "inclination to take on and complete difficult tasks",
        Cautiousness: "tendency to carefully think through decisions before acting",
        Anxiety: "tendency to worry about things that might happen",
        Anger: "tendency to get angry",
        Depression: "tendency to focus on things they are unhappy about",
        "Self-consciousness": "tendency to think about others opinion of them",
        Immoderation: "inclination to be tempted by their desires",
        Vulnerability: "tendency to be overwhelmed in stressful situations",
        Imagination: "imaginativity",
        "Artistic-interests": "inclination to seek out creative or artistic experiences",
        Emotionality: "awareness of their feelings and ability to express them",
        Adventurousness: "inclination to seek out new experiences",
        Intellect: "desire to explore new ideas",
        Liberalism: "inclination to challenge authority or traditional values to bring about positive change"
    };

}]);
