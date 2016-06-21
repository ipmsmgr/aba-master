module.exports = function (grunt) {

    grunt.initConfig({
        sass: { // Task 
            dist: { // Target 
                options: { // Target options 
                    style: 'expanded'
                },
                files: { // Dictionary of files 
                    'css/pi.css': 'css/pi.scss', // 'destination': 'source'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        },
        'bower-update': {
            options: {
                pickAll: true,
                forceLatest: true,
                rangeChar: '~'
            }
        },
        express: {
            dev: {
                options: {
                    script: '../server/server.js'
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-update');
    grunt.loadNpmTasks('grunt-shell');
//    grunt.loadNpmTasks('express');

    grunt.registerTask('default', [ 'watch']);

};
