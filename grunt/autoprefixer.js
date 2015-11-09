module.exports = function () {
    return {
        options: {
            browsers: ['last 1 version']
        },
        dist: {
            files: [
                {
                    expand: true,
                    cwd: '<%= tmp %>/css/',
                    src: '{,*/}*.css',
                    dest: '<%= tmp %>/css'
                }
            ]
        }
    }
};
