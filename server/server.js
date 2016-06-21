// server.js

// =============================================================================
// READ CONFIGURATION FILE
// Read variables from config file. The config file needs
// to be set in the environment variable "NODE_ENV". The value
// of that variable needs to be the name of the config file
// in the config directory without .json extension
var config = require('config');
var HOST = config.get('server.host');
var PORT = config.get('server.port');
var TEMP_REPORTS = config.get('directories.reports');
var TEMP_UPLOADS = config.get('directories.uploads');


// =============================================================================
// PACKAGES
// web server
var express = require('express');
var app = express();
// parses body parameters in POST request
var bodyParser = require('body-parser');
// deal with local paths
var path = require('path');
// utility to deal with JSON objects and lists
var _ = require('underscore');
// utility to work with anynchronous calls
var Q = require('q');
// Need this for processing uploaded files
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({
    uploadDir: TEMP_UPLOADS
});
// For reading and writing to the local file system
var fs = require('fs');
// generates reports in Word format
var officegen = require('officegen');


// =============================================================================
// APPLICATION CONTROLLERS
var MainController = require('./controllers/MainController.js');
var DocumentController = require('./controllers/DocumentController');
var DatabaseController = require('./controllers/DatabaseController');
var PiController = require('./controllers/PiController');
var NarrativeController = require('./controllers/NarrativeController');
var AggregateController = require('./controllers/AggregateController');


// =============================================================================
// SERVER CONFIGURATION

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser({
    limit: '50mb'
}));
app.use(bodyParser.json());

// Path to the static files (HTML, JS, ect.)
app.use(express.static(path.join(__dirname + '/../client')));



// =============================================================================
// ROUTES FOR THE API

var router = express.Router(); // get an instance of the express Router

// Get information about a subject. This should probably a JSON
// object with information about previous analysis runs. It should not
// contain the results of these runs (for efficiency).
router.get('/subject/:subjectid', function (req, res, next) {
    var subjectid = req.params.subjectid;

    console.log("Trying to retrieve subject info for " + subjectid);

    DatabaseController.getAnalysesForSubject(subjectid).then(function (analyses) {

        res.json(analyses);
    });

});

router.post('/analyze', function (req, res, next) {
    var text = req.body.text;

    PiController.getJson(text).then(function (profile) {
        console.log("Analayzed text - Profile: " + JSON.stringify(profile).substring(1, 40));
        res.json(profile);
    });
});


var saveBarchart = function (image, path) {
    // strip off the data: url prefix to get just the base64-encoded bytes
    var data = image.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    fs.writeFile(path, buf);
}


