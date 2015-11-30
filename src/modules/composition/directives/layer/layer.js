'use strict';

angular.module('module.composition').directive('layer', function () {
    return {
        restrict: 'E',
        scope: {
            name: '@'
        },
        replace: true,
        templateUrl: 'modules/composition/directives/layer/layer.html',
        link: function (scope, element) {
        }
    }
});