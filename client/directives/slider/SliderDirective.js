'use strict';

angular.module('pi').directive('piSlider', ['DataService',function (DataService) {

    function linkFunction(scope, iElement, iAttrs, ctrl) {

        console.log("initializing slider...");

        scope.limit = 3;
        scope.sliderLimit = 3;


        scope.$on('visualize', function (event, args) {
            scope.showChart(args.analysis);
        });

        scope.showChart = function (analysis) {
            if(analysis == null){
                return;
            }
            
            scope.profile  = analysis.profile;
            loadOutput(analysis.profile);
        }


        function changeProfileLabels(data) {
             var clonned = angular.copy(data,clonned);
            //var clonned =JSON.parse(JSON.stringify(data));
                var replacements = replacementsForLang(OUTPUT_LANG);

            function walkTree(f, tree) {
                f(tree);
                if (tree.children) {
                    tree.children.forEach(walkTree.bind(this, f));
                }
            }

            walkTree(function (node) {
                if (node.id && replacements[node.id.replace('_parent', '')]) {
                    node.name = replacements[node.id.replace('_parent', '')];
                }
            }, clonned.tree);

            return clonned;
        }



        function loadOutput(rawData) {

            var data = changeProfileLabels(rawData);
            //TODO implement text summary setTextSummary(data, 'en');
            loadWordCount(data);
            var big5Data = data.tree.children[0].children[0].children;
            var needsData = data.tree.children[1].children[0].children;
            var valuesData = data.tree.children[2].children[0].children;

//            var statsPercent_template = outputStatsPercentTemplate.innerHTML;
//            var big5_template = big5PercentTemplate.innerHTML;

            var big5Data_curated = big5Data.map(function (obj) {
                var newObj = {};
                newObj.name = obj.name;
                newObj.id = obj.id;
                newObj.score = Math.round(obj.percentage * 100);
                newObj.children = obj.children.map(function (obj2) {
                    var newObj2 = {};
                    newObj2.name = obj2.name;
                    newObj2.id = obj2.id;
                    newObj2.score = Math.round(obj2.percentage * 100);
                    return newObj2;
                }).sort(function (a, b) {
                    return b.score - a.score;
                });
                return newObj;
            });

            var needsData_curated = needsData.map(function (obj) {
                var newObj = {};
                newObj.id = obj.id;
                newObj.name = obj.name;
                newObj.score = Math.round(obj.percentage * 100);
                return newObj;
            });

            var valuesData_curated = valuesData.map(function (obj) {
                var newObj = {};
                newObj.id = obj.id;
                newObj.name = obj.name;
                newObj.score = Math.round(obj.percentage * 100);
                return newObj;
            });

            function mapObject(o, f) {
                var u = {};
                Object.keys(o).forEach(function (key) {
                    u[key] = f(key, o[key]);
                });
                return u;
            }

            function toHtml(markdownDict) {
                return mapObject(markdownDict, function (key, value) {
                    return renderMarkdown(value);
                });
            }


            postSunburst(rawData);

        }



        function replacementsForLang(lang) {


            var replacements = {
                'en': {
                    'Extraversion': 'Introversion/Extraversion',
                    'Outgoing': 'Warmth',
                    'Uncompromising': 'Straightforwardness',
                    'Immoderation': 'Impulsiveness',
                    'Susceptible to stress': 'Sensitivity to stress',
                    'Conservation': 'Tradition',
                    'Openness to change': 'Stimulation',
                    'Hedonism': 'Taking pleasure in life',
                    'Self-enhancement': 'Achievement',
                    'Self-transcendence': 'Helping others'
                }
            };

            return replacements[lang || 'en'] || {};
        }


        function loadWordCount(data) {
            $('.output--word-count-number').text(data.word_count);
            $('.output--word-count-message').removeClass('show');
            if (data.word_count > 6000)
                $('.output--word-count-message_VERY-STRONG').addClass('show');
            else if (data.word_count <= 6000 && data.word_count >= 3500)
                $('.output--word-count-message_STRONG').addClass('show');
            else if (data.word_count < 3500 && data.word_count >= 1500)
                $('.output--word-count-message_DECENT').addClass('show');
            else
                $('.output--word-count-message_WEAK').addClass('show');
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



    }


    return {
        restrict: 'EA',
        scope: {
            analysis: '='
        },
        templateUrl: 'directives/slider/SliderTemplate.html',
        link: linkFunction
    }
}]);
