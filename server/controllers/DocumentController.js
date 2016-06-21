// Custom controller to handle all things related
// to uploading and processing documents. This includes
// Saving the files and extracting text from different
// file types

var officegen = require('officegen'); // Produce Word document
var fs = require('fs'); // Read and write files
var Q = require('q'); // Handle promises
var path = require('path');
var mammoth = require("mammoth");
var dateFormat = require('dateformat');
var Docxtemplater = require('docxtemplater');
var ImageModule = require('docxtemplater-image-module')
var sizeOf = require('image-size');


var config = require('config');
var TEMP_UPLOADS = config.get('directories.uploads');

DocumentController = function () {};


/**
 * Stub for creating Word report. The actual production of the report
 * needs to be handled elsewhere.
 * 
 * @private
 * @method createReport
 * @param {Object} filename - location to save the report.
 */
DocumentController.prototype.generateReport = function (analysis, summary, behaviors, filename) {


    //Load the docx file as a binary
    var content = fs.readFileSync(__dirname + "/input.docx", "binary");

    var doc = new Docxtemplater(content);

    // Image module
    var opts = {};
    opts.centered = false;
    opts.getImage = function (tagValue, tagName) {
        return fs.readFileSync(tagValue, 'binary');
    }

    opts.getSize = function (img, tagValue, tagName) {
        var dimensions = sizeOf(tagValue);
        console.log(dimensions.width, dimensions.height);

        return [dimensions.width, dimensions.height];
    }

    var imageModule = new ImageModule(opts);
    doc.attachModule(imageModule);

    //set the templateVariables
    var data = {
        "id": analysis.subject,
        "title": analysis.label,
        "text": analysis.text,
        "date": dateFormat(new Date(analysis.date)),
        "summary": summary,
        "image": TEMP_UPLOADS + 'image.png'
    };

    // Add behaviors if they are defined
    console.log("Behaviors: "+JSON.stringify(behaviors));
    if (behaviors != null) {
        data.behaviors = behaviors;
    }

    doc.setData(data);

    //apply them (replace all occurences of {first_name} by Hipp, ...)
    doc.render();

    var buf = doc.getZip()
        .generate({
            type: "nodebuffer"
        });
    fs.writeFileSync(filename, buf);
};



/**
 * Extracts text from a set of documents and combines it
 * in one variable that is returned in the promise.
 * 
 * @private
 * @method extractText
 * @param {Object} files - Documents from which to extract text.
 * @return {Object} Combined text from all documents.
 */
DocumentController.prototype.extractText = function (files, fields, subjectId) {

    console.log("Extracting text from " + files.length + " files...");

    var deferred = Q.defer(); // Make promise

    console.log("Fields: " + JSON.stringify(fields));

    var promises = []; // List of promises for file reads

    // Read files and throw the promises that are generated
    // by the file read into an array. We will wait for these
    // promises to finish before returning the text.
    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        console.log(file.path + " has the extension " + path.extname(file.path));


        if ((fields != null) && (fields.length > 0)) {
            // If the user specified field names, we will try to treat it
            // as a tab delimited file
            console.log("Extract tab delimited file...");
            promises.push(readTabFile(file, fields, subjectId));
        } else if (path.extname(file.path) === ".txt") {
            console.log("Extract text file...");
            promises.push(readTextFile(file));
        } else if (path.extname(file.path) === ".docx") {
            console.log("Extract word file...");
            promises.push(readWordFile(file));
        }
    }


    // When all files have been processed, we combine
    // the results into the text variable.
    var text = "";
    Q.allSettled(promises)
        .then(function (results) {
            results.forEach(function (result) {
                if (result.state === "fulfilled") {
                    text = text + " " + result.value;;

                } else {
                    console.error("Text extraction unsuccessful: " + result.reason);
                }
            });

            // Return combined text
            console.log("FINAL TEXT: " + text.substring(1, 40));
            deferred.resolve(text);
        });

    return deferred.promise;
}



/**
 * Reads the text from the given file and returns
 * it in the promise.
 *
 * @private
 * @method readTextFile
 * @param {Object} file - File handle.
 * @return {Object} Text from file.
 */
function readTextFile(file) {

    var deferred = Q.defer();
    fs.readFile(file.path, "utf-8", function (error, text) {
        if (error) {
            console.error("Error: " + JSON.stringify(error));
            deferred.reject(error);
        } else {
            deferred.resolve(text);
        }
    });
    return deferred.promise;
};


/**
 * Reads the tab delimited from the given file and returns
 * it in the promise.
 *
 * @private
 * @method readTabFile
 * @param {Object} file - File handle.
 * @return {Object} Text from file.
 */
function readTabFile(file, fields, subjectId) {
    var deferred = Q.defer();
    
    subjectId = subjectId.toLowerCase();
    
    fs.readFile(file.path, "utf-8", function (error, text) {
        if (error) {
            console.error("Error: " + JSON.stringify(error));
            deferred.reject(error);
        } else {
            
            // Iterate over rows
            var content = "";
            var rows = text.split(/\r\n|\r|\n/g);
            for (var i = 0; i < rows.length; i++) {
                console.log("Index of " + subjectId + " in " + rows[i] + " is " + rows[i].indexOf(subjectId));
                
                // Iterate over columns and extract subject and content
                var rowObj = {subject: null, content: ""};
                var cols = rows[i].split("\t");
                for (var k = 0; k < fields.length; k++) {
                    try {
                        if (fields[k] == "content") {
                            if (cols[k] != null) {
                                rowObj.content += " " + cols[k];
                            }
                        } else if (fields[k] == "subject") {
                            rowObj.subject = cols[k];
                        }
                    } catch (err) {
                        console.log("ERROR: field count mismatch: " + err)
                    }
                }

                // Add the information extractred from the row to the content
                // if the subject of that row matches the specified subject
                if(rowObj.subject.toLowerCase() == subjectId){
                    content += " " + rowObj.content;
                }
            }



            deferred.resolve(content);
        }
    });
    return deferred.promise;
};

/**
 * Reads the text from the given file and returns
 * it in the promise.
 *
 * @private
 * @method readWordFile
 * @param {Object} file - File handle.
 * @return {Object} Text from file.
 */
function readWordFile(file) {

    var deferred = Q.defer();

    mammoth.extractRawText({
            path: file.path
        })
        .then(function (result) {
            console.log("FROM WORD: " + result.value.substring(0, 40));
            deferred.resolve(result.value);
        })
        .done();

    return deferred.promise;
};





module.exports = new DocumentController();
