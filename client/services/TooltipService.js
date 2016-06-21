'use strict';

angular.module('pi').service('TooltipService', [function () {

    /**
    * Traverses the values object to find the matching
    * tooltip.
    **/
    this.get = function(key){
        // Iterate over categories
        for (var pkey in this.values) {
            var parent = this.values[pkey];
            
            // Iterate over measurements
            for (var ckey in parent) {
                var child = parent[ckey];
                
                // Return value if the keys match
                if(ckey == key){
                    return child;
                }
            }
        }
        return null;
    }
    
    this.values = {};

    this.values.big5 = {
        'Openness': 'Openness to experience. Higher: Intellectually curious, emotionally-aware, sensitive to beauty and willing to try new things.\nLower: Preferring the plain, straightforward, and obvious over the complex, ambiguous, and subtle.',
        'Conscientiousness': 'Higher: More self-disciplined, dutiful, or aiming for achievement against measures or outside expectations.\nLower: More likely to prefer the spontaneous over the planned.',
        'Introversion': 'Higher: More energetic and pronounced engagement with the external world. Likes high group visibility, talking, and asserting themselves.\nLower: Needs less stimulation and are more independent of their social world. It does not mean they are shy, un-friendly, or antisocial.',
        'Extraversion': 'Higher: More energetic and pronounced engagement with the external world. Likes high group visibility, talking, and asserting themselves.\nLower: Needs less stimulation and are more independent of their social world. It does not mean they are shy, un-friendly, or antisocial.',
        'Agreeableness': 'Higher: Value getting along with others. They have a more optimistic view of human nature.\nLower: Value self interests over others. They are more skeptical of others\' motives.',
        'Emotional range': '**This demo cannot diagnose a mental illness.** Higher: More likely to have negative emotions or get upset. It could mean they are going through a tough time.\nLower: More calm and less likely to get upset. It does not mean they are positive, or happy people.',
        'Adventurousness': 'Eagerness to trying new activities and experiencing new things.',
        'Artistic interests': 'Appreciation for art and beauty, both man-made and in nature.',
        'Emotionality': 'Emotional availability; awareness of own feelings.',
        'Imagination': 'Openness to creating an inner world of fantasy.',
        'Intellect': 'Intellectual curiosity; openness to new ideas.',
        'Authority-challenging': 'Openness to re-examine own values and traditions; readiness to challenge authority.',
        'Achievement-striving': 'The need for personal achievement and sense of direction.',
        'Cautiousness': 'Tendency to think things through before acting or speaking.',
        'Dutifulness': 'Sense of duty; amount of emphasis placed on fulfilling obligations.',
        'Orderliness': 'Personal organization, tidiness, neatness.',
        'Self-discipline': 'Will-power; the capacity to begin tasks and follow through to completion in spite of boredom or distractions.',
        'Self-efficacy': 'Belief in one\'s own competence.',
        'Activity level': 'Pace of living; level of busyness.',
        'Assertiveness': 'Forcefulness of expression; pursuit of leadership and social ascendancy; desire to direct the activities of others.',
        'Cheerfulness': 'Tendency to experience or express positive emotions.',
        'Excitement-seeking': 'A need for environmental stimulation.',
        'Warmth': 'Interest in and friendliness towards others; socially confident.',
        'Gregariousness': 'Fondness for the company of others; sociability.',
        'Altruism': 'Active and genuine concern for the welfare of others.',
        'Cooperation': 'Dislike of confrontations. Responding to interpersonal conflict with a willingness to compromise.',
        'Modesty': 'Tendency to be unassuming and play down own achievements; humility.',
        'Straightforwardness': 'Frank and genuine in expression; candid, blunt.',
        'Sympathy': 'Attitude of compassion for others; kindness.',
        'Trust': 'Level of belief in the sincerity and good intentions of others.',
        'Fiery': 'Tendency to experience–but not necessarily express–anger or frustration.',
        'Prone to worry': 'Tendency to dwell on difficulty or troubles; easily experience unease or concern.',
        'Melancholy': 'Normal tendency to experience feelings of guilt, sadness, hopelessness, or loneliness. **This demo cannot diagnose a mental illness.**',
        'Impulsiveness': 'Tendency to act on cravings and urges rather over resisting them or delaying gratification.',
        'Self-consciousness': 'Concern with rejection, embarrassment; shyness.',
        'Sensitivity to stress': 'Difficulty in coping with stress or pressure in difficult situations.'
    };

    this.values.needs = {
        'Structure': 'A need for organization, planning, and things that have a clear purpose.',
        'Stability': 'A need for the sensible, tried and tested, with a good track record and a known history.',
        'Self-expression': 'A desire to discover and assert one\'s identity.',
        'Practicality': 'A desire for getting the job done, skill, and efficiency.',
        'Love': 'Social contact, whether one-to-one or one-to-many.',
        'Liberty': 'A need to escape, a desire for new experiences, new things.',
        'Ideal': 'A desire to satisfy one\'s idea of perfection in a lifestyle or experience, oftentimes seen as pursuing a sense of community.',
        'Harmony': 'A need to appreciate or please other people, their viewpoints, and feelings.',
        'Excitement': 'A need to pursue experiences or lead a lifestyle that arouses enthusiasm and eagerness.',
        'Curiosity': 'A need to pursue experiences that foster learning, exploration, and growth.',
        'Closeness': 'A need to nurture or be nurtured; a feeling of belonging.',
        'Challenge': 'A desire to achieve, succeed, compete, or pursue experiences that test one\'s abilities.'
    };

    this.values.values = {
        'Tradition': 'Respect, commitment, and acceptance of the customs and ideas that one\'s culture and/or religion provides.',
        'Stimulation': 'Excitement, novelty, and challenge in life.',
        'Taking pleasure in life': 'Pleasure or sensuous gratification for oneself.',
        'Achievement': 'Personal success through demonstrating competence according to social standards.',
        'Helping others': 'Preserving and enhancing the welfare of those with whom one is in frequent personal contact.'
    };



}]);
