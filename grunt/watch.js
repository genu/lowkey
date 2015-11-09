module.exports = function () {
    return {
        jade: {
            files: [
                '<%= src %>/**/*.jade'
            ],
            tasks: ['jade']
        },
        js: {
            files: [
                '<%= src %>/**/*.js'
            ],
            tasks: ['copy:modules', 'includeSource:server', 'wiredep:server', 'ngAnnotate']
        },
        livereload: {
            options: {
                livereload: true
            },
            files: [
                '<%= tmp %>/**/*.html'
            ]
        },
        includeSource: {
            files: ['<%= src %>/index.tpl.html'],
            tasks: ['includeSource:server', 'wiredep:server']
        }
    }
};
