'use strict';

angular.module('module.core').directive('droppable', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            console.log(element.parent().parent());
            //$(element).droppable({
            //    drop: function () {
            //        alert('dropped')
            //    }
            //});
        }
    }
});