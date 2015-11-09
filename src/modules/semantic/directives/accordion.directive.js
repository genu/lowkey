'use strict';

angular.module('module.semantic').directive('semanticAccordion', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            $(element).accordion()
        }
    }
});