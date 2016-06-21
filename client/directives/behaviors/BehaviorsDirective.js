'use strict';

angular.module('pi').directive('piBehaviors', ['Resources', 'TooltipService', 'DataService', function (Resources,TooltipService, DataService) {

    function linkFunction(scope, iElement, iAttrs, ctrl) {
        
        
        scope.tooltips = TooltipService;
        scope.tempProfile = null;


        scope.loadBehaviors = function (profile) {

            var behaviors = getUniqueBehaviorsFor(profile);

            scope.behaviors = {};
            scope.behaviors.likely = behaviors.filter(isPositive);
            scope.behaviors.unlikely = behaviors.filter(isNegative);

            if (scope.behaviors.likely.length > 0) {
                scope.behaviors.likely = scope.behaviors.likely.sort(sortScoresDESC).filter(top3);
            }

            if (scope.behaviors.unlikely.length > 0) {
                scope.behaviors.unlikely = scope.behaviors.unlikely.sort(sortScoresASC).filter(top3);
            }
        }





        function isPositive(behavior) {
            return behavior.score > DataService.thresholds.max;
        }

        function isNegative(behavior) {
            return behavior.score < DataService.thresholds.min;
        }

        function top3(behavior, index) {
            return index < 3;
        }

        function sortScores(obj1, obj2) {
            return obj2.score - obj1.score;
        }

        function sortScoresDESC(obj1, obj2) {
            return obj2.score - obj1.score;
        }

        function sortScoresASC(obj1, obj2) {
            return obj1.score - obj2.score;
        }


        function getUniqueBehaviorsFor(profile) {

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

        function getBehaviorsFor(profile) {
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


        function testScenario(scenario, premise, predicate) {
            return scenario.traits.reduce(predicate, premise);
        }

        function byId(xs, id) {
            return xs.filter(function (x) {
                return x.id === id;
            })[0];
        }

        function inThreshold(threshold, value) {
            return value >= threshold.min && value <= threshold.max;
        }

        function toScoringFunction(target) {
            return function (p) {
                return eval(target.score);
            };
        }

        function targetTraitScore(targets, id, trait) {
            
            try{
                return toScoringFunction(byId(targets, id))(trait.percentage);
            }catch(err){
                console.error("Error: "+err + "\n"+JSON.stringify(trait));
                return 0;
            }
            
        }

        function scenarioScore(profile, scenario, targets) {
            return (testScenario(scenario, 0, function (acc, trait) {
                return acc + targetTraitScore(targets, trait.target, profile.getTrait(trait.id));
            }) / scenario.traits.length);
        }

        function matchingScenarios(targets, scenarios, profile) {
            return scenarios.map(function (scenario) {
                return {
                    score: scenarioScore(profile, scenario, targets),
                    scenario: scenario
                }
            });
        }

        function getScenarioInfo(category, scenario) {
            var scenarioInfo = Resources.names.get(category)
                .filter(function (otherScenario) {
                    return otherScenario.id == scenario.id;
                })[0];

            return scenarioInfo;
        }



        // Event handler fired by UI
        scope.$on('visualize', function (event, args) {
            if(args.profile != null){
                scope.tempProfile = args.profile;
                scope.loadBehaviors(args.profile);
            } else if (scope.tempProfile != null){
                scope.loadBehaviors(scope.tempProfile);
            }
        });




    }


    return {
        restrict: 'EA',
        scope: {
            profile: '=',
            behaviors: '='
        },
        replace: true,
        templateUrl: 'directives/behaviors/BehaviorsTemplate.html',
        link: linkFunction
    }
}]);
