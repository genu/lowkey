'use strict';

angular.module('module.semantic').directive('semanticPopup', function () {
    return {
        restrict: 'A',
        scope: {
            exclusive: '=',
            position: '@',
            on: '@',
            delayShow: '@',
            delayHide: '@',
            transition: '@',
            hoverable: '=',
            closable: '=',
            inverted: '='
        },
        link: function (scope, element) {
            $(element[0]).popup({
                exclusive: _.isUndefined(scope.exclusive) ? false : scope.exclusive,
                position: _.isUndefined(scope.position) ? 'top left' : scope.position,
                on: _.isUndefined(scope.on) ? 'click' : scope.on,
                inline: true,
                delay: {
                    show: _.isUndefined(scope.delayShow) ? 300 : parseInt(scope.delayShow),
                    hide: _.isUndefined(scope.delayHide) ? 800 : parseInt(scope.delayHide)
                },
                transition: _.isUndefined(scope.transition) ? 'slide down' : scope.transition,
                hoverable: _.isUndefined(scope.hoverable) ? false : scope.hoverable,
                closable: _.isUndefined(scope.closable) ? true : scope.closable,
                inverted: _.isUndefined(scope.inverted) ? false : scope.inverted,
                lastResort: "bottom left"
            })
        }
    }
});