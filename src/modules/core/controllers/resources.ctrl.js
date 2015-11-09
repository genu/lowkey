'use strict';

angular.module('module.core').controller('ResourcesCtrl', function ($rootScope) {
    $rootScope.$on('timeline:LayerSelected', function (e, layer) {
        console.log(layer.name + " layer selected");
    });
});
