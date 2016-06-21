// Custom controller to handle all the requests coming through the API



// Custom controllers
var MainController = require('./PiController.js');
var DatabaseController = require('./DatabaseController.js');
//var SubjectController = require('./SubjectController.js');
var UserController = require('./DocumentController');


var MainController = function() {};



MainController.prototype.getSubjectInfo = function(subjectId){
    return SubjectController.getSubject(subjectId);
};


module.exports = new MainController();