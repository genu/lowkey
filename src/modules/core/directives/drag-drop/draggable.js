'use strict';

angular.module('module.core').directive('draggable', function () {
    return {
        restrict: 'A',
        scope: {
            label: '@'
        },
        link: function (scope, element) {
            $(element).draggable({
                helper: function () {
                    return '<div class="draggable-label">' + scope.label + '</div>'
                },
                appendTo: 'body',
                cursor: 'pointer',
                cursorAt: {left: 5}
            });
        }
    }
});