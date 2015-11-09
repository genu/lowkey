'use strict';

/**
 * @ngdoc controller
 * @name module.core.controller:AppCtrl
 * @description
 * Application level functions
 */
angular.module('module.core').controller('AppCtrl', function ($rootScope, Layer, Effects) {
    this.effects = Effects.getAvailable();
    this.active_effects = Effects.getActive();

    $rootScope.$on('$viewContentLoaded', function () {
        //Renderer.init('#source', '#canvas');
    });

    this.sortableEffectsOptions = {
        update: function (e, ui) {

        },
        axis: 'y',
        handle: '.handle'
    };

    this.effectsChanged = function () {
        $rootScope.$broadcast('effects:changed');
    };

    this.addEffect = function (effect) {
        Effects.add(effect)
    };

    this.removeEffect = function (effect) {
        Effects.remove(effect);
    };
});
