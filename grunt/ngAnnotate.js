module.exports = function () {
    return {
        dist: {
            files: [
                {
                    expand: true,
                    cwd: '<%= tmp %>',
                    src: ['**/*.js'],
                    dest: '<%= tmp %>'
                }
            ]
        }
    }
};