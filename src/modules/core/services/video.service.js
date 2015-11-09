'use strict';

angular.module('module.core').service('Video', function () {
    var instance;

    return {
        getInstance: function () {
            if (_.isUndefined(instance)) {
                instance = videojs;
            }

            return instance;
        }
    }
});
