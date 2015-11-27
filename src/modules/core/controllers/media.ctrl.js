'use strict';

angular.module('module.core').controller('MediaCtrl', function () {
    this.sources = [
        {
            title: "Movie Trailer",
            path: 'media/sample_2.mkv',
            type: 'video/webm'
        }, {
            title: "Movie 2",
            path: 'media/tears_of_steel.webm',
            type: 'video/webm'
        }
    ]

});
