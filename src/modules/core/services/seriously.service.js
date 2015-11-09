'use strict';

angular.module('module.core').service('Seriously', function () {
    var instance;

    return {
        getInstance: function () {
            if (_.isUndefined(instance)) {
                instance = new Seriously();
            }

            return instance;
        }
    }
});
