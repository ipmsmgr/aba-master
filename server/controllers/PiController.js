var watson = require('watson-developer-cloud');
var Q = require('q');
var extend = require('extend');

var config = require('config');
var PI_URL = config.get('pi.url');
var PI_USER = config.get('pi.user');
var PI_PWD = config.get('pi.password');

// var url = 'http://localhost:8080/systemu/service/api';

/**
 * Controller for handling communication with the Personal
 * Insights API.
 **/
PiController = function () {};


var Client = require('node-rest-client').Client;

// Sends the specified text to the API
PiController.prototype.getCsv = function (text,language) {
    var options = {"Accept": "text/csv"};
    return getProfile(text,options,language);
};


// Sends the specified text to the API
PiController.prototype.getJson = function (text,language) {
    return getProfile(text,{},language);
};

// Sends the specified text to the API
var getProfile = function (text,options,language) {
    var deferred = Q.defer();
    
    if(language==null){
        language = "en";
    }
    
    // Default headers
    headers = {} 
    headers["Content-Type"] = "text/plain"; //"text/html"
    headers["Accept"] = "application/json"; // "text/csv"
    headers["Content-Language"] = language; //ar, en, es, ja
    headers["include_raw"] = true; // include raw scores
    headers["headers"] = true; // include headers when asking for CSV
    
    // Apply the options passed in as arguments
    for (key in options){
        headers[key] = options[key];
    }
    
    // set content-type header and data as json in args parameter
    var args = {
        data: text,
        headers: headers
    };
    
    try{
    
        var piClient = new Client({user: PI_USER, password: PI_PWD });
        var request = piClient.post(PI_URL, args, function (data, response) {
            console.log("Response from PI API: ["+response.statusCode+"] "+response.statusMessage);
            deferred.resolve(data);
        });
        
        request.on('error', function(err) {
           console.error("Error calling PI API: " + err);
            deferred.resolve(null);
        });
        
    } catch(err){
        console.error("Error calling PI API: " + err);
        deferred.resolve(null);
    }
    return deferred.promise;
};


var keys = ["Achievement striving", "Adventurousness", "Anger", "Artistic interests", "Cautiousness", "Challenge_parent", "Closeness", "Conservation", "Curiosity", "Dutifulness", "Excitement", "Extraversion", "Gregariousness", "Hedonism", "Imagination", "Intellect", "Liberty", "Modesty", "Neuroticism", "Openness to change", "Practicality", "Self-discipline", "Self-enhancement", "Self-transcendence", "Stability", "Sympathy", "Vulnerability"];

/**
 * Takes all the scores and creates a flat 
 * object that lists the scores without hierarchy.
 **/
PiController.prototype.flattenProfile = function (profile) {
    // Collect the scores for each of the keys
    var flat = {};
    for (var i = 0; i < keys.length; i++) {
        flat[keys[i]] = getScoreById(profile, keys[i]);
    }
    return flat;
}


var getScoreById = function (element, id) {

    if (element == null) {
        return null;
    }

    // If this is the score with the matching ID return its value
    if (('id' in element) && (id == element.id)) return element.percentage;

    // .. otherwise look in it's children
    if ('children' in element) {
        for (var i = 0; i < element.children.length; i++) {
            var val = getScoreById(element.children[i], id);
            if (val) {
                return val;
            };
        }
    } else {
        if ('tree' in element) {
            return getScoreById(element.tree, id);
        } else {
            return null;
        }
    }

    return null;
};


module.exports = new PiController();
