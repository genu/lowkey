'use strict';

angular.module('module.core').directive('onFinish', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            if (scope.$last){
                scope.$emit('testYo');
            }
        }
    }
});