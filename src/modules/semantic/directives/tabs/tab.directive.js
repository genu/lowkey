'use strict';

angular.module('module.semantic').directive('semanticTab', function () {
    return {
        require: '^semanticTabs',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            name: "@",
            isActive: '=',
            active: '=',
            test: '@'
        },
        template: '<div class="ui bottom attached tab segment" ng-class="{active: active}" ng-transclude></div>',
        link: function (scope, element, attr, semanticTabsCtrl) {
            semanticTabsCtrl.addTab(scope)
        }
    }
});