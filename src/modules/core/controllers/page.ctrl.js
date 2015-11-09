'use strict';

/**
 * @ngdoc controller
 * @name module.core.controller:MainCtrl
 * @description
 * Application level functions
 */
angular.module('module.core').controller('PageCtrl', function ($scope, Renderer, Effects) {
    this.effects = Effects.getAvailable();

    $scope.$on('$viewContentLoaded', function () {
        Renderer.init('#source', '#canvas');
    });

    this.addEffect = function (effect) {
        Effects.add(effect)
    };

    this.removeEffect = function (effect) {
        Effects.remove(effect);
    };
});
