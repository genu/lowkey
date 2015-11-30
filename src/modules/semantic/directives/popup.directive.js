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
            inverted: '=',
            content: '@'
        },
        link: function (scope, element) {
            var content;
            if (!_.isEmpty(scope.content)) {
                debugger;
                content = '<div style="display:none;">' + scope.content + '</div>';
                $(element).prepend(content);
            }
            $(element[0]).popup({
                popup: _.isEmpty(scope.content) ? false : $(content),
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