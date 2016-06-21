'use strict';

angular.module('pi.summary', []).service('SummaryService', ['SummaryFormat', 'SummaryI18n', 'DataService', function (SummaryFormat, SummaryI18n, DataService) {

    //var format = require("./format.js");
    //    var i18n = require("./i18n.js");


    var lang = "en";

    var self = {};
    var dictionary = SummaryI18n.getDictionary(lang);
    var tphrase = SummaryI18n.translatorFactory.createTranslator(dictionary.phrases); // i18n for phrases

    // Download all static data.
    self.circumplexData = dictionary.traits;
    self.facetsData = dictionary.facets;
    self.valuesData = dictionary.values;
    self.needsData = dictionary.needs;

    function compareByRelevance(o1, o2) {
        var result = 0;

        if (Math.abs(0.5 - o1.percentage) > Math.abs(0.5 - o2.percentage)) {
            result = -1; // A trait with 1% is more interesting than one with 60%.
        }

        if (Math.abs(0.5 - o1.percentage) < Math.abs(0.5 - o2.percentage)) {
            result = 1;
        }

        return result;
    }

    function compareByValue(o1, o2) {
        var result = 0;

        if (Math.abs(o1.percentage) > Math.abs(o2.percentage)) {
            result = -1; // 100 % has precedence over 99%
        }

        if (Math.abs(o1.percentage) < Math.abs(o2.percentage)) {
            result = 1;
        }

        return result;
    }

    function getCircumplexAdjective(p1, p2, order) {
        // Sort the personality traits in the order the JSON file stored it.
        var ordered = [p1, p2].sort(function (o1, o2) {
                var i1 = "EANOC".indexOf(o1.id.charAt(0)),
                    i2 = "EANOC".indexOf(o2.id.charAt(0));

                return i1 < i2 ? -1 : 1;
            });

        
        // Assemble the identifier as the JSON file stored it.
        var identifier = ordered[0].id.concat(ordered[0].percentage > 0.5 ? "_plus_" : "_minus_").concat(ordered[1].id).concat(ordered[1].percentage > 0.5 ? "_plus" : "_minus");
        
        var cdi = self.circumplexData[identifier];
        
        if((!cdi) || (cdi.length<=1)){
            console.error("Could not find " +identifier+" in circumplex data.")
            return null;
        }
        var traitMult = cdi[0], sentence = "%s";

        if (traitMult.perceived_negatively) {
            switch (order) {
                case 0:
                    sentence = tphrase("a bit %s");
                    break;
                case 1:
                    sentence = tphrase("somewhat %s");
                    break;
                case 2:
                    sentence = tphrase("can be perceived as %s");
                    break;
            }
        }

        return SummaryFormat.format(sentence, traitMult.word);
    }
    
    function getCircumplexAdjectiveSingle(p1, p2, order) {
        // Sort the personality traits in the order the JSON file stored it.
        var ordered = [p1, p2].sort(function (o1, o2) {
                var i1 = "EANOC".indexOf(o1.id.charAt(0)),
                    i2 = "EANOC".indexOf(o2.id.charAt(0));

                return i1 < i2 ? -1 : 1;
            });

        
        // Assemble the identifier as the JSON file stored it.
        var identifier = ordered[0].id.concat(ordered[0].percentage > 0.5 ? "_plus_" : "_minus_").concat(ordered[1].id).concat(ordered[1].percentage > 0.5 ? "_plus" : "_minus");
        
        var cdi = self.circumplexData[identifier];
        
        if((!cdi) || (cdi.length<=1)){
            console.error("Could not find " +identifier+" in circumplex data.")
            return null;
        }
        var traitMult = cdi[0], sentence = "%s";

        if (traitMult.perceived_negatively) {
            switch (order) {
                case 0:
                    sentence = tphrase("a bit %s");
                    break;
                case 1:
                    sentence = tphrase("somewhat %s");
                    break;
                case 2:
                    sentence = tphrase("can be perceived as %s");
                    break;
            }
        }

        return SummaryFormat.format(sentence, traitMult.word);
    }

    function getFacetInfo(f) {
        var data = self.facetsData[f.id.replace("_", "-").replace(" ", "-")],
            t,
            d;
        
        if (!data){
            console.error("Facet "+f.id+" not found!");
            return null;
        }

        //console.log("Facet " + f.id);
        if (f.percentage > 0.5) {
            t = data.HighTerm.toLowerCase();
            d = data.HighDescription.toLowerCase();
        } else {
            t = data.LowTerm.toLowerCase();
            d = data.LowDescription.toLowerCase();
        }

        return {
            name: f.id,
            term: t,
            description: d
        };
    }

    function intervalFor(p) {
        // The MIN handles the special case for 100%.
        return Math.min(Math.floor(p * 4), 3);
    }

    function getInfoForValue(v) {
        try{
        var data = self.valuesData[v.id.replace(/[_ ]/g, "-")][0];
        var d = v.percentage > 0.5 ? data.HighDescription : data.LowDescription;
    } catch (err){
        console.error("Error in getting info for "+ JSON.stringify(v) +" value: " + err);
    }
            return {
                name: v.id,
                term: data.Term.toLowerCase(),
                description: d
            };
    }

    function getWordsForNeed(n) {
        // Assemble the identifier as the JSON file stored it.
        var traitMult = self.needsData[n.id];
        return traitMult;
    }

    function assembleTraits(personalityTree) {
        var sentences = [],
            big5elements = [],
            relevantBig5,
            adj,
            adj1,
            adj2,
            adj3;

        // Sort the Big 5 based on how extreme the number is.
        personalityTree.children[0].children.forEach(function (p) {
            big5elements.push({
                id: p.id,
                percentage: p.percentage
            });
        });
        big5elements.sort(compareByRelevance);

        // Remove everything between 32% and 68%, as it's inside the common people.
        relevantBig5 = big5elements.filter(function (item) {
            return Math.abs(0.5 - item.percentage) > 0.18;
        });
        if (relevantBig5.length < 2) {
            // Even if no Big 5 attribute is interesting, you get 1 adjective.
            relevantBig5 = [big5elements[0], big5elements[1]];
        }

        switch (relevantBig5.length) {
            case 2:
                // Report 1 adjective.
                adj = getCircumplexAdjective(relevantBig5[0], relevantBig5[1], 0);
                sentences.push(SummaryFormat.format(tphrase("Subject may be %s"), adj) + ".");
                break;
            case 3:
                // Report 2 adjectives.
                adj1 = getCircumplexAdjective(relevantBig5[0], relevantBig5[1], 0);
                adj2 = getCircumplexAdjective(relevantBig5[1], relevantBig5[2], 1);
                sentences.push(SummaryFormat.format(tphrase("Subject may be %s and %s"), adj1, adj2) + ".");
                break;
            case 4:
            case 5:
                // Report 3 adjectives.
                adj1 = getCircumplexAdjective(relevantBig5[0], relevantBig5[1], 0);
                adj2 = getCircumplexAdjective(relevantBig5[1], relevantBig5[2], 1);
                adj3 = getCircumplexAdjective(relevantBig5[2], relevantBig5[3], 2);
                sentences.push(SummaryFormat.format(tphrase("Subject may be %s, %s and %s"), adj1, adj2, adj3) + ".");
                break;
        }

        return sentences;
    }
    
    
    
    function assembleTraitsDetails(personalityTree) {
        var details = [],
            big5elements = [],
            adj,
            adj1,
            adj2,
            adj3;

        // Sort the Big 5 based on how extreme the number is.
        personalityTree.children[0].children.forEach(function (p) {
            big5elements.push({
                id: p.id,
                percentage: p.percentage
            });
        });
        
        big5elements.sort(compareByRelevance);

        for (var i = 0; i < big5elements.length; i++) {
            if ((big5elements[i].percentage <= DataService.thresholds.min) || (big5elements[i].percentage >= DataService.thresholds.max)) {
                
                
                // Report 1 adjective.
                adj = getCircumplexAdjective(big5elements[i], big5elements[big5elements.length-1], 0);
                var sentence = SummaryFormat.format(tphrase("Subject may be %s"), adj) + ".";
                
                // Create new details object that we can use to display in the UI
                var d = {};
                d.metric = big5elements[i];
                d.value=big5elements[i].percentage-0.5;
                d.abs = Math.abs(d.value);
                d.sentence = sentence;
                d.adjective = adj;
                details.push(d);
            }
        }

        return details;
    }

    
    function assembleFacets(personalityTree) {
        var sentences = [],
            facetElements = [],
            info,
            i;

        // Assemble the full list of facets and sort them based on how extreme
        // is the number.
        personalityTree.children[0].children.forEach(function (p) {
            p.children.forEach(function (f) {
                facetElements.push({
                    id: f.id,
                    percentage: f.percentage,
                    parent: p
                });
            });
        });
        facetElements.sort(compareByRelevance);

        // Assemble an adjective and description for the two most important facets.
        info = getFacetInfo(facetElements[0]);
        if (info!=null){
            sentences.push(SummaryFormat.format(tphrase("Subject may be %s"), info.term) + ": " + info.description + ".");
        }
        
        info = getFacetInfo(facetElements[1]);
        if (info!=null){
            sentences.push(SummaryFormat.format(tphrase("Subject may be %s"), info.term) + ": " + info.description + ".");
        }
        
        // If all the facets correspond to the same feature, continue until a
        // different parent feature is found.
        i = 2;
        if (facetElements[0].parent === facetElements[1].parent) {
            while (facetElements[0].parent === facetElements[i].parent) {
                i += 1;
            }
        }
        info = getFacetInfo(facetElements[i]);
        if (info!=null){
            sentences.push(SummaryFormat.format(tphrase("And subject may be %s"), info.term) + ": " + info.description + ".");
        }

        return sentences;
    }
    
    

    function assembleFacetsDetails(personalityTree) {
        var details = [],
            facetElements = [],
            i;

        // Assemble the full list of facets and sort them based on how extreme
        // is the number.
        personalityTree.children[0].children.forEach(function (p) {
            p.children.forEach(function (f) {
                facetElements.push({
                    id: f.id,
                    obj: f,
                    parent: p
                });
            });
        });
        facetElements.sort(compareByRelevance);

        for (var i = 0; i < facetElements.length; i++) {
            if ((facetElements[i].percentage <= DataService.thresholds.min) || (facetElements[i].percentage >= DataService.thresholds.max)) {
                var info = getFacetInfo(facetElements[i]);
                if (info!=null){
                    var sentence = SummaryFormat.format(tphrase("Subject may be %s"), info.term) + ": " + info.description + ".\n";
                    
                    // Create new details object that we can use to display in the UI
                    var d = {};
                    d.metric = facetElements[i];
                    d.value=facetElements[i].percentage-0.5;
                    d.abs = Math.abs(d.value);
                    d.sentence = sentence;
                    d.adjective = info.term;
                    d.description = info.description;
                    details.push(d);
                }
            }
        }

        return details;
    }
    
    
    function getTraitDetails(personalityTree) {
        
        
        var sentences = [],
            big5elements = [],
            relevantBig5,
            adj,
            adj1,
            adj2,
            adj3;

        // Sort the Big 5 based on how extreme the number is.
        personalityTree.children[0].children.forEach(function (p) {
            big5elements.push({
                id: p.id,
                percentage: p.percentage
            });
        });
        big5elements.sort(compareByRelevance);

        // Remove everything between 32% and 68%, as it's inside the common people.
        relevantBig5 = big5elements.filter(function (item) {
            return Math.abs(0.5 - item.percentage) > 0.18;
        });
        if (relevantBig5.length < 2) {
            // Even if no Big 5 attribute is interesting, you get 1 adjective.
            relevantBig5 = [big5elements[0], big5elements[1]];
        }

        switch (relevantBig5.length) {
            case 2:
                // Report 1 adjective.
                adj = getCircumplexAdjective(relevantBig5[0], relevantBig5[1], 0);
                sentences.push(SummaryFormat.format(tphrase("Subject may be %s"), adj) + ".");
                break;
            case 3:
                // Report 2 adjectives.
                adj1 = getCircumplexAdjective(relevantBig5[0], relevantBig5[1], 0);
                adj2 = getCircumplexAdjective(relevantBig5[1], relevantBig5[2], 1);
                sentences.push(SummaryFormat.format(tphrase("Subject may be %s and %s"), adj1, adj2) + ".");
                break;
            case 4:
            case 5:
                // Report 3 adjectives.
                adj1 = getCircumplexAdjective(relevantBig5[0], relevantBig5[1], 0);
                adj2 = getCircumplexAdjective(relevantBig5[1], relevantBig5[2], 1);
                adj3 = getCircumplexAdjective(relevantBig5[2], relevantBig5[3], 2);
                sentences.push(SummaryFormat.format(tphrase("Subject may be %s, %s and %s"), adj1, adj2, adj3) + ".");
                break;
        }

                
        // Report 1 adjective.
        varadj = getCircumplexAdjective({id:id,percentage:value}, big5elements[big5elements.length-1], 0);
        var sentence = SummaryFormat.format(tphrase("Subject may be %s"), adj) + ".";

        // Create new details object that we can use to display in the UI
        var d = {};
        d.metric = big5elements[i];
        d.value=big5elements[i].percentage-0.5;
        d.abs = Math.abs(d.value);
        d.sentence = sentence;
        d.adjective = adj;

        return d;
    }

    
    function getFacetDetails(id,value){
        var info = getFacetInfo({id:id,percentage:value});
        if (info!=null){
            var sentence = SummaryFormat.format(tphrase("Subject is %s"), info.term) + ": " + info.description + ".\n";

            // Create new details object that we can use to display in the UI
            var d = {};
            d.id = id;
            d.metric = {id:id,percentage:value};
            d.value=value;
            d.abs = Math.abs(d.value);
            d.sentence = sentence;
            d.adjective = info.term;
            d.description = info.description;
            return d;
        }
        return null;
    }
    
    function getNeedDetails(id,value){
        try{
        // Get the words required.
        var word = self.needsData[id][0];
        } catch(err){
            console.error("error");
        }
            
            var sentence = "";

        // Form the right sentence for the single need.
        switch (intervalFor(value)) {
            case 0:
                sentence = tphrase("Experiences that make subject feel high %s may be generally unappealing to them");
                break;
            case 1:
                sentence = tphrase("Experiences that give a sense of %s may hold some appeal to them");
                break;
            case 2:
                sentence = tphrase("Subject may be motivated to seek out experiences that provide a strong feeling of %s");
                break;
            case 3:
                sentence = tphrase("Subject's choices may be driven by a desire for %s");
                break;
        }
        sentence = SummaryFormat.format(sentence, word).concat(".");

        // Create new details object that we can use to display in the UI
        var d = {};
        d.id = id;
        d.value=value-0.5;
        d.abs = Math.abs(d.value);
        d.sentence = sentence;
        d.adjective = word;
        
        return d;
    }
    
    /**
     * Assemble the list of values and sort them based on relevance.
     */
    function getValueDetails(id,value) {

        // Get all the text and data required.
        var info1 = getInfoForValue({id:id,percentage:value});
 
        // Process it this way because the code is the same.
        switch (intervalFor(value)) {
            case 0:
                sentence = SummaryFormat.format(tphrase("Subject may be relatively unconcerned with %s"), info1.term);
                break;
            case 1:
                sentence = SummaryFormat.format(tphrase("Subject may not find %s to be particularly motivating for them"), info1.term);
                break;
            case 2:
                sentence = SummaryFormat.format(tphrase("Subject may value %s a bit more"), info1.term);
                break;
            case 3:
                sentence = SummaryFormat.format(tphrase("Subject may consider %s to guide a large part of what they do"), info1.term);
                break;
        }

        var sentence = sentence.concat(": ").concat(info1.description.toLowerCase()).concat(".");
        
        // Create new details object that we can use to display in the UI
        var d = {};
        d.id = id;
        d.value=value-0.5;
        d.abs = Math.abs(d.value);
        d.sentence = sentence;
        d.adjective = info1.term;
        
        return d;
    }

    /**
     * Assemble the list of values and sort them based on relevance.
     */
    function assembleValues(valuesTree) {
        var sentences = [],
            valuesList = [],
            sameQI,
            info1,
            info2,
            sentence,
            valuesInfo,
            i,
            term1,
            term2;

        valuesTree.children[0].children.forEach(function (p) {
            valuesList.push({
                id: p.id,
                percentage: p.percentage
            });
        });
        valuesList.sort(compareByRelevance);

        // Are the two most relevant in the same quartile interval? (e.g. 0%-25%)
        sameQI = intervalFor(valuesList[0].percentage) === intervalFor(valuesList[1].percentage);

        // Get all the text and data required.
        info1 = getInfoForValue(valuesList[0]);
        info2 = getInfoForValue(valuesList[1]);

        if (sameQI) {
            // Assemble the first 'both' sentence.
            term1 = info1.term;
            term2 = info2.term;
            switch (intervalFor(valuesList[0].percentage)) {
                case 0:
                    sentence = SummaryFormat.format(tphrase("Subject may be relatively unconcerned with both %s and %s"), term1, term2) + ".";
                    break;
                case 1:
                    sentence = SummaryFormat.format(tphrase("Subject may not find either %s or %s to be particularly motivating for them"), term1, term2) + ".";
                    break;
                case 2:
                    sentence = SummaryFormat.format(tphrase("Subject may value both %s and %s a bit"), term1, term2) + ".";
                    break;
                case 3:
                    sentence = SummaryFormat.format(tphrase("Subject may consider both %s and %s to guide a large part of what they do"), term1, term2) + ".";
                    break;
            }
            sentences.push(sentence);

            // Assemble the final strings in the correct format.
            sentences.push(info1.description + ".");
            sentences.push(SummaryFormat.format(tphrase("And %s"), info2.description.toLowerCase()) + ".");
        } else {
            valuesInfo = [info1, info2];
            for (i = 0; i < valuesInfo.length; i += 1) {
                // Process it this way because the code is the same.
                switch (intervalFor(valuesList[i].percentage)) {
                    case 0:
                        sentence = SummaryFormat.format(tphrase("Subject may be relatively unconcerned with %s"), valuesInfo[i].term);
                        break;
                    case 1:
                        sentence = SummaryFormat.format(tphrase("Subject may not find %s to be particularly motivating for them"), valuesInfo[i].term);
                        break;
                    case 2:
                        sentence = SummaryFormat.format(tphrase("Subject may value %s a bit more"), valuesInfo[i].term);
                        break;
                    case 3:
                        sentence = SummaryFormat.format(tphrase("Subject may consider %s to guide a large part of what they do"), valuesInfo[i].term);
                        break;
                }
                
                sentence = sentence.concat(": ").concat(valuesInfo[i].description.toLowerCase()).concat(".");
                sentences.push(sentence);
            }
        }

        return sentences;
    }
    
      function assembleValuesDetails(valuesTree) {
        var sentences = [],
            valuesList = [],
            sameQI,
            info1,
            info2,
            sentence,
            valuesInfo,
            i,
            term1,
            term2;

        valuesTree.children[0].children.forEach(function (p) {
            valuesList.push({
                id: p.id,
                percentage: p.percentage
            });
        });
        valuesList.sort(compareByRelevance);

        // Are the two most relevant in the same quartile interval? (e.g. 0%-25%)
        sameQI = intervalFor(valuesList[0].percentage) === intervalFor(valuesList[1].percentage);

        // Get all the text and data required.
        info1 = getInfoForValue(valuesList[0]);
        info2 = getInfoForValue(valuesList[1]);

        if (sameQI) {
            // Assemble the first 'both' sentence.
            term1 = info1.term;
            term2 = info2.term;
            switch (intervalFor(valuesList[0].percentage)) {
                case 0:
                    sentence = SummaryFormat.format(tphrase("Subject may be relatively unconcerned with both %s and %s"), term1, term2) + ".";
                    break;
                case 1:
                    sentence = SummaryFormat.format(tphrase("Subject may not find either %s or %s to be particularly motivating for them"), term1, term2) + ".";
                    break;
                case 2:
                    sentence = SummaryFormat.format(tphrase("Subject may value both %s and %s a bit"), term1, term2) + ".";
                    break;
                case 3:
                    sentence = SummaryFormat.format(tphrase("Subject may consider both %s and %s to guide a large part of what they do"), term1, term2) + ".";
                    break;
            }
            sentences.push(sentence);

            // Assemble the final strings in the correct format.
            sentences.push(info1.description + ".");
            sentences.push(SummaryFormat.format(tphrase("And %s"), info2.description.toLowerCase()) + ".");
        } else {
            valuesInfo = [info1, info2];
            for (i = 0; i < valuesInfo.length; i += 1) {
                // Process it this way because the code is the same.
                switch (intervalFor(valuesList[i].percentage)) {
                    case 0:
                        sentence = SummaryFormat.format(tphrase("Subject may be relatively unconcerned with %s"), valuesInfo[i].term);
                        break;
                    case 1:
                        sentence = SummaryFormat.format(tphrase("Subject may not find %s to be particularly motivating for them"), valuesInfo[i].term);
                        break;
                    case 2:
                        sentence = SummaryFormat.format(tphrase("Subject may value %s a bit more"), valuesInfo[i].term);
                        break;
                    case 3:
                        sentence = SummaryFormat.format(tphrase("Subject may consider %s to guide a large part of what they do"), valuesInfo[i].term);
                        break;
                }
                sentence = sentence.concat(": ").concat(valuesInfo[i].description.toLowerCase()).concat(".");
                sentences.push(sentence);
            }
        }

        return sentences;
    }


    /**
     * Assemble the list of needs and sort them based on value.
     */
    function assembleNeeds(needsTree) {
        var sentences = [],
            needsList = [],
            word,
            sentence;

        needsTree.children[0].children.forEach(function (p) {
            needsList.push({
                id: p.id,
                percentage: p.percentage
            });
        });
        needsList.sort(compareByValue);

        // Get the words required.
        word = getWordsForNeed(needsList[0])[0];

        // Form the right sentence for the single need.
        switch (intervalFor(needsList[0].percentage)) {
            case 0:
                sentence = tphrase("Experiences that make subject feel high %s may be generally unappealing to them");
                break;
            case 1:
                sentence = tphrase("Experiences that give a sense of %s may hold some appeal to them");
                break;
            case 2:
                sentence = tphrase("Subject may be motivated to seek out experiences that provide a strong feeling of %s");
                break;
            case 3:
                sentence = tphrase("Subject's choices may be driven by a desire for %s");
                break;
        }
        sentence = SummaryFormat.format(sentence, word).concat(".");
        sentences.push(sentence);

        return sentences;
    }
    
    
    /**
     * Assemble the list of needs and sort them based on value.
     */
    function assembleNeedsDetails(needsTree) {
        var details = [],
            needsList = [],
            word,
            sentence;

        needsTree.children[0].children.forEach(function (p) {
            needsList.push({
                id: p.id,
                percentage: p.percentage
            });
        });
        needsList.sort(compareByValue);

        
        for(var i=0;i<needsList.length;i++){
            
            var need = needsList[i];
            
             if ((need.percentage <= DataService.thresholds.min) || (need.percentage >= DataService.thresholds.max)) {

                // Get the words required.
                word = getWordsForNeed(need)[0];

                // Form the right sentence for the single need.
                switch (intervalFor(need.percentage)) {
                    case 0:
                        sentence = tphrase("Experiences that make subject feel high %s may be generally unappealing to them");
                        break;
                    case 1:
                        sentence = tphrase("Experiences that give a sense of %s may hold some appeal to them");
                        break;
                    case 2:
                        sentence = tphrase("Subject may be motivated to seek out experiences that provide a strong feeling of %s");
                        break;
                    case 3:
                        sentence = tphrase("Subject's choices may be driven by a desire for %s");
                        break;
                }
                sentence = SummaryFormat.format(sentence, word).concat(".");

                // Create new details object that we can use to display in the UI
                var d = {};
                d.metric = need;
                d.value=need.percentage-0.5;
                d.abs = Math.abs(d.value);
                d.sentence = sentence;
                d.adjective = word;
                details.push(d);
            }
        }
//        console.log(JSON.stringify(details));
        return details;
    }

    /**
     * Given a TraitTree returns a text
     * summary describing the result.
     *
     * @param tree A TraitTree.
     * @return An array of strings representing the
     *         paragraphs of the text summary.
     */
    function assemble(tree) {
        try{
            return [assembleTraits(tree.children[0]), assembleFacets(tree.children[0]), assembleNeeds(tree.children[1]), assembleValues(tree.children[2])];
            } catch(err){
                console.error("Error assembling summary based on profile: "+err);
                return "";
            }
    }

    /**
     * Given a TraitTree returns a text
     * summary describing the result.
     *
     * @param tree A TraitTree.
     * @return A String containing the text summary.
     */
    function getSummary(profile) {
        try{
            return assemble(profile.tree).map(function (paragraph) {
                return paragraph.join(" ");
            }).join("\n");
        } catch(err){
            console.error("Error assembling profile: "+err);
            return "";
        }
    }

    function getDetailedSummary(profile) {
        
        var details = {};
        
        //details.traits = assembleTraitsDetails(profile.tree.children[0]);
        //details.facets = assembleFacetsDetails(profile.tree.children[0]);
        //details.needs = assembleNeedsDetails(profile.tree.children[1]);
        //details.values = assembleValues(tree.children[2]);
        
        return details;
    }

    /* Text-Summary API */
    this.assembleTraits = assembleTraits;
    this.assembleFacets = assembleFacets;
    this.assembleNeeds = assembleNeeds;
    this.assembleValues = assembleValues;
    this.assemble = assemble;
    this.getSummary = getSummary;
    this.getSummaryDetails = getDetailedSummary;
    this.getTraitDetails = getTraitDetails;
    this.getFacetDetails = getFacetDetails;
    this.getNeedDetails = getNeedDetails;
    this.getValueDetails = getValueDetails;

}]);
