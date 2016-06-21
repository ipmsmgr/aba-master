/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

module.exports = {
    facets: {
        Friendliness: {
            Big5: "Extraversion",
            LowTerm: "Reserved",
            HighTerm: "Outgoing",
            LowDescription: "Subject is a private person and doesn't let many people in",
            HighDescription: "Subject makes friends easily and feels comfortable around other people"
        },
        Gregariousness: {
            Big5: "Extraversion",
            LowTerm: "Independent",
            HighTerm: "Sociable",
            LowDescription: "Subject has a strong desire to have time alone",
            HighDescription: "Subject enjoys being in the company of others"
        },
        Assertiveness: {
            Big5: "Extraversion",
            LowTerm: "Demure",
            HighTerm: "Assertive",
            LowDescription: "Subject prefers to listen than to talk, especially in group situations",
            HighDescription: "Subject tends to speak up and take charge of situations and is comfortable leading groups"
        },
        "Activity-level": {
            Big5: "Extraversion",
            LowTerm: "Laid-back",
            HighTerm: "Energetic",
            LowDescription: "Subject appreciates a relaxed pace in life",
            HighDescription: "Subject enjoys a fast-paced, busy schedule with many activities"
        },
        "Excitement-seeking": {
            Big5: "Extraversion",
            LowTerm: "Calm-seeking",
            HighTerm: "Excitement-seeking",
            LowDescription: "Subject prefers activities that are quiet, calm, and safe",
            HighDescription: "Subject is excited by taking risks and feels bored without lots of action going on"
        },
        Cheerfulness: {
            Big5: "Extraversion",
            LowTerm: "Solemn",
            HighTerm: "Cheerful",
            LowDescription: "Subject is generally serious and does not joke much",
            HighDescription: "Subject is a joyful person and shares that joy with the world"
        },
        Trust: {
            Big5: "Agreeableness",
            LowTerm: "Cautious of others",
            HighTerm: "Trusting of others",
            LowDescription: "Subject is wary of other people's intentions and does not trust easily",
            HighDescription: "Subject believes the best in others and trusts people easily"
        },
        Cooperation: {
            Big5: "Agreeableness",
            LowTerm: "Contrary",
            HighTerm: "Accommodating",
            LowDescription: "Subject does not shy away from contradicting others",
            HighDescription: "Subject is easy to please and tries to avoid confrontation"
        },
        Altruism: {
            Big5: "Agreeableness",
            LowTerm: "Self-focused",
            HighTerm: "Altruistic",
            LowDescription: "Subject is more concerned with taking care of themself than taking time for others",
            HighDescription: "Subject feels fulfilled when helping others, and will go out of the way to do so"
        },
        Morality: {
            Big5: "Agreeableness",
            LowTerm: "Compromising",
            HighTerm: "Uncompromising",
            LowDescription: "Subject is comfortable using every trick in the book to get what they want",
            HighDescription: "Subject thinks it is wrong to take advantage of others to get ahead"
        },
        Modesty: {
            Big5: "Agreeableness",
            LowTerm: "Proud",
            HighTerm: "Modest",
            LowDescription: "Subject holds themself in high regard, satisfied with who they are",
            HighDescription: "Subject is uncomfortable being the center of attention"
        },
        Sympathy: {
            Big5: "Agreeableness",
            LowTerm: "Hardened",
            HighTerm: "Empathetic",
            LowDescription: "Subject thinks that people should generally rely more on themselves than on other people",
            HighDescription: "Subject feels what others feel and is compassionate towards them"
        },
        "Self-efficacy": {
            Big5: "Conscientiousness",
            LowTerm: "Self-doubting",
            HighTerm: "Self-assured",
            LowDescription: "Subject frequently doubts their ability to achieve their goals",
            HighDescription: "Subject feels they have the ability to succeed in the tasks they set out to do"
        },
        Orderliness: {
            Big5: "Conscientiousness",
            LowTerm: "Unstructured",
            HighTerm: "Organized",
            LowDescription: "Subject does not make a lot of time for organization in their daily life",
            HighDescription: "Subject feels a strong need for structure in their life"
        },
        Dutifulness: {
            Big5: "Conscientiousness",
            LowTerm: "Carefree",
            HighTerm: "Dutiful",
            LowDescription: "Subject does what they want, disregarding rules and obligations",
            HighDescription: "Subject takes rules and obligations seriously, even when it's inconvenient"
        },
        "Achievement-striving": {
            Big5: "Conscientiousness",
            LowTerm: "Content",
            HighTerm: "Driven",
            LowDescription: "Subject is content with their level of accomplishment and does not feel the need to set ambitious goals",
            HighDescription: "Subject has high goals for themself and works hard to achieve them"
        },
        "Self-discipline": {
            Big5: "Conscientiousness",
            LowTerm: "Intermittent",
            HighTerm: "Persistent",
            LowDescription: "Subject has a hard time sticking with difficult tasks for a long period of time",
            HighDescription: "Subject can tackle and stick with tough tasks"
        },
        Cautiousness: {
            Big5: "Conscientiousness",
            LowTerm: "Bold",
            HighTerm: "Deliberate",
            LowDescription: "Subject would rather take action immediately than spend time deliberating making a decision",
            HighDescription: "Subject carefully thinks through decisions before making them"
        },
        Anxiety: {
            Big5: "Neuroticism",
            LowTerm: "Self-assured",
            HighTerm: "Prone to worry",
            LowDescription: "Subject tends to feel calm and self-assured",
            HighDescription: "Subject tends to worry about things that might happen"
        },
        Anger: {
            Big5: "Neuroticism",
            LowTerm: "Mild-tempered",
            HighTerm: "Fiery",
            LowDescription: "It takes a lot for the subject to get angry",
            HighDescription: "Subject has a fiery temper, especially when things do not go your way"
        },
        Depression: {
            Big5: "Neuroticism",
            LowTerm: "Content",
            HighTerm: "Melancholy",
            LowDescription: "Subject is generally comfortable with themself as they are",
            HighDescription: "Subject thinks quite often about the things they are unhappy about"
        },
        "Self-consciousness": {
            Big5: "Neuroticism",
            LowTerm: "Confident",
            HighTerm: "Self-conscious",
            LowDescription: "Subject is hard to embarrass and is self-confident most of the time",
            HighDescription: "Subject is sensitive about what others might be thinking about them"
        },
        Immoderation: {
            Big5: "Neuroticism",
            LowTerm: "Self-controlled",
            HighTerm: "Hedonistic",
            LowDescription: "Subject has control over their desires, which are not particularly intense",
            HighDescription: "Subject feels their desires strongly and is easily tempted by them"
        },
        Vulnerability: {
            Big5: "Neuroticism",
            LowTerm: "Calm under pressure",
            HighTerm: "Susceptible to stress",
            LowDescription: "Subject handles unexpected events calmly and effectively",
            HighDescription: "Subject is easily overwhelmed in stressful situations"
        },
        Imagination: {
            Big5: "Openness",
            LowTerm: "Down-to-earth",
            HighTerm: "Imaginative",
            LowDescription: "Subject prefers facts over fantasy",
            HighDescription: "Subject has a wild imagination"
        },
        "Artistic-interests": {
            Big5: "Openness",
            LowTerm: "Unconcerned with art",
            HighTerm: "Appreciative of art",
            LowDescription: "Subject is less concerned with artistic or creative activities than most people who participated in our surveys",
            HighDescription: "Subject enjoys beauty and seeks out creative experiences"
        },
        Emotionality: {
            Big5: "Openness",
            LowTerm: "Dispassionate",
            HighTerm: "Emotionally aware",
            LowDescription: "Subject does not frequently think about or openly express their emotions",
            HighDescription: "Subject is aware of their feelings and how to express them"
        },
        Adventurousness: {
            Big5: "Openness",
            LowTerm: "Consistent",
            HighTerm: "Adventurous",
            LowDescription: "Subject enjoys familiar routines and prefers not to deviate from them",
            HighDescription: "Subject is eager to experience new things"
        },
        Intellect: {
            Big5: "Openness",
            LowTerm: "Concrete",
            HighTerm: "Philosophical",
            LowDescription: "Subject prefers dealing with the world as it is, rarely considering abstract ideas",
            HighDescription: "Subject is open to and intrigued by new ideas and loves to explore them"
        },
        Liberalism: {
            Big5: "Openness",
            LowTerm: "Respectful of authority",
            HighTerm: "Authority-challenging",
            LowDescription: "Subject prefers following with tradition in order to maintain a sense of stability",
            HighDescription: "Subject prefers to challenge authority and traditional values to help bring about positive changes"
        }
    },
    needs: {
        Challenge: ["prestige", "competition", "glory"],
        Closeness: ["belongingness", "nostalgia", "intimacy"],
        Curiosity: ["discovery", "mastery", "gaining knowledge"],
        Excitement: ["revelry", "anticipation", "exhiliration"],
        Harmony: ["well-being", "courtesy", "politeness"],
        Ideal: ["sophistication", "spirituality", "superiority", "fulfillment"],
        Liberty: ["modernity", "expanding possibility", "escape", "spontaneity", "novelty"],
        Love: ["connectedness", "affinity"],
        Practicality: ["efficiency", "practicality", "high value", "convenience"],
        "Self-expression": ["self-expression", "personal empowerment", "personal strength"],
        Stability: ["stability", "authenticity", "trustworthiness"],
        Structure: ["organization", "straightforwardness", "clarity", "reliability"]
    },
    phrases: {
        "Subject is %s": "Subject is %s",
        "Subject is %s and %s": "Subject is %s and %s",
        "Subject is %s, %s and %s": "Subject is %s, %s and %s",
        "And they are %s": "And they are %s",
        "Subject is relatively unconcerned with %s": "Subject is relatively unconcerned with %s",
        "Subject is relatively unconcerned with both %s and %s": "Subject is relatively unconcerned with both %s and %s",
        "Subject doesn't find %s to be particularly motivating": "Subject doesn't find %s to be particularly motivating",
        "Subject doesn't find either %s or %s to be particularly motivating": "Subject doesn't find either %s or %s to be particularly motivating",
        "Subject values %s a bit": "Subject values %s a bit",
        "Subject values both %s and %s a bit": "Subject values both %s and %s a bit",
        "Subject considers %s to guide a large part of what they do": "Subject considers %s to guide a large part of what they do",
        "Subject considers both %s and %s to guide a large part of what they do": "Subject considers both %s and %s to guide a large part of what they do",
        "And %s": "And %s",
        "Subject values %s a bit more": "Subject values %s a bit more",
        "Experiences that make the subject feel high %s are generally unappealing to them": "Experiences that make the subject feel high %s are generally unappealing to them",
        "Experiences that give a sense of %s hold some appeal to the subject": "Experiences that give a sense of %s hold some appeal to the subject",
        "Subject is motivated to seek out experiences that provide a strong feeling of %s": "Subject is motivated to seek out experiences that provide a strong feeling of %s",
        "Subject's choices are driven by a desire for %s": "Subject's choices are driven by a desire for %s",
        "a bit %s": "a bit %s",
        "somewhat %s": "somewhat %s",
        "can be perceived as %s": "can be perceived as %s"
    },
    traits: {
        Agreeableness_minus_Conscientiousness_minus: [{
            perceived_negatively: true,
            word: "inconsiderate"
        }, {
            perceived_negatively: true,
            word: "impolite"
        }, {
            perceived_negatively: true,
            word: "distrustful"
        }, {
            perceived_negatively: true,
            word: "uncooperative"
        }, {
            perceived_negatively: true,
            word: "thoughtless"
        }],
        Agreeableness_minus_Conscientiousness_plus: [{
            perceived_negatively: false,
            word: "strict"
        }, {
            perceived_negatively: false,
            word: "rigid"
        }, {
            perceived_negatively: true,
            word: "stern"
        }],
        Agreeableness_minus_Extraversion_minus: [{
            perceived_negatively: true,
            word: "cynical"
        }, {
            perceived_negatively: true,
            word: "wary of others"
        }, {
            perceived_negatively: true,
            word: "seclusive"
        }, {
            perceived_negatively: true,
            word: "detached"
        }, {
            perceived_negatively: true,
            word: "impersonal"
        }, {
            perceived_negatively: true,
            word: "glum"
        }],
        Agreeableness_minus_Extraversion_plus: [{
            perceived_negatively: true,
            word: "bullheaded"
        }, {
            perceived_negatively: true,
            word: "abrupt"
        }, {
            perceived_negatively: true,
            word: "crude"
        }, {
            perceived_negatively: true,
            word: "combative"
        }, {
            perceived_negatively: true,
            word: "rough"
        }, {
            perceived_negatively: false,
            word: "sly"
        }, {
            perceived_negatively: true,
            word: "manipulative"
        }, {
            perceived_negatively: true,
            word: "gruff"
        }, {
            perceived_negatively: true,
            word: "devious"
        }],
        Agreeableness_minus_Neuroticism_minus: [{
            perceived_negatively: true,
            word: "insensitive"
        }, {
            perceived_negatively: true,
            word: "unaffectionate"
        }, {
            perceived_negatively: true,
            word: "passionless"
        }, {
            perceived_negatively: true,
            word: "unemotional"
        }],
        Agreeableness_minus_Neuroticism_plus: [{
            perceived_negatively: true,
            word: "critical"
        }, {
            perceived_negatively: true,
            word: "selfish"
        }, {
            perceived_negatively: true,
            word: "ill-tempered"
        }, {
            perceived_negatively: true,
            word: "antagonistic"
        }, {
            perceived_negatively: true,
            word: "grumpy"
        }, {
            perceived_negatively: true,
            word: "bitter"
        }, {
            perceived_negatively: true,
            word: "disagreeable"
        }, {
            perceived_negatively: true,
            word: "demanding"
        }],
        Agreeableness_minus_Openness_minus: [{
            perceived_negatively: true,
            word: "coarse"
        }, {
            perceived_negatively: true,
            word: "tactless"
        }, {
            perceived_negatively: true,
            word: "curt"
        }, {
            perceived_negatively: true,
            word: "narrow-minded"
        }, {
            perceived_negatively: true,
            word: "callous"
        }, {
            perceived_negatively: true,
            word: "ruthless"
        }, {
            perceived_negatively: true,
            word: "uncharitable"
        }, {
            perceived_negatively: true,
            word: "vindictive"
        }],
        Agreeableness_minus_Openness_plus: [{
            perceived_negatively: false,
            word: "shrewd"
        }, {
            perceived_negatively: false,
            word: "eccentric"
        }, {
            perceived_negatively: false,
            word: "individualistic"
        }],
        Agreeableness_plus_Conscientiousness_minus: [{
            perceived_negatively: false,
            word: "unpretentious"
        }, {
            perceived_negatively: false,
            word: "self-effacing"
        }],
        Agreeableness_plus_Conscientiousness_plus: [{
            perceived_negatively: false,
            word: "helpful"
        }, {
            perceived_negatively: false,
            word: "cooperative"
        }, {
            perceived_negatively: false,
            word: "considerate"
        }, {
            perceived_negatively: false,
            word: "respectful"
        }, {
            perceived_negatively: false,
            word: "polite"
        }, {
            perceived_negatively: false,
            word: "reasonable"
        }, {
            perceived_negatively: false,
            word: "courteous"
        }, {
            perceived_negatively: false,
            word: "thoughtful"
        }, {
            perceived_negatively: false,
            word: "loyal"
        }, {
            perceived_negatively: false,
            word: "moral"
        }],
        Agreeableness_plus_Extraversion_minus: [{
            perceived_negatively: false,
            word: "soft-hearted"
        }, {
            perceived_negatively: false,
            word: "agreeable"
        }, {
            perceived_negatively: false,
            word: "obliging"
        }, {
            perceived_negatively: false,
            word: "humble"
        }, {
            perceived_negatively: true,
            word: "lenient"
        }],
        Agreeableness_plus_Extraversion_plus: [{
            perceived_negatively: false,
            word: "effervescent"
        }, {
            perceived_negatively: false,
            word: "happy"
        }, {
            perceived_negatively: false,
            word: "friendly"
        }, {
            perceived_negatively: false,
            word: "merry"
        }, {
            perceived_negatively: false,
            word: "jovial"
        }, {
            perceived_negatively: false,
            word: "humorous"
        }],
        Agreeableness_plus_Neuroticism_minus: [{
            perceived_negatively: false,
            word: "generous"
        }, {
            perceived_negatively: false,
            word: "pleasant"
        }, {
            perceived_negatively: false,
            word: "tolerant"
        }, {
            perceived_negatively: false,
            word: "peaceful"
        }, {
            perceived_negatively: false,
            word: "flexible"
        }, {
            perceived_negatively: false,
            word: "easy-going"
        }, {
            perceived_negatively: false,
            word: "fair"
        }, {
            perceived_negatively: false,
            word: "charitable"
        }, {
            perceived_negatively: false,
            word: "trustful"
        }],
        Agreeableness_plus_Neuroticism_plus: [{
            perceived_negatively: false,
            word: "sentimental"
        }, {
            perceived_negatively: false,
            word: "affectionate"
        }, {
            perceived_negatively: false,
            word: "sensitive"
        }, {
            perceived_negatively: false,
            word: "soft"
        }, {
            perceived_negatively: false,
            word: "passionate"
        }, {
            perceived_negatively: false,
            word: "romantic"
        }],
        Agreeableness_plus_Openness_minus: [{
            perceived_negatively: true,
            word: "dependent"
        }, {
            perceived_negatively: true,
            word: "simple"
        }],
        Agreeableness_plus_Openness_plus: [{
            perceived_negatively: false,
            word: "genial"
        }, {
            perceived_negatively: false,
            word: "tactful"
        }, {
            perceived_negatively: false,
            word: "diplomatic"
        }, {
            perceived_negatively: false,
            word: "deep"
        }, {
            perceived_negatively: false,
            word: "idealistic"
        }],
        Conscientiousness_minus_Agreeableness_minus: [{
            perceived_negatively: true,
            word: "rash"
        }, {
            perceived_negatively: true,
            word: "uncooperative"
        }, {
            perceived_negatively: true,
            word: "unreliable"
        }, {
            perceived_negatively: true,
            word: "distrustful"
        }, {
            perceived_negatively: true,
            word: "thoughtless"
        }],
        Conscientiousness_minus_Agreeableness_plus: [{
            perceived_negatively: false,
            word: "unpretentious"
        }, {
            perceived_negatively: false,
            word: "self-effacing"
        }],
        Conscientiousness_minus_Extraversion_minus: [{
            perceived_negatively: true,
            word: "indecisive"
        }, {
            perceived_negatively: true,
            word: "aimless"
        }, {
            perceived_negatively: false,
            word: "wishy-washy"
        }, {
            perceived_negatively: false,
            word: "noncommittal"
        }, {
            perceived_negatively: true,
            word: "unambitious"
        }],
        Conscientiousness_minus_Extraversion_plus: [{
            perceived_negatively: true,
            word: "unruly"
        }, {
            perceived_negatively: false,
            word: "boisterous"
        }, {
            perceived_negatively: true,
            word: "reckless"
        }, {
            perceived_negatively: true,
            word: "devil-may-care"
        }, {
            perceived_negatively: false,
            word: "demonstrative"
        }],
        Conscientiousness_minus_Neuroticism_minus: [{
            perceived_negatively: false,
            word: "informal"
        }, {
            perceived_negatively: false,
            word: "low-key"
        }],
        Conscientiousness_minus_Neuroticism_plus: [{
            perceived_negatively: true,
            word: "scatterbrained"
        }, {
            perceived_negatively: true,
            word: "inconsistent"
        }, {
            perceived_negatively: true,
            word: "erratic"
        }, {
            perceived_negatively: true,
            word: "forgetful"
        }, {
            perceived_negatively: true,
            word: "impulsive"
        }, {
            perceived_negatively: true,
            word: "frivolous"
        }],
        Conscientiousness_minus_Openness_minus: [{
            perceived_negatively: false,
            word: "foolhardy"
        }, {
            perceived_negatively: true,
            word: "illogical"
        }, {
            perceived_negatively: true,
            word: "immature"
        }, {
            perceived_negatively: true,
            word: "haphazard"
        }, {
            perceived_negatively: false,
            word: "lax"
        }, {
            perceived_negatively: true,
            word: "flippant"
        }],
        Conscientiousness_minus_Openness_plus: [{
            perceived_negatively: false,
            word: "unconventional"
        }, {
            perceived_negatively: false,
            word: "quirky"
        }],
        Conscientiousness_plus_Agreeableness_minus: [{
            perceived_negatively: true,
            word: "stern"
        }, {
            perceived_negatively: false,
            word: "strict"
        }, {
            perceived_negatively: false,
            word: "rigid"
        }],
        Conscientiousness_plus_Agreeableness_plus: [{
            perceived_negatively: false,
            word: "dependable"
        }, {
            perceived_negatively: false,
            word: "responsible"
        }, {
            perceived_negatively: false,
            word: "reliable"
        }, {
            perceived_negatively: false,
            word: "mannerly"
        }, {
            perceived_negatively: false,
            word: "considerate"
        }],
        Conscientiousness_plus_Extraversion_minus: [{
            perceived_negatively: false,
            word: "cautious"
        }, {
            perceived_negatively: false,
            word: "confident"
        }, {
            perceived_negatively: false,
            word: "punctual"
        }, {
            perceived_negatively: false,
            word: "formal"
        }, {
            perceived_negatively: false,
            word: "thrifty"
        }, {
            perceived_negatively: false,
            word: "principled"
        }],
        Conscientiousness_plus_Extraversion_plus: [{
            perceived_negatively: false,
            word: "ambitious"
        }, {
            perceived_negatively: false,
            word: "alert"
        }, {
            perceived_negatively: false,
            word: "firm"
        }, {
            perceived_negatively: false,
            word: "purposeful"
        }, {
            perceived_negatively: false,
            word: "competitive"
        }],
        Conscientiousness_plus_Neuroticism_minus: [{
            perceived_negatively: false,
            word: "thorough"
        }, {
            perceived_negatively: false,
            word: "steady"
        }, {
            perceived_negatively: false,
            word: "consistent"
        }, {
            perceived_negatively: false,
            word: "self-disciplined"
        }, {
            perceived_negatively: false,
            word: "logical"
        }, {
            perceived_negatively: false,
            word: "decisive"
        }, {
            perceived_negatively: false,
            word: "controlled"
        }, {
            perceived_negatively: false,
            word: "concise"
        }],
        Conscientiousness_plus_Neuroticism_plus: [{
            perceived_negatively: false,
            word: "particular"
        }, {
            perceived_negatively: true,
            word: "high-strung"
        }],
        Conscientiousness_plus_Openness_minus: [{
            perceived_negatively: false,
            word: "traditional"
        }, {
            perceived_negatively: false,
            word: "conventional"
        }],
        Conscientiousness_plus_Openness_plus: [{
            perceived_negatively: false,
            word: "sophisticated"
        }, {
            perceived_negatively: false,
            word: "perfectionistic"
        }, {
            perceived_negatively: false,
            word: "industrious"
        }, {
            perceived_negatively: false,
            word: "dignified"
        }, {
            perceived_negatively: false,
            word: "refined"
        }, {
            perceived_negatively: false,
            word: "cultured"
        }, {
            perceived_negatively: false,
            word: "foresighted"
        }],
        Extraversion_minus_Agreeableness_minus: [{
            perceived_negatively: false,
            word: "skeptical"
        }, {
            perceived_negatively: false,
            word: "wary of others"
        }, {
            perceived_negatively: true,
            word: "seclusive"
        }, {
            perceived_negatively: true,
            word: "uncommunicative"
        }, {
            perceived_negatively: true,
            word: "unsociable"
        }, {
            perceived_negatively: true,
            word: "glum"
        }, {
            perceived_negatively: true,
            word: "detached"
        }, {
            perceived_negatively: false,
            word: "aloof"
        }],
        Extraversion_minus_Agreeableness_plus: [{
            perceived_negatively: false,
            word: "unaggressive"
        }, {
            perceived_negatively: false,
            word: "humble"
        }, {
            perceived_negatively: false,
            word: "submissive"
        }, {
            perceived_negatively: false,
            word: "timid"
        }, {
            perceived_negatively: false,
            word: "compliant"
        }, {
            perceived_negatively: false,
            word: "naïve"
        }],
        Extraversion_minus_Conscientiousness_minus: [{
            perceived_negatively: true,
            word: "indirect"
        }, {
            perceived_negatively: true,
            word: "unenergetic"
        }, {
            perceived_negatively: true,
            word: "sluggish"
        }, {
            perceived_negatively: true,
            word: "nonpersistent"
        }, {
            perceived_negatively: true,
            word: "vague"
        }],
        Extraversion_minus_Conscientiousness_plus: [{
            perceived_negatively: false,
            word: "restrained"
        }, {
            perceived_negatively: false,
            word: "serious"
        }, {
            perceived_negatively: false,
            word: "discreet"
        }, {
            perceived_negatively: false,
            word: "cautious"
        }, {
            perceived_negatively: false,
            word: "principled"
        }],
        Extraversion_minus_Neuroticism_minus: [{
            perceived_negatively: false,
            word: "tranquil"
        }, {
            perceived_negatively: false,
            word: "sedate"
        }, {
            perceived_negatively: false,
            word: "placid"
        }, {
            perceived_negatively: false,
            word: "impartial"
        }, {
            perceived_negatively: false,
            word: "unassuming"
        }, {
            perceived_negatively: false,
            word: "acquiescent"
        }],
        Extraversion_minus_Neuroticism_plus: [{
            perceived_negatively: false,
            word: "guarded"
        }, {
            perceived_negatively: false,
            word: "pessimistic"
        }, {
            perceived_negatively: false,
            word: "secretive"
        }, {
            perceived_negatively: true,
            word: "cowardly"
        }, {
            perceived_negatively: false,
            word: "secretive"
        }],
        Extraversion_minus_Openness_minus: [{
            perceived_negatively: false,
            word: "somber"
        }, {
            perceived_negatively: true,
            word: "meek"
        }, {
            perceived_negatively: true,
            word: "unadventurous"
        }, {
            perceived_negatively: false,
            word: "passive"
        }, {
            perceived_negatively: true,
            word: "apathetic"
        }, {
            perceived_negatively: false,
            word: "docile"
        }],
        Extraversion_minus_Openness_plus: [{
            perceived_negatively: false,
            word: "inner-directed"
        }, {
            perceived_negatively: false,
            word: "introspective"
        }, {
            perceived_negatively: false,
            word: "meditative"
        }, {
            perceived_negatively: false,
            word: "contemplating"
        }, {
            perceived_negatively: false,
            word: "self-examining"
        }],
        Extraversion_plus_Agreeableness_minus: [{
            perceived_negatively: false,
            word: "opinionated"
        }, {
            perceived_negatively: true,
            word: "forceful"
        }, {
            perceived_negatively: true,
            word: "domineering"
        }, {
            perceived_negatively: true,
            word: "boastful"
        }, {
            perceived_negatively: true,
            word: "bossy"
        }, {
            perceived_negatively: false,
            word: "dominant"
        }, {
            perceived_negatively: false,
            word: "cunning"
        }],
        Extraversion_plus_Agreeableness_plus: [{
            perceived_negatively: false,
            word: "social"
        }, {
            perceived_negatively: false,
            word: "energetic"
        }, {
            perceived_negatively: false,
            word: "enthusiastic"
        }, {
            perceived_negatively: false,
            word: "communicative"
        }, {
            perceived_negatively: false,
            word: "vibrant"
        }, {
            perceived_negatively: false,
            word: "spirited"
        }, {
            perceived_negatively: false,
            word: "magnetic"
        }, {
            perceived_negatively: false,
            word: "zestful"
        }],
        Extraversion_plus_Conscientiousness_minus: [{
            perceived_negatively: false,
            word: "boisterous"
        }, {
            perceived_negatively: false,
            word: "mischievous"
        }, {
            perceived_negatively: false,
            word: "exhibitionistic"
        }, {
            perceived_negatively: false,
            word: "gregarious"
        }, {
            perceived_negatively: false,
            word: "demonstrative"
        }],
        Extraversion_plus_Conscientiousness_plus: [{
            perceived_negatively: false,
            word: "active"
        }, {
            perceived_negatively: false,
            word: "competitive"
        }, {
            perceived_negatively: false,
            word: "persistent"
        }, {
            perceived_negatively: false,
            word: "ambitious"
        }, {
            perceived_negatively: false,
            word: "purposeful"
        }],
        Extraversion_plus_Neuroticism_minus: [{
            perceived_negatively: false,
            word: "confident"
        }, {
            perceived_negatively: false,
            word: "bold"
        }, {
            perceived_negatively: false,
            word: "assured"
        }, {
            perceived_negatively: false,
            word: "uninhibited"
        }, {
            perceived_negatively: false,
            word: "courageous"
        }, {
            perceived_negatively: false,
            word: "brave"
        }, {
            perceived_negatively: false,
            word: "self-satisfied"
        }, {
            perceived_negatively: false,
            word: "vigorous"
        }, {
            perceived_negatively: false,
            word: "strong"
        }],
        Extraversion_plus_Neuroticism_plus: [{
            perceived_negatively: false,
            word: "explosive"
        }, {
            perceived_negatively: true,
            word: "wordy"
        }, {
            perceived_negatively: false,
            word: "extravagant"
        }, {
            perceived_negatively: true,
            word: "volatile"
        }, {
            perceived_negatively: false,
            word: "flirtatious"
        }],
        Extraversion_plus_Openness_minus: [{
            perceived_negatively: true,
            word: "verbose"
        }, {
            perceived_negatively: true,
            word: "unscrupulous"
        }, {
            perceived_negatively: true,
            word: "pompous"
        }],
        Extraversion_plus_Openness_plus: [{
            perceived_negatively: false,
            word: "expressive"
        }, {
            perceived_negatively: false,
            word: "candid"
        }, {
            perceived_negatively: false,
            word: "dramatic"
        }, {
            perceived_negatively: false,
            word: "spontaneous"
        }, {
            perceived_negatively: false,
            word: "witty"
        }, {
            perceived_negatively: false,
            word: "opportunistic"
        }, {
            perceived_negatively: false,
            word: "independent"
        }],
        Neuroticism_minus_Agreeableness_minus: [{
            perceived_negatively: true,
            word: "unemotional"
        }, {
            perceived_negatively: true,
            word: "insensitive"
        }, {
            perceived_negatively: true,
            word: "unaffectionate"
        }, {
            perceived_negatively: true,
            word: "passionless"
        }],
        Neuroticism_minus_Agreeableness_plus: [{
            perceived_negatively: false,
            word: "patient"
        }, {
            perceived_negatively: false,
            word: "relaxed"
        }, {
            perceived_negatively: false,
            word: "undemanding"
        }, {
            perceived_negatively: false,
            word: "down-to-earth"
        }, {
            perceived_negatively: false,
            word: "optimistic"
        }, {
            perceived_negatively: false,
            word: "conceitless"
        }, {
            perceived_negatively: false,
            word: "uncritical"
        }, {
            perceived_negatively: false,
            word: "unpretentious"
        }],
        Neuroticism_minus_Conscientiousness_minus: [{
            perceived_negatively: false,
            word: "informal"
        }, {
            perceived_negatively: false,
            word: "low-key"
        }],
        Neuroticism_minus_Conscientiousness_plus: [{
            perceived_negatively: false,
            word: "rational"
        }, {
            perceived_negatively: false,
            word: "objective"
        }, {
            perceived_negatively: false,
            word: "steady"
        }, {
            perceived_negatively: false,
            word: "logical"
        }, {
            perceived_negatively: false,
            word: "decisive"
        }, {
            perceived_negatively: false,
            word: "poised"
        }, {
            perceived_negatively: false,
            word: "concise"
        }, {
            perceived_negatively: false,
            word: "thorough"
        }, {
            perceived_negatively: false,
            word: "economical"
        }, {
            perceived_negatively: false,
            word: "self-disciplined"
        }],
        Neuroticism_minus_Extraversion_minus: [{
            perceived_negatively: false,
            word: "unassuming"
        }, {
            perceived_negatively: true,
            word: "unexcitable"
        }, {
            perceived_negatively: false,
            word: "placid"
        }, {
            perceived_negatively: false,
            word: "tranquil"
        }],
        Neuroticism_minus_Extraversion_plus: [{
            perceived_negatively: false,
            word: "unselfconscious"
        }, {
            perceived_negatively: false,
            word: "weariless"
        }, {
            perceived_negatively: false,
            word: "indefatigable"
        }],
        Neuroticism_minus_Openness_minus: [{
            perceived_negatively: false,
            word: "imperturbable"
        }, {
            perceived_negatively: true,
            word: "insensitive"
        }],
        Neuroticism_minus_Openness_plus: [{
            perceived_negatively: false,
            word: "heartfelt"
        }, {
            perceived_negatively: false,
            word: "versatile"
        }, {
            perceived_negatively: false,
            word: "creative"
        }, {
            perceived_negatively: false,
            word: "intellectual"
        }, {
            perceived_negatively: false,
            word: "insightful"
        }],
        Neuroticism_plus_Agreeableness_minus: [{
            perceived_negatively: true,
            word: "temperamental"
        }, {
            perceived_negatively: true,
            word: "irritable"
        }, {
            perceived_negatively: true,
            word: "quarrelsome"
        }, {
            perceived_negatively: true,
            word: "impatient"
        }, {
            perceived_negatively: true,
            word: "grumpy"
        }, {
            perceived_negatively: true,
            word: "crabby"
        }, {
            perceived_negatively: true,
            word: "cranky"
        }],
        Neuroticism_plus_Agreeableness_plus: [{
            perceived_negatively: false,
            word: "emotional"
        }, {
            perceived_negatively: true,
            word: "gullible"
        }, {
            perceived_negatively: false,
            word: "affectionate"
        }, {
            perceived_negatively: false,
            word: "sensitive"
        }, {
            perceived_negatively: false,
            word: "soft"
        }],
        Neuroticism_plus_Conscientiousness_minus: [{
            perceived_negatively: true,
            word: "compulsive"
        }, {
            perceived_negatively: true,
            word: "nosey"
        }, {
            perceived_negatively: true,
            word: "self-indulgent"
        }, {
            perceived_negatively: true,
            word: "forgetful"
        }, {
            perceived_negatively: true,
            word: "impulsive"
        }],
        Neuroticism_plus_Conscientiousness_plus: [{
            perceived_negatively: false,
            word: "particular"
        }, {
            perceived_negatively: true,
            word: "high-strung"
        }],
        Neuroticism_plus_Extraversion_minus: [{
            perceived_negatively: false,
            word: "guarded"
        }, {
            perceived_negatively: true,
            word: "fretful"
        }, {
            perceived_negatively: true,
            word: "insecure"
        }, {
            perceived_negatively: true,
            word: "pessimistic"
        }, {
            perceived_negatively: false,
            word: "secretive"
        }, {
            perceived_negatively: true,
            word: "fearful"
        }, {
            perceived_negatively: true,
            word: "negativistic"
        }, {
            perceived_negatively: false,
            word: "self-critical"
        }],
        Neuroticism_plus_Extraversion_plus: [{
            perceived_negatively: false,
            word: "excitable"
        }, {
            perceived_negatively: true,
            word: "wordy"
        }, {
            perceived_negatively: false,
            word: "flirtatious"
        }, {
            perceived_negatively: true,
            word: "explosive"
        }, {
            perceived_negatively: false,
            word: "extravagant"
        }, {
            perceived_negatively: true,
            word: "volatile"
        }],
        Neuroticism_plus_Openness_minus: [{
            perceived_negatively: false,
            word: "easily rattled"
        }, {
            perceived_negatively: false,
            word: "easily irked"
        }, {
            perceived_negatively: false,
            word: "apprehensive"
        }],
        Neuroticism_plus_Openness_plus: [{
            perceived_negatively: false,
            word: "excitable"
        }, {
            perceived_negatively: false,
            word: "passionate"
        }, {
            perceived_negatively: false,
            word: "sensual"
        }],
        Openness_minus_Agreeableness_minus: [{
            perceived_negatively: true,
            word: "coarse"
        }, {
            perceived_negatively: true,
            word: "tactless"
        }, {
            perceived_negatively: true,
            word: "curt"
        }, {
            perceived_negatively: true,
            word: "narrow-minded"
        }, {
            perceived_negatively: true,
            word: "callous"
        }],
        Openness_minus_Agreeableness_plus: [{
            perceived_negatively: true,
            word: "simple"
        }, {
            perceived_negatively: true,
            word: "dependent"
        }],
        Openness_minus_Conscientiousness_minus: [{
            perceived_negatively: true,
            word: "shortsighted"
        }, {
            perceived_negatively: false,
            word: "foolhardy"
        }, {
            perceived_negatively: true,
            word: "illogical"
        }, {
            perceived_negatively: true,
            word: "immature"
        }, {
            perceived_negatively: true,
            word: "haphazard"
        }, {
            perceived_negatively: false,
            word: "lax"
        }, {
            perceived_negatively: true,
            word: "flippant"
        }],
        Openness_minus_Conscientiousness_plus: [{
            perceived_negatively: false,
            word: "conventional"
        }, {
            perceived_negatively: false,
            word: "traditional"
        }],
        Openness_minus_Extraversion_minus: [{
            perceived_negatively: false,
            word: "predictable"
        }, {
            perceived_negatively: true,
            word: "unimaginative"
        }, {
            perceived_negatively: false,
            word: "somber"
        }, {
            perceived_negatively: true,
            word: "apathetic"
        }, {
            perceived_negatively: true,
            word: "unadventurous"
        }],
        Openness_minus_Extraversion_plus: [{
            perceived_negatively: true,
            word: "verbose"
        }, {
            perceived_negatively: true,
            word: "unscrupulous"
        }, {
            perceived_negatively: true,
            word: "pompous"
        }],
        Openness_minus_Neuroticism_minus: [{
            perceived_negatively: false,
            word: "imperturbable"
        }, {
            perceived_negatively: true,
            word: "insensitive"
        }],
        Openness_minus_Neuroticism_plus: [{
            perceived_negatively: false,
            word: "easily rattled"
        }, {
            perceived_negatively: false,
            word: "easily irked"
        }, {
            perceived_negatively: false,
            word: "apprehensive"
        }],
        Openness_plus_Agreeableness_minus: [{
            perceived_negatively: false,
            word: "shrewd"
        }, {
            perceived_negatively: false,
            word: "eccentric"
        }, {
            perceived_negatively: false,
            word: "individualistic"
        }],
        Openness_plus_Agreeableness_plus: [{
            perceived_negatively: false,
            word: "idealistic"
        }, {
            perceived_negatively: false,
            word: "diplomatic"
        }, {
            perceived_negatively: false,
            word: "deep"
        }, {
            perceived_negatively: false,
            word: "tactful"
        }, {
            perceived_negatively: false,
            word: "genial"
        }],
        Openness_plus_Conscientiousness_minus: [{
            perceived_negatively: false,
            word: "unconventional"
        }, {
            perceived_negatively: false,
            word: "quirky"
        }],
        Openness_plus_Conscientiousness_plus: [{
            perceived_negatively: false,
            word: "analytical"
        }, {
            perceived_negatively: false,
            word: "perceptive"
        }, {
            perceived_negatively: false,
            word: "informative"
        }, {
            perceived_negatively: false,
            word: "articulate"
        }, {
            perceived_negatively: false,
            word: "dignified"
        }, {
            perceived_negatively: false,
            word: "cultured"
        }],
        Openness_plus_Extraversion_minus: [{
            perceived_negatively: false,
            word: "introspective"
        }, {
            perceived_negatively: false,
            word: "meditative"
        }, {
            perceived_negatively: false,
            word: "contemplating"
        }, {
            perceived_negatively: false,
            word: "self-examining"
        }, {
            perceived_negatively: false,
            word: "inner-directed"
        }],
        Openness_plus_Extraversion_plus: [{
            perceived_negatively: false,
            word: "worldly"
        }, {
            perceived_negatively: false,
            word: "theatrical"
        }, {
            perceived_negatively: false,
            word: "eloquent"
        }, {
            perceived_negatively: false,
            word: "inquisitive"
        }, {
            perceived_negatively: false,
            word: "intense"
        }],
        Openness_plus_Neuroticism_minus: [{
            perceived_negatively: false,
            word: "creative"
        }, {
            perceived_negatively: false,
            word: "intellectual"
        }, {
            perceived_negatively: false,
            word: "insightful"
        }, {
            perceived_negatively: false,
            word: "versatile"
        }, {
            perceived_negatively: false,
            word: "inventive"
        }],
        Openness_plus_Neuroticism_plus: [{
            perceived_negatively: false,
            word: "passionate"
        }, {
            perceived_negatively: false,
            word: "excitable"
        }, {
            perceived_negatively: false,
            word: "sensual"
        }]
    },
    values: {
        Hedonism: [{
            Term: "Taking pleasure in life",
            LowDescription: "Subject prefers activities with a purpose greater than just personal enjoyment",
            HighDescription: "Subject is  highly motivated to enjoy life to its fullest"
        }],
        "Self-transcendence": [{
            Term: "Helping others",
            LowDescription: "Subject thinks people can handle their own business without interference",
            HighDescription: "Subject thinks it is important to take care of the people around them"
        }, {
            Term: "Fairness",
            LowDescription: "Subject believes that people create their own opportunities",
            HighDescription: "Subject believes in social justice and equality for all"
        }, {
            Term: "Social justice",
            LowDescription: "Subject believes that people create their own opportunities",
            HighDescription: "Subject believes in social justice and equality for all"
        }, {
            Term: "Equality",
            LowDescription: "Subject believes that people create their own opportunities",
            HighDescription: "Subject believes in social justice and equality for all"
        }, {
            Term: "Community service",
            LowDescription: "Subject thinks people can handle their own business without interference",
            HighDescription: "Subject thinks it is important to take care of the people around them"
        }],
        Conservation: [{
            Term: "Tradition",
            LowDescription: "Subject cares more about making their own path than following what others have done",
            HighDescription: "Subject highly respects the groups they belong to and follows their guidance"
        }, {
            Term: "Harmony",
            LowDescription: "Subject decides what is right based on their beliefs, not what other people think",
            HighDescription: "Subject knows rules are there for a reason, and tries never to break them"
        }, {
            Term: "Humility",
            LowDescription: "Subject decides what is right based on their beliefs, not what other people think",
            HighDescription: "Subject sees worth in deferring to others"
        }, {
            Term: "Social norms",
            LowDescription: "Subject decides what is right based on their beliefs, not what other people think",
            HighDescription: "Subject knows rules are there for a reason, and tries never to break them"
        }, {
            Term: "Security",
            LowDescription: "Subject believes that security is worth sacrificing to achieve other goals",
            HighDescription: "Subject believes that safety and security are important things to safeguard"
        }, {
            Term: "Safety",
            LowDescription: "Subject believes that safety is worth sacrificing to achieve other goals",
            HighDescription: "Subject believes that safety and security are important things to safeguard"
        }],
        "Openness-to-change": [{
            term: "independence",
            LowDescription: "Subject welcomes when others direct their activities for them",
            HighDescription: "Subject likes to set their own goals to decide how to best achieve them"
        }, {
            Term: "Excitement",
            LowDescription: "Subject would rather stick with things they already know they like than risk trying something new and risky",
            HighDescription: "Subject is eager to search out new and exciting experiences"
        }, {
            Term: "Creativity",
            LowDescription: "Subject would rather stick with things they already know they like than risk trying something new and risky",
            HighDescription: "Subject is eager to search out new and exciting experiences"
        }, {
            Term: "Curiosity",
            LowDescription: "Subject would rather stick with things they already know they like than risk trying something new and risky",
            HighDescription: "Subject is eager to search out new and exciting experiences"
        }, {
            Term: "Self-direction",
            LowDescription: "Subject welcomes when others direct their activities for them",
            HighDescription: "Subject likes to set their own goals to decide how to best achieve them"
        }, {
            Term: "Freedom",
            LowDescription: "Subject welcomes when others direct their activities for them",
            HighDescription: "Subject likes to set their own goals to decide how to best achieve them"
        }],
        "Self-enhancement": [{
            Term: "Achieving success",
            LowDescription: "Subject makes a decision with little regard for how it shows off their talents",
            HighDescription: "Subject seeks out opportunities to improve themself and demonstrate that they are a capable person"
        }, {
            Term: "Gaining social status",
            LowDescription: "Subject is comfortable with their social status and doesn't feel a strong need to improve it",
            HighDescription: "Subject puts substantial effort into improving their status and public image"
        }, {
            Term: "Ambition",
            LowDescription: "Subject is comfortable with their social status and doesn't feel a strong need to improve it",
            HighDescription: "Subject feels it is important to push forward towards goals"
        }, {
            Term: "High achievement",
            LowDescription: "Subject makes a decision with little regard for how it shows off their talents",
            HighDescription: "Subject seeks out opportunities to improve themself and demonstrate that they are a capable person"
        }]
    }
};
