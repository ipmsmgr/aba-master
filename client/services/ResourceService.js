'use strict';

angular.module('pi').service('Resources', [function () {



this.scenarios = {
  "targets": [
    {
      "id": "H",
      "name": "High",
      "score": "p"
    },
    {
      "id": "L",
      "name": "Low",
      "score": "1 - p"
    }
  ],
  "scenarios": [
//    {
//      "id": "scenario.environmental_products",
//      "industries": [
//        "industry.retail"
//      ],
//      "categories": [
//        "category.shopping"
//      ],
//      "persona": [
//        "persona.greenie"
//      ],
//      "traits": [
//        {
//          "id": "big5.trait.conscientiousness",
//          "target": "H"
//        },
//        {
//          "id": "big5.trait.extraversion",
//          "target": "H"
//        },
//        {
//          "id": "big5.trait.agreeableness",
//          "target": "H"
//        }
//      ]
//    },
    {
      "id": "scenario.luxury_goods",
      "industries": [
        "industry.retail"
      ],
      "categories": [
        "category.shopping"
      ],
      "persona": [
        "persona.brand_lover"
      ],
      "traits": [
        {
          "id": "big5.trait.conscientiousness",
          "target": "H"
        },
        {
          "id": "big5.trait.agreeableness",
          "target": "H"
        },
        {
          "id": "values.trait.conservation",
          "target": "H"
        },
        {
          "id": "values.trait.self-enhancement",
          "target": "H"
        },
        {
          "id": "needs.trait.love",
          "target": "H"
        },
        {
          "id": "needs.trait.ideal",
          "target": "H"
        },
        {
          "id": "values.trait.hedonism",
          "target": "H"
        }
      ]
    },
//    {
//      "id": "scenario.coupon_redemption",
//      "industries": [
//        "industry.retail"
//      ],
//      "categories": [
//        "category.shopping"
//      ],
//      "persona": [
//        "persona.deal_seeker"
//      ],
//      "traits": [
//        {
//          "id": "big5.facet.conscientiousness.cautiousness",
//          "target": "H"
//        },
//        {
//          "id": "big5.facet.conscientiousness.orderliness",
//          "target": "H"
//        },
//        {
//          "id": "big5.facet.conscientiousness.self-discipline",
//          "target": "H"
//        },
//        {
//          "id": "big5.facet.neuroticism.immoderation",
//          "target": "L"
//        }
//      ]
//    },
//    {
//      "id": "scenario.healthy_food",
//      "industries": [
//        "industry.food"
//      ],
//      "categories": [
//        "category.eating"
//      ],
//      "persona": [
//        "persona.health_enthusiast"
//      ],
//      "traits": [
//        {
//          "id": "big5.trait.conscientiousness",
//          "target": "H"
//        },
//        {
//          "id": "big5.facet.conscientiousness.self-discipline",
//          "target": "H"
//        },
//        {
//          "id": "big5.facet.openness.artistic_interests",
//          "target": "H"
//        },
//        {
//          "id": "big5.facet.neuroticism.vulnerability",
//          "target": "L"
//        },
//        {
//          "id": "big5.facet.neuroticism.immoderation",
//          "target": "L"
//        },
//        {
//          "id": "big5.trait.neuroticism",
//          "target": "L"
//        }
//      ]
//    },
    {
      "id": "scenario.adventure_sports",
      "industries": [
        "industry.sports"
      ],
      "categories": [
        "category.sports_leisure"
      ],
      "persona": [
        "persona.risk_taker"
      ],
      "traits": [
        {
          "id": "big5.trait.openness",
          "target": "H"
        },
        {
          "id": "big5.facet.openness.adventurousness",
          "target": "H"
        },
        {
          "id": "big5.trait.conscientiousness",
          "target": "L"
        },
        {
          "id": "big5.trait.extraversion",
          "target": "H"
        },
        {
          "id": "big5.facet.extraversion.excitement-seeking",
          "target": "H"
        },
        {
          "id": "big5.trait.neuroticism",
          "target": "H"
        }
      ]
    },
    {
      "id": "scenario.financial_risk",
      "industries": [
        "industry.finance"
      ],
      "categories": [
        "category.investment"
      ],
      "persona": [
        "persona.risk_taker"
      ],
      "traits": [
        {
          "id": "big5.trait.conscientiousness",
          "target": "L"
        },
        {
          "id": "big5.trait.extraversion",
          "target": "H"
        },
        {
          "id": "big5.trait.agreeableness",
          "target": "L"
        },
        {
          "id": "big5.trait.neuroticism",
          "target": "L"
        }
      ]
    },
    {
      "id": "scenario.avoid_risk",
      "industries": [
        "industry.no_industry"
      ],
      "categories": [
        "category.risk"
      ],
      "persona": [
        "persona.risk_taker"
      ],
      "traits": [
        {
          "id": "big5.trait.conscientiousness",
          "target": "H"
        },
        {
          "id": "big5.trait.extraversion",
          "target": "L"
        },
        {
          "id": "big5.trait.agreeableness",
          "target": "H"
        },
        {
          "id": "big5.trait.neuroticism",
          "target": "H"
        }
      ]
    },
    {
      "id": "scenario.recreate_risk",
      "hidden": true,
      "industries": [
        "industry.healthcare"
      ],
      "categories": [
        "category.risk"
      ],
      "persona": [
        "persona.risk_taker"
      ],
      "traits": [
        {
          "id": "big5.trait.conscientiousness",
          "target": "L"
        },
        {
          "id": "big5.trait.extraversion",
          "target": "H"
        },
        {
          "id": "big5.trait.agreeableness",
          "target": "L"
        },
        {
          "id": "big5.trait.neuroticism",
          "target": "L"
        }
      ]
    },
    {
      "id": "scenario.health_risk",
      "industries": [
        "industry.healthcare"
      ],
      "categories": [
        "category.risk"
      ],
      "persona": [
        "persona.risk_taker"
      ],
      "traits": [
        {
          "id": "big5.trait.conscientiousness",
          "target": "L"
        },
        {
          "id": "big5.trait.extraversion",
          "target": "H"
        },
        {
          "id": "big5.trait.agreeableness",
          "target": "L"
        },
        {
          "id": "big5.trait.neuroticism",
          "target": "H"
        }
      ]
    },
    {
      "id": "scenario.career_risk",
      "industries": [
        "industry.no_industry"
      ],
      "categories": [
        "category.risk"
      ],
      "persona": [
        "persona.risk_taker"
      ],
      "traits": [
        {
          "id": "big5.trait.conscientiousness",
          "target": "L"
        },
        {
          "id": "big5.trait.agreeableness",
          "target": "L"
        },
        {
          "id": "big5.trait.neuroticism",
          "target": "L"
        }
      ]
    },
    {
      "id": "scenario.excercise",
      "industries": [
        "industry.fitness"
      ],
      "categories": [
        "category.living"
      ],
      "persona": [
        "persona.health_enthusiast"
      ],
      "traits": [
        {
          "id": "big5.trait.conscientiousness",
          "target": "H"
        },
        {
          "id": "big5.trait.extraversion",
          "target": "H"
        },
        {
          "id": "big5.trait.neuroticism",
          "target": "L"
        }
      ]
    },
//    {
//      "id": "scenario.adaptability",
//      "hidden": true,
//      "industries": [
//        "industry.no_industry"
//      ],
//      "categories": [
//        "category.work"
//      ],
//      "persona": [
//        "persona.adapter"
//      ],
//      "traits": [
//        {
//          "id": "big5.trait.conscientiousness",
//          "target": "H"
//        },
//        {
//          "id": "big5.trait.extraversion",
//          "target": "H"
//        }
//      ]
//    },
    {
      "id": "scenario.respond_to_strangers",
      "industries": [
        "industry.media"
      ],
      "categories": [
        "category.social_media"
      ],
      "persona": [
        "persona.responder"
      ],
      "traits": [
        {
          "id": "big5.facet.extraversion.excitement-seeking",
          "target": "H"
        },
        {
          "id": "big5.facet.extraversion.friendliness",
          "target": "H"
        },
        {
          "id": "big5.facet.extraversion.activity_level",
          "target": "H"
        },
        {
          "id": "big5.facet.extraversion.gregariousness",
          "target": "H"
        },
        {
          "id": "big5.facet.agreeableness.trust",
          "target": "H"
        },
        {
          "id": "big5.facet.agreeableness.morality",
          "target": "H"
        },
        {
          "id": "big5.trait.extraversion",
          "target": "H"
        },
        {
          "id": "big5.trait.agreeableness",
          "target": "H"
        },
        {
          "id": "big5.facet.conscientiousness.cautiousness",
          "target": "L"
        },
        {
          "id": "big5.facet.neuroticism.anxiety",
          "target": "L"
        }
      ]
    }
//      ,
//    {
//      "id": "scenario.retweet",
//      "industries": [
//        "industry.media"
//      ],
//      "categories": [
//        "category.social_media"
//      ],
//      "persona": [
//        "persona.broadcaster"
//      ],
//      "traits": [
//        {
//          "id": "big5.trait.openness",
//          "target": "H"
//        },
//        {
//          "id": "big5.facet.agreeableness.modesty",
//          "target": "H"
//        },
//        {
//          "id": "big5.facet.extraversion.friendliness",
//          "target": "H"
//        }
//      ]
//    },
//    {
//      "id": "scenario.click_ad",
//      "industries": [
//        "industry.travel"
//      ],
//      "categories": [
//        "category.ad_targeting"
//      ],
//      "persona": [
//        "persona.ad_clicker"
//      ],
//      "traits": [
//        {
//          "id": "big5.trait.neuroticism",
//          "target": "L"
//        },
//        {
//          "id": "big5.trait.openness",
//          "target": "H"
//        }
//      ]
//    },
//    {
//      "id": "scenario.follow_account",
//      "industries": [
//        "industry.travel"
//      ],
//      "categories": [
//        "category.ad_targeting"
//      ],
//      "persona": [
//        "persona.ad_clicker"
//      ],
//      "traits": [
//        {
//          "id": "big5.trait.neuroticism",
//          "target": "L"
//        },
//        {
//          "id": "big5.trait.openness",
//          "target": "H"
//        }
//      ]
//    }
  ]
};

this.names = {};
    
this.names.get = function(category){
    
    
}

  /*
   * Get the value for the given key from the dictionary.
   *
   * @param key A key. Can contain '.' to indicate key's present in sub-dictionaries.
   *                   For example 'application.name' looks up for the 'application' key
   *                   in the dictionary and, with it's value, looks up for the 'name' key.
   * @param defaultValue A value to return if the key is not in the dictionary.
   * @returns The value from the dictionary.
   */

  this.names.get = function (key, defaultValue) {
    var i, parts, value;
    parts = key.split('.');
    value = this.value;
    i = 0;
    while (i < parts.length) {
      value = value[parts[i]];
      if (!value) {
        value = defaultValue;
        break;
      }
      i = i + 1;
    }
    return value;
  };

this.names.value = {
  "scenarios": [
    {
      "id": "scenario.environmental_products",
      "name": "Environmentally Conscious Products",
      "verb": "Buy eco-friendly",
      "tooltip": "People who exhibit more **agreeableness**, **extraversion**, and **conscientiousness** are more likely to purchase eco-friendly products. [How did we get this?](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/personality-insights/applied.shtml#otherEnvironment)"
    },
    {
      "id": "scenario.luxury_goods",
      "name": "Luxury Goods",
      "verb": "Treat Themself",
      "tooltip": "People who exhibit more **conscientiousness**, **conservation**, **self-enhancement**, and **agreeableness**; a need for **love** and the **ideal**; and value **hedonism** are likely to prefer luxury brands. [How did we get this?](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/personality-insights/applied.shtml#IBMbrand)"
    },
    {
      "id": "scenario.coupon_redemption",
      "name": "Coupon Redemption",
      "verb": "Use a coupon",
      "tooltip": "People who exhibit more **orderliness**, **self-discipline**, **cautiousness**, and **moderation** are likely to redeem coupons. [How did we get this?](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/personality-insights/applied.shtml#IBMcampaign)"
    },
    {
      "id": "scenario.healthy_food",
      "name": "Healthy Food",
      "verb": "Buy healthy foods",
      "tooltip": "People who exhibit more **conscientiousness**, **self-discipline**, and even **artistic interests** than others are more likely to eat health foods. However, more **susceptibility to stress**, **emotional range**, and **immoderation** decreases that likelihood. [How did we get this?](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/personality-insights/applied.shtml#otherHealth)"
    },
    {
      "id": "scenario.adventure_sports",
      "name": "Adventure Sports",
      "verb": "Do adventure sports",
      "tooltip": "People who exhibit more **extraversion**, **openness**, **excitement-seeking**, **adventurousness** and **emotional range** than others are likely to engage in adventure sports. Exhibiting more **conscientiousness** reduces the likelihood. [How did we get this?](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/personality-insights/applied.shtml#otherRisk)"
    },
    {
      "id": "scenario.financial_risk",
      "name": "Financial Risk",
      "verb": "Take financial risks",
      "tooltip": "People with more **openness to experiences** than others are likely to make risky investments. Showing more **emotional range** reduces that likelihood. [How did we get this?](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/personality-insights/applied.shtml#otherRisk)"
    },
    {
      "id": "scenario.recreate_risk",
      "name": "Recreate Risk",
      "verb": "Recreating risks",
      "tooltip": "No description available."
    },
    {
      "id": "scenario.avoid_risk",
      "name": "Avoid Risk",
      "verb": "Avoid taking risks",
      "tooltip": "People who exhibit more **agreeableness**, **emotional range** and **conscientiousness** than others are likely to avoid taking risks. Exhibiting more **extraversion** increases the likelihood of someone taking risks. [How did we get this?](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/personality-insights/applied.shtml#otherRisk)"
    },
    {
      "id": "scenario.health_risk",
      "name": "Health Risk",
      "verb": "Put health at risk",
      "tooltip": "People who exhibit more **extraversion**, **emotional range** and less **agreeableness** than others are likely to put their health at risk. Exhibiting more **conscientiousness** decreases this likelihood. [How did we get this?](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/personality-insights/applied.shtml#otherRisk)"
    },
    {
      "id": "scenario.career_risk",
      "name": "Career Risk",
      "verb": "Change careers",
      "tooltip": "People who exhibit more **conscientiousness**, **extraversion**, and **openness** than others are more likely to adapt to changes in career. [How did we get this?](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/personality-insights/applied.shtml#otherProfessional)"
    },
    {
      "id": "scenario.excercise",
      "name": "Exercise",
      "verb": "Spend on health and fitness",
      "tooltip": "People who exhibit more **extraversion** and **conscientiousness** than others are more likely to exercise often. More **emotional range** reduces that likelihood. [How did we get this?](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/personality-insights/applied.shtml#otherHealth)"
    },
//    {
//      "id": "scenario.adaptability",
//      "name": "Adaptability",
//      "verb": "???",
//      "tooltip": "???"
//    },
    {
      "id": "scenario.respond_to_strangers",
      "name": "Willingness to respond to strangers",
//      "verb": "Reply on social media",
       "verb": "Willing to respond to strangers",
      "tooltip": "People who exhibit more **excitement-seeking**, **friendliness**, **activity levels**, **gregariousness**, **trust**, **morality**, **extraversion**, and **agreeableness** than others are likely to respond to social media posts. People who exhibit more **cautiousness** and **anxiety** are not. [How did we get this?](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/personality-insights/applied.shtml#IBMrespond)"
    },
    {
      "id": "scenario.retweet",
      "name": "Retweet",
      "verb": "Re-share on social media",
      "tooltip": "People who exhibit more **modesty**, **openness**, and **friendliness** traits than others are likely to spread information. [How did we get this?](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/personality-insights/applied.shtml#IBMretweet)"
    },
    {
      "id": "scenario.click_ad",
      "name": "Click an Ad",
      "verb": "Click on an ad",
      "tooltip": "People who exhibit more **openness**, but less **emotional range** than others are more likely to click on an ad. For the top 10% of these people, click rate increased from 6.8% to 11.3%. [How did we get this?](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/personality-insights/applied.shtml#IBMtarget)"
    },
    {
      "id": "scenario.follow_account",
      "name": "Follow account",
      "verb": "Follow on social media",
      "tooltip": "People who exhibit more **openness**, but less **emotional range** than others are more likely to follow a social media account. For the top 10% of these people, follow rate increased from 4.7% to 8.8% percent. [How did we get this?](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/personality-insights/applied.shtml#IBMtarget)"
    }
  ],
  "industries": [
    {
      "id": "scenario.retail",
      "name": "Retail"
    },
    {
      "id": "scenario.food",
      "name": "Food"
    },
    {
      "id": "scenario.sports",
      "name": "Sports"
    },
    {
      "id": "scenario.finance",
      "name": "Financial"
    },
    {
      "id": "scenario.healthcare",
      "name": "Healthcare"
    },
    {
      "id": "scenario.fitness",
      "name": "Fitness"
    },
    {
      "id": "scenario.media",
      "name": "Media"
    },
    {
      "id": "scenario.travel",
      "name": "Travel"
    }
  ],
  "categories": [
    {
      "id": "category.shopping",
      "name": "Shopping"
    },
    {
      "id": "category.eating",
      "name": "Eating"
    },
    {
      "id": "category.sports_leisure",
      "name": "Sports and Leisure"
    },
    {
      "id": "category.investment",
      "name": "Investments"
    },
    {
      "id": "category.risk",
      "name": "Risk"
    },
    {
      "id": "category.living",
      "name": "Living"
    },
    {
      "id": "category.work",
      "name": "Work"
    },
    {
      "id": "category.social_media",
      "name": "Social Media"
    },
    {
      "id": "category.ad_targeting",
      "name": "Ad Targeting"
    }
  ],
  "personas": [
    {
      "id": "persona.greenie",
      "name": "Green Lover"
    },
    {
      "id": "persona.brand_lover",
      "name": "Brand Lover"
    },
    {
      "id": "persona.deal_seeker",
      "name": "Deal Seeker"
    },
    {
      "id": "persona.health_enthusiast",
      "name": "Health Enthusiast"
    },
    {
      "id": "persona.risk_taker",
      "name": "Risk Taker"
    },
    {
      "id": "persona.adapter",
      "name": "Adapter"
    },
    {
      "id": "persona.responder",
      "name": "Responder"
    },
    {
      "id": "persona.broadcaster",
      "name": "Broadcaster"
    },
    {
      "id": "persona.follower",
      "name": "Follower"
    },
    {
      "id": "persona.ad_clicker",
      "name": "Ad Clicker"
    }
  ]
};
    }]);