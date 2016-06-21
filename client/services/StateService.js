'use strict';

angular.module('pi').service('StateService', [function () {

        // States to control what to show/hide
    this.states = {
        loadSubject: 1,
        selectDocs: 2,
        reviewText: 3,
        single: 4,
        comparison: 5
    }
    
    this.panels = {
        sunburst: false,
        summary: true,
        source: false,
        tags: true,
        ranges: false,
        details: false,
        behaviors: true
    }
    
    this.rightPanel = null;
    
    this.state = this.states.loadSubject;
    

    this.is = function (state) {
        return this.state == state;
    };
    
    this.set = function(state){
        this.state = state;
    }


}]);
