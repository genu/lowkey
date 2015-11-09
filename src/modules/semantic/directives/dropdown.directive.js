'use strict';

angular.module('module.semantic').directive('semanticDropdown', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            ngModel: '=',
            ngChange: '&'
        },
        link: function (scope, element) {
            $(element).dropdown({
                onChange: function (value) {
                    scope.ngModel = value;
                    scope.$apply();
                    scope.ngChange()
                }
            });
        }
    }
});