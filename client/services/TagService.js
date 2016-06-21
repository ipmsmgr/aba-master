'use strict';

angular.module('pi').service('TagService', ['$q', 'ApiService', function ($q, ApiService) {


    this.tags = null;

    var pending = false;
    var waiting = []; // This is being asked for a lot, so we queue up
                        // all the requests and satisfy them when we get
                        // the response back

    
    this.getTagObj = function () {
        var deferred = $q.defer();

        if (this.tags == null) {

                var self = this;
                
                // Pull the entire tag tree fromt the DB
                ApiService.tags.getTags().then(function (tagres) {
                    self.tags = tagres;
                    deferred.resolve(self.tags);
                })
            
        } else {
            deferred.resolve(this.tags);
        }

        return deferred.promise;
    }
    
    this.getTagObj2 = function () {
        var deferred = $q.defer();

        if (this.tags == null) {

            waiting.push(deferred);

            if (!pending) {

                pending = true;
                
                var self = this;
                
                // Pull the entire tag tree fromt the DB
                ApiService.tags.getTags().then(function (tagres) {
                    self.tags = tagres;
                    pending = false;
                    for(var i=0;i<waiting.length;i++){
                        waiting[0].resolve(self.tags);
                    }
                })
            }
        } else {
            deferred.resolve(this.tags);
        }

        return deferred.promise;
    }


    this.getTagLabel = function (tagId) {
        for (var i = 0; i < this.tags.length; i++) {
            var category = this.tags[i];
            for (var k = 0; k < category.tags.length; k++) {
                var tag = category.tags[k];
                if (tag.id == tagId) {
                    return tag.label;
                }
            }
        }
    };
    
//    this.getScoresByTag = function(tag){
//        ApiService.getScoresByTag(tag).then(function(scores){
//            
//            
//        });
//    };
    
}

]);
