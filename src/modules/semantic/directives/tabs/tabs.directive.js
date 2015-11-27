'use strict';

angular.module('module.semantic').directive('semanticTabs', function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '' +
        '<div>' +
        '   <div class="ui top attached tabular menu">' +
        '       <a ng-repeat="tab in tabs" class="item" ng-class="{active: tab.active}" ng-click="selectTab(tab)" ">{{tab.name}}</a>' +
        '   </div>' +
        '   <ng-transclude></ng-transclude>' +
        '</div>',
        controller: function ($scope) {
            $scope.tabs = [];

            $scope.selectTab = function (tab) {
                _.forEach($scope.tabs, function (tab) {
                    tab.active = false;
                });

                tab.active = true;
            };

            this.addTab = function (tab) {
                $scope.tabs.push(tab);
            }
        },
        link: function (scope, element) {
            $(element).tab();
        }
    }
});