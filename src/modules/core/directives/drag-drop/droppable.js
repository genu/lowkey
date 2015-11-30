'use strict';

angular.module('module.core').directive('droppable', function () {
    return {
        restrict: 'A',
        scope: {
            hoverClass: '@',
            onDrop: '='
        },
        link: function (scope, element) {
            $(element).droppable({
                drop: scope.onDrop,
                hoverClass: scope.hoverClass
            });
        }
    }
});