// Get the entire tag tree
router.get('/tags', function (req, res, next) {
    // 1. Load the tags from the local config file
    // 2. Parse file content to JSON object
    // 3. Respond with JSON object
    var filepath = __dirname + "/resources/tags.json";
    fs.readFile(filepath, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Get the list of all subjects that are mentioned in 
// analyses.
router.get('/subjects', function (req, res, next) {
    DatabaseController.getSubjects().then(function (subjects) {
        console.log("Subjects are: "+JSON.stringify(subjects));
        res.json(subjects);
    });
});

// Get all metrics in flat list structure
router.get('/metrics', function (req, res, next) {
    DatabaseController.getMetrics().then(function (metrics) {
        res.json(metrics);
    });
});

// Get the entire tag tree
router.get('/analyses/bycategory/:category', function (req, res, next) {
    var category = req.params.category;

    DatabaseController.getAnalysesByCategory(category).then(function (analyses) {
        res.json(analyses);
    });
});

// Get accumulate score for all analyses under one tag
router.get('/scores/bytag/:tag', function (req, res, next) {
    var tag = req.params.tag;

    DatabaseController.getScoresByTag(tag).then(function (scores) {
        var flatscores = AggregateController.computeAggregate(tag, scores);
        res.json(flatscores);
    });
});

// Get accumulate score for all analyses for one subject
router.get('/scores/bysubject/:subject', function (req, res, next) {
    var subject = req.params.subject;

    DatabaseController.getScoresBySubject(subject).then(function (scores) {
        var flatscores = AggregateController.computeAggregate(subject, scores);
        res.json(flatscores);
    });
});

// Post a set of new files for analysis. This is executed
// after the user selected a set of files and clicked "analyze"
//router.post('/upload', multipartyMiddleware, DocumentController.uploadFile);

router.post('/extract', multipartyMiddleware, function (req, res) {
    var files = req.files.file;
    var fields = req.body.fields; // field specs for tab delimited files
    var subjectId = req.body.subjectId;
    console.log(JSON.stringify(req.body));
    DocumentController.extractText(files, fields, subjectId).then(function (text) {
        res.end(text)
    });
});

router.post('/extractandanalyze', multipartyMiddleware, function (req, res) {
    var files = req.files.file;
    var metadata = req.body.metadata; // metadata for all files
    
    //    console.log(JSON.stringify(req.body));
    extractAndAnalyzeFiles(files, metadata).then(function (analyses) {
        res.json(analyses);
    })

});


router.post('/bulkload', function (req, res) {
    var documents = req.body.documents; // metadata for all files

    var promises = [];

    for (var i = 0; i < documents.length; i++) {

        PiController.getJson(documents[i].text).then(function (profile) {

            console.log("Analayzed text for " + documents[i].subject + " - Profile: " + JSON.stringify(profile).substring(1, 40));

            DatabaseController.addAnalysis(documents[i].subject, text, documents[i].date, profile, documents[i].label, documents[i].tags);
        });
    }

    res.end();

});




var extractAndAnalyzeFiles = function (files, metadata) {

    var deferred = Q.defer();

    var promises = [];

    for (var i = 0; i < files.length; i++) {
        promises.push(extractAndAnalyzeFile(files[i], metadata[i]));
    }

    Q.allSettled(promises)
        .then(function (results) {

            var analyses = [];

            results.forEach(function (result) {
                if (result.state === "fulfilled") {
                    if (result.value != null) {
                        analyses.push(result.value);
                    }
                }
            });
            deferred.resolve(analyses);
        });

    return deferred.promise;
}


var extractAndAnalyzeFile = function (file, metadata) {

    var deferred = Q.defer();
    
    var language = getLanguage(metadata.language);

    DocumentController.extractText([file], metadata.fields, metadata.subject).then(function (text) {


        if (text.length <= 0) {
            deferred.resolve(null)
        } else {

            PiController.getJson(text,metadata.language).then(function (profile) {
                console.log("Analayzed text - Profile: " + JSON.stringify(profile).substring(1, 40));

                DatabaseController.addAnalysis(metadata.subject, text, metadata.date, profile, metadata.label, metadata.tags, metadata.language).then(function (analysis) {
                    deferred.resolve(analysis);
                });
            });
        }
    });

    return deferred.promise;
}

// "Normalizes" the language parameter and returns
// the default one if no language was specified.
var getLanguage = function(lang){
        // Ignore case of input parameter
    if (lang != null){
        lang = lang.toLowerCase();
    }
    
    
    // Default language is English
    var acceptedLanguages = ["en","es"];
    if (acceptedLanguages.indexOf(lang) < 0){
        lang = "en";
    }
    
    return lang;
}


// REGISTER ROUTES -------------------------------
// all of our routes will be prefixed with /api
// TODO Not true. Clean this up.
app.use('/', router);


//Export to csv
router.post('/export/:analysisid', function (req, res, next) {

    var analysisId = req.params.analysisid;

    DatabaseController.getAnalysis(analysisId).then(function (analysis) {

        PiController.getCsv(analysis.text,analysis.language).then(function (profile) {
            res.setHeader('Content-disposition', 'attachment; filename=out.csv');
            res.end(profile);

        });
    });
});

router.post('/report/:analysisid', function (req, res, next) {


    var analysisId = req.params.analysisid;
    var summary = req.body.summary;
    var behaviors = req.body.behaviors;

    if (req.body.barchart) {
        console.log("Saving barchart...");
        var barchartPath = TEMP_UPLOADS + 'image.png';
        saveBarchart(req.body.barchart, barchartPath);
    }


    DatabaseController.getAnalysis(analysisId).then(function (analysis) {

        // Construct temp location for report
        var filename = analysisId + ".docx";
        var filepath = TEMP_REPORTS + filename;
        console.log("Filepath: " + filepath);

        DocumentController.generateReport(analysis, summary, behaviors, filepath);

        res.setHeader('Content-disposition', 'attachment; filename=report.docx');
        res.download(filepath);

    });


});





// START THE SERVER
// =============================================================================
app.listen(PORT);
console.log('Magic happens on port ' + PORT);
