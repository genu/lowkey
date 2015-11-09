module.exports = function () {
    return {
        options: {
            hostname: 'localhost',
            livereload: 35729,
            useAvailablePort: true,
            open: false
        },
        livereload: {
            options: {
                middleware: function (connect) {
                    return [
                        connect.static('.tmp'),
                        connect().use('/bower_components', connect.static('./bower_components')),
                        connect().use('/semantic', connect.static('./semantic')),
                        connect.static('src')
                    ]
                }
            }
        }
    }
};