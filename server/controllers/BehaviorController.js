"use strict";

//require("./Behavior.js");



var BehaviorController = function() {};


        BehaviorController.prototype.isPositive = function(behavior) {
            return behavior.score > 0.60;
        }

        BehaviorController.prototype.isNegative = function(behavior) {
            return behavior.score < 0.40;
        }

        BehaviorController.prototype.top3 = function(behavior, index) {
            return index < 3;
        }

        BehaviorController.prototype.sortScores = function(obj1, obj2) {
            return obj2.score - obj1.score;
        }

        BehaviorController.prototype.sortScoresDESC = function(obj1, obj2) {
            return obj2.score - obj1.score;
        }

        BehaviorController.prototype.sortScoresASC = function(obj1, obj2) {
            return obj1.score - obj2.score;
        }


        BehaviorController.prototype.getUniqueBehaviorsFor = function(profile) {

            var found = {};
            var behaviors = getBehaviorsFor(profile).filter(function (b) {
                var hold = false;
                if (!found[b.name]) {
                    found[b.name] = true;
                    hold = true;
                }
                return hold;
            });
            return behaviors;
        }

        BehaviorController.prototype.getBehaviorsFor = function(profile) {
            

            
            var targets = Resources.scenarios.targets,
                scenarios = Resources.scenarios.scenarios,
                _profile = new Profile(profile);
            return matchingScenarios(targets, scenarios, _profile).map(function (scenarioMatching) {
                var scenarioInfo = getScenarioInfo('scenarios', scenarioMatching.scenario);
                return {
                    name: scenarioInfo.verb,
                    score: scenarioMatching.score,
                    tooltip: renderMarkdown(scenarioInfo.tooltip)
                };
            });
        };


        BehaviorController.prototype.testScenario = function(scenario, premise, predicate) {
            return scenario.traits.reduce(predicate, premise);
        }

        BehaviorController.prototype.byId = function(xs, id) {
            return xs.filter(function (x) {
                return x.id === id;
            })[0];
        }

        BehaviorController.prototype.inThreshold = function(threshold, value) {
            return value >= threshold.min && value <= threshold.max;
        }

        BehaviorController.prototype.toScoringFunction = function(target) {
            return function (p) {
                return eval(target.score);
            };
        }

        BehaviorController.prototype.targetTraitScore = function(targets, id, trait) {
            return toScoringFunction(byId(targets, id))(trait.percentage);
        }

        BehaviorController.prototype.scenarioScore = function(profile, scenario, targets) {
            return (testScenario(scenario, 0, function (acc, trait) {
                return acc + targetTraitScore(targets, trait.target, profile.getTrait(trait.id));
            }) / scenario.traits.length);
        }

        BehaviorController.prototype.matchingScenarios = function(targets, scenarios, profile) {
            return scenarios.map(function (scenario) {
                return {
                    score: scenarioScore(profile, scenario, targets),
                    scenario: scenario
                }
            });
        }

        BehaviorController.prototype.getScenarioInfo = function(category, scenario) {
            var scenarioInfo = Resources.names.get(category)
                .filter(function (otherScenario) {
                    return otherScenario.id == scenario.id;
                })[0];

            return scenarioInfo;
        }



BehaviorController.prototype.loadBehaviors = function(profile) {
    
    
   
    var behaviors = this.getUniqueBehaviorsFor(profile);

    var likely   = behaviors.filter(this.isPositive),
    var unlikely = "";//behaviors.filter(isNegative);


    if (likely.length > 0) {
      promise.push(likely.sort(sortScoresDESC).filter(top3));    
    }

    if (unlikely.length > 0) {
      promise.push(unlikely.sort(sortScoresASC).filter(top3));      
    }
    
    return {likely: likely, unlikely:unlikely};
}



module.exports = new BehaviorController();