var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID; // generate unique ids
var Q = require('q');

var config = require('config');
var DB_HOST = config.get('db.host');
var DB_PORT = config.get('db.port');
var DB_TABLE = config.get('db.table');

var connectionString = 'mongodb://'+DB_HOST+":"+DB_PORT+"/"+DB_TABLE;
//'mongodb://localhost:27017/test';

DatabaseController = function () {};


//private static DBCollection checkConnection(String collection) throws UnknownHostException{
//    if(db == null){
//        db = (new MongoClient(host, port)).getDB(database);
//    }
//    return db.getCollection(collection);
//}

// Saves a profile for a specific subject
// It creates the subject if it hasn't been added yet.
DatabaseController.prototype.addAnalysis = function (subjectId, text, date, profile, label, tags, language) {

    var deferred = Q.defer();

    // Create new analysis object that contains the profile but also the original text
    // as well as a timestamp
    var analysis = {
        id: new ObjectID(),
        subject: subjectId,
        label: label,
        tags: tags,
        date: (new Date(date)).toISOString(),
        text: text,
        profile: profile,
        language:language
    };

    // Add new analysis object to database
    try {
        MongoClient.connect(connectionString, function (err, db) {

            db.collection('analyses').insertOne(analysis, function (err, results) {
                if (err != null) {
                    console.log("Error writing analysis to database: " + err);
                }
                db.close();
                deferred.resolve(analysis);
            });
        });
    } catch (err) {
        console.error("Error writing analysis to DB: " + err);
        deferred.resolve(null);
    }
    return deferred.promise;
};





DatabaseController.prototype.getAnalysis = function (analysisId) {

    console.log("Getting analysis with id " + analysisId);

    var deferred = Q.defer();

    try {
        MongoClient.connect(connectionString, function (err, db) {

            db.collection('analyses').findOne({
                "id": ObjectID(analysisId)
            }).then(function (res) {
                db.close();
                deferred.resolve(res);
            });

        });
    } catch (err) {
        console.error("Error retrieving analysis " + analysisId + ": " + err);
        deferred.resolve(null);
    }

    return deferred.promise;
};

DatabaseController.prototype.getAnalysesForSubject = function (subjectId) {

    console.log("Getting analyses for subject...");

    var deferred = Q.defer();

    MongoClient.connect(connectionString, function (err, db) {

        var cursor = db.collection('analyses').find({
            "subject": subjectId
        });


        var analyses = [];
        cursor.each(function (err, doc) {
            if (doc != null) {
                analyses.push(doc);
            } else {
                db.close();
                deferred.resolve(analyses);
            }
        });

    });

    return deferred.promise;
};




DatabaseController.prototype.getAnalysesByCategory = function (categoryName) {

    var deferred = Q.defer();

    MongoClient.connect(connectionString, function (err, db) {

        DatabaseController.prototype.getTags().then(function (categories) {



            for (var i = 0; i < categories.length; i++) {

                console.log("Processing category " + categories[i].label);

                if (categories[i].label == categoryName) {
                    var tags = categories[i].tags;

                    var promises = [];
                    for (var k = 0; k < tags.length; k++) {

                        // find analyses by tag
                        promises.push(DatabaseController.prototype.getAnalysesByTag(tags[k].label));
                    }

                    var analyses = {};
                    Q.allSettled(promises)
                        .then(function (results) {

                            results.forEach(function (result) {

                                if (result.state === "fulfilled") {
                                    var value = result.value;
                                    analyses[value.tag] = value.analyses;
                                }
                            });
                            db.close();
                            deferred.resolve(analyses);
                        });
                }
            }
        });
    });

    return deferred.promise;
};


DatabaseController.prototype.getAnalysesByTag = function (tagName) {


    var deferred = Q.defer();

    var analyses = [];

    MongoClient.connect(connectionString, function (err, db) {

        var cursor = db.collection('analyses').find({
            "tags": tagName
        });

        cursor.each(function (err, doc) {
            if (doc != null) {
                analyses.push(doc);
            } else {
                console.log("Found " + analyses.length + " for " + tagName);
                db.close();
                deferred.resolve({
                    tag: tagName,
                    analyses: analyses
                });
            }
        });

    });

    return deferred.promise;

};


DatabaseController.prototype.getScoresByTag = function (tagName) {
    var deferred = Q.defer();

    DatabaseController.prototype.getAnalysesByTag(tagName).then(function (result) {
        deferred.resolve(result.analyses)
    });

    return deferred.promise;
};

DatabaseController.prototype.getScoresBySubject = function (subjectId) {
    var deferred = Q.defer();

    var analyses = [];

    MongoClient.connect(connectionString, function (err, db) {

        var cursor = db.collection('analyses').find({
            "subject": subjectId
        });

        cursor.each(function (err, doc) {
            if (doc != null) {
                analyses.push(doc);
            } else {
                console.log("Found " + analyses.length + " for " + subjectId);
                db.close();
                deferred.resolve(analyses);
            }
        });

    });
    return deferred.promise;
};

// Returns a list of all subjects in the system. That is needed
// to show the list of subjects in the UI.
DatabaseController.prototype.getSubjects = function () {
    var deferred = Q.defer();

    try {
        MongoClient.connect(connectionString, function (err, db) {
            console.log("Retrieving subjects...");
            db.collection('analyses').distinct('subject').then(function (res) {
                console.log("...received subjects!");
                db.close();
                deferred.resolve(res);
            });

        });
    } catch (err) {
        console.error("Error retrieving subjects: " + err);
        db.close();
        deferred.resolve([]);
    }


    return deferred.promise;
};



module.exports = new DatabaseController();
