module.exports = function () {
    return {
        styles: {
            expand: true,
            cwd: '<%= src %>',
            dest: '<%= tmp %>',
            src: '**/*.css'
        },
        modules: {
            expand: true,
            cwd: '<%= src %>',
            dest: '<%= tmp %>',
            src: '**/*.js'
        }
    }
};