var path = require('path');

module.exports = function (grunt) {
    require('time-grunt')(grunt);

    require('load-grunt-config')(grunt, {
        jitGrunt: {
            staticMappings: {
                ngconstant: 'grunt-ng-constant',
                ngAnnotate: 'grunt-ng-annotate',
                docularserver: 'grunt-docular',
                concurrent: 'grunt-concurrent'
            }
        },
        data: {
            pkg: grunt.file.readJSON('bower.json'),
            dist: 'dist',
            src: 'src',
            tmp: '.tmp',
            banner: '/*!\n * <%= pkg.name %> -v<% pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n */\n\n'
        }
    });
};
