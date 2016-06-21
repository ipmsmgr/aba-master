"use strict";

var MetricsController = function() {};

MetricsController.prototype.flatmetrics = ["Achievement striving", "Adventurousness", "Anger", "Artistic interests", "Cautiousness", "Cheerfulness", "Conscientiousness", "Cooperation", "Depression", "Emotionality", "Excitement-seeking", "Harmony", "Ideal", "Imagination", "Intellect", "Liberty", "Modesty", "Neuroticism", "Openness", "Openness to change", "Practicality", "Self-discipline", "Self-enhancement", "Self-transcendence", "Stability", "Trust", "Sympathy", "Vulnerability", "Liberalism", "Dutifulness", "Orderliness", "Self-efficacy", "Activity level", "Assertiveness", "Friendliness", "Gregariousness", "Altruism", "Uncompromising", "Anxiety", "Fiery", "Melancholy", "Immoderation", "Self-consciousness", "Vulnerability", "Challenge", "Closeness", "Curiosity", "Excitement", "Love", "Self-expression", "Structure", "Conservation", "Hedonism", "Extraversion", "Agreeableness"];


MetricsController.prototype.metrics = [
        {
            "id": "personality",
            "name": "Big 5",
            "children": [
                {
                    "id": "Openness",
                    "name": "Openness",
                    "category": "personality",
                    "children": [
                        {
                            "id": "Adventurousness",
                            "name": "Adventurousness",
                            "category": "personality"
          },
                        {
                            "id": "Artistic interests",
                            "name": "Artistic interests",
                            "category": "personality"
          },
                        {
                            "id": "Emotionality",
                            "name": "Emotionality",
                            "category": "personality",
                            "selected": true
          },
                        {
                            "id": "Imagination",
                            "name": "Imagination",
                            "category": "personality",
                            "selected": true
          },
                        {
                            "id": "Intellect",
                            "name": "Intellect",
                            "category": "personality"
          },
                        {
                            "id": "Liberalism",
                            "name": "Authority-challenging",
                            "category": "personality"
          }
        ]
      },
                {
                    "id": "Conscientiousness",
                    "name": "Conscientiousness",
                    "category": "personality",
                    "children": [
                        {
                            "id": "Achievement striving",
                            "name": "Achievement striving",
                            "category": "personality"
          },
                        {
                            "id": "Cautiousness",
                            "name": "Cautiousness",
                            "category": "personality"
          },
                        {
                            "id": "Dutifulness",
                            "name": "Dutifulness",
                            "category": "personality"
          },
                        {
                            "id": "Orderliness",
                            "name": "Orderliness",
                            "category": "personality"
          },
                        {
                            "id": "Self-discipline",
                            "name": "Self-discipline",
                            "category": "personality",
                            "selected": false
          },
                        {
                            "id": "Self-efficacy",
                            "name": "Self-efficacy",
                            "category": "personality"
          }
        ]
      },
                {
                    "id": "Extraversion",
                    "name": "Extraversion",
                    "category": "personality",
                    "children": [
                        {
                            "id": "Activity level",
                            "name": "Activity level",
                            "category": "personality"
          },
                        {
                            "id": "Assertiveness",
                            "name": "Assertiveness",
                            "category": "personality"
          },
                        {
                            "id": "Cheerfulness",
                            "name": "Cheerfulness",
                            "category": "personality"
          },
                        {
                            "id": "Excitement-seeking",
                            "name": "Excitement-seeking",
                            "category": "personality",
                            "selected": false
          },
                        {
                            "id": "Friendliness",
                            "name": "Outgoing",
                            "category": "personality",
                            "selected": true
          },
                        {
                            "id": "Gregariousness",
                            "name": "Gregariousness",
                            "category": "personality"
          }
        ]
      },
                {
                    "id": "Agreeableness",
                    "name": "Agreeableness",
                    "category": "personality",
                    "children": [
                        {
                            "id": "Altruism",
                            "name": "Altruism",
                            "category": "personality",
                            "selected": true
          },
                        {
                            "id": "Cooperation",
                            "name": "Cooperation",
                            "category": "personality",
                            "selected":false
          },
                        {
                            "id": "Modesty",
                            "name": "Modesty",
                            "category": "personality",
                            "selected":false
          },
                        {
                            "id": "Morality",
                            "name": "Uncompromising",
                            "category": "personality",
                            "selected": false
          },
                        {
                            "id": "Sympathy",
                            "name": "Sympathy",
                            "category": "personality"
          },
                        {
                            "id": "Trust",
                            "name": "Trust",
                            "category": "personality",
                            "selected": false
          }
        ]
      },
                {
                    "id": "Neuroticism",
                    "name": "Emotional range",
                    "category": "personality",
                    "children": [
                        {
                            "id": "Anger",
                            "name": "Fiery",
                            "category": "personality",
                            "selected": false
          },
                        {
                            "id": "Anxiety",
                            "name": "Prone to worry",
                            "category": "personality",
                            "selected": false
          },
                        {
                            "id": "Depression",
                            "name": "Melancholy",
                            "category": "personality"
          },
                        {
                            "id": "Immoderation",
                            "name": "Immoderation",
                            "category": "personality",
                            "selected":false
          },
                        {
                            "id": "Self-consciousness",
                            "name": "Self-consciousness",
                            "category": "personality",
                            "selected":false
          },
                        {
                            "id": "Vulnerability",
                            "name": "Susceptible to stress",
                            "category": "personality"
          }
        ]
      }
    ]
  },
        {
            "id": "needs",
            "name": "Needs",
            "children": [
                {
                    "id": "Challenge",
                    "name": "Challenge",
                    "category": "needs",
                            "selected": true
      },
                {
                    "id": "Closeness",
                    "name": "Closeness",
                    "category": "needs"
      },
                {
                    "id": "Curiosity",
                    "name": "Curiosity",
                    "category": "needs"
      },
                {
                    "id": "Excitement",
                    "name": "Excitement",
                    "category": "needs"
      },
                {
                    "id": "Harmony",
                    "name": "Harmony",
                    "category": "needs"
      },
                {
                    "id": "Ideal",
                    "name": "Ideal",
                    "category": "needs",
                            "selected": false
      },
                {
                    "id": "Liberty",
                    "name": "Liberty",
                    "category": "needs"
      },
                {
                    "id": "Love",
                    "name": "Love",
                    "category": "needs"
      },
                {
                    "id": "Practicality",
                    "name": "Practicality",
                    "category": "needs",
                            "selected": false
      },
                {
                    "id": "Self-expression",
                    "name": "Self-expression",
                    "category": "needs"
      },
                {
                    "id": "Stability",
                    "name": "Stability",
                    "category": "needs",
                    "selected": false
      },
                {
                    "id": "Structure",
                    "name": "Structure",
                    "category": "needs",
                            "selected": true
      }
    ]
  },
        {
            "id": "values",
            "name": "Values",
            "children": [
                {
                    "id": "Conservation",
                    "name": "Conservation",
                    "category": "values"
      },
                {
                    "id": "Openness to change",
                    "name": "Openness to change",
                    "category": "values"
      },
                {
                    "id": "Hedonism",
                    "name": "Hedonism",
                    "category": "values"
      },
                {
                    "id": "Self-enhancement",
                    "name": "Self-enhancement",
                    "category": "values",
                            "selected": true
      },
                {
                    "id": "Self-transcendence",
                    "name": "Self-transcendence",
                    "category": "values",
                            "selected": true
      }
    ]
  }
];




module.exports = new MetricsController();