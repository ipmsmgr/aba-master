'use strict';

angular.module('pi').service('ApiService', ['$http', '$timeout', '$q', 'Upload', 'FileSaver', 'Blob', function ($http, $timeout, $q, Upload, FileSaver, Blob) {


    this.analyze = function (text) {
        var deferred = $q.defer();

        var request = $http({
            method: "post",
            url: "analyze",
            data: {
                text: text
            }
        });

        // Store the data-dump of the FORM scope.
        request.success(
            function(response) {
                deferred.resolve(response);
            }
        );



        return deferred.promise;
    };



    this.extractText = function(files,subjectId) {

        var deferred = $q.defer();
        
        // Split up information about tab fields
        // and send it as a separate parameter of
        // the payload
        var fields = [];
        for(var i=0;i<files.length;i++){
            fields.push(files[i].fields);
        }

        if (files && files.length) {
            Upload.upload({
                url: 'extract',
                file: files,
                data:{
                    fields:fields,
                    subjectId: subjectId
                }
            }).then(function (response) {
                $timeout(function () {
                    deferred.resolve(response.data);
                });
            }, function(response) {
                if (response.status > 0) {
                    deferred.reject();
                }
            });
        }

        return deferred.promise;
    };
    
    this.extractAndAnalyze = function(files) {

        var deferred = $q.defer();
        
        // Prepare metadata for each file
        // Needs to be sent separate from file binaries
        var metadata = [];
        for(var i=0;i<files.length;i++){
            var f = files[i];
            var md = {};
            md.date = f.date;
            md.label = f.label;
            md.subject = f.subject;
            md.tags = f.tags;
            md.language = f.language;
            if((f.fields != null) && (f.fields.length>0)){
                md.fields = f.fields;
            }
            metadata.push(md);
        }


        if (files && files.length) {
            Upload.upload({
                url: 'extractandanalyze',
                file: files,
                data:{
                    metadata: metadata
                }
            }).then(function (response) {
                $timeout(function () {
                    deferred.resolve(response.data);
                });
            }, function(response) {
                if (response.status > 0) {
                    deferred.reject();
                }
            });
        }

        return deferred.promise;
    };

    this.saveProfile = function(subjectId, profile) {

        var deferred = $q.defer();

        var request = $http({
            method: "post",
            url: "profile",
            // transformRequest: transformRequestAsFormPost,
            data: {
                subjectId: subjectId,
                profile: profile
            }
        });

        // Store the data-dump of the FORM scope.
        request.success(
            function(response) {
                deferred.resolve(response);
            }
        );



        return deferred.promise;
    };
    


    this.loadSubject = function(subjectId) {

        var deferred = $q.defer();

        $http.get("/subject/" + subjectId)
            .then(function(response) {
                deferred.resolve(response.data);
            }),
            function myError(response) {
                $deferred.reject();
            };


        return deferred.promise;

    };

    
    this.generateReport = function(analysis,elements) {

        var deferred = $q.defer();

        var request = $http({
            method: "post",
            url: "report/"+analysis.id,
            responseType: 'arraybuffer',
            data: elements,
            headers: {
        'Content-type': 'application/json',
        'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    }
        });

        // Open the "Save as..." dialog for the report
        request.success(
            function(response) {

                var blob = new Blob([response], {
                    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                });
                FileSaver.saveAs(blob, 'Report.docx');

                deferred.resolve(response);
            }
        );



        return deferred.promise;
    };


    
    
    this.export = function(analysis) {

        var deferred = $q.defer();

        var request = $http({
            method: "post",
            url: "export/"+analysis.id
        });

        // Store the data-dump of the FORM scope.
        request.success(
            function(response) {
                deferred.resolve(response);

                //File.save(response, function (content) {
                var hiddenElement = document.createElement('a');

                hiddenElement.href = 'data:application/,' + encodeURI(response);
                hiddenElement.target = '_blank';
                hiddenElement.download = analysis.subject+'_'+analysis.label+'.csv';
                hiddenElement.click();

            }
        );

        return deferred.promise;
    };
    
    
    // Creating a section for tags to separate the different API calls
    this.tags = {};
    
    // Replaces the entire tag tree with the client-side one
    this.tags.updateTags = function (tags) {
        var deferred = $q.defer();

        var request = $http({
            method: "post",
            url: "tags",
            data: {
                tags: tags
            }
        });

        // API call returns updated tag tree.
        request.success(
            function(tags) {
                deferred.resolve(tags);
            }
        );

        return deferred.promise;
    };
    
    // Pull the tags from DB
    this.tags.getTags = function () {
        var deferred = $q.defer();

        var request = $http({
            method: "get",
            url: "tags"
        });

        // API call returns updated tag tree.
        request.success(
            function(tags) {
                deferred.resolve(tags);
            }
        );

        return deferred.promise;
    };
    
    // Pull the subjects from DB
    this.getSubjects = function () {
        var deferred = $q.defer();

        var request = $http({
            method: "get",
            url: "subjects"
        });

        // API call returns updated tag tree.
        request.success(
            function(subjects) {
                deferred.resolve(subjects);
            }
        );

        return deferred.promise;
    };
    
    // Pull the list of metrics from DB
    this.getMetrics = function () {
        var deferred = $q.defer();

        var request = $http({
            method: "get",
            url: "metrics"
        });

        // API call returns updated tag tree.
        request.success(
            function(metrics) {
                deferred.resolve(metrics);
            }
        );

        return deferred.promise;
    };
    
    
    // Get analyses for tag category
    this.getAnalysesByCategory = function (category) {
        var deferred = $q.defer();

        var request = $http({
            method: "get",
            url: "/analyses/bycategory/" + category
        });

        // API call returns the analyses divided by category.
        request.success(
            function(analyses) {
                deferred.resolve(analyses);
            }
        );

        return deferred.promise;
    };
    
        // Get analyses for tag category
    this.getScoresByTag = function (tag) {
        var deferred = $q.defer();

        var request = $http({
            method: "get",
            url: "/scores/bytag/" + tag
        });

        // API call returns the analyses divided by category.
        request.success(
            function(scores) {
                deferred.resolve(scores);
            }
        );

        return deferred.promise;
    };
    
    // Get scores for a specific subject
    this.getScoresBySubject = function (subject) {
        var deferred = $q.defer();

        var request = $http({
            method: "get",
            url: "/scores/bysubject/" + subject
        });

        // API call returns the scores
        request.success(
            function(scores) {
                deferred.resolve(scores);
            }
        );

        return deferred.promise;
    };
    
    
    
    this.getSummary = function (analysisId) {
        
        var deferred = $q.defer();

        var request = $http({
            method: "get",
            url: "summary/"+analysisId
        });

        // Store the data-dump of the FORM scope.
        request.success(
            function(response) {
                deferred.resolve(response);
            }
        );
        
        return deferred.promise;
    };
}]);
