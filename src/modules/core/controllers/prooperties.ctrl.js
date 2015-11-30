'use strict';

angular.module('module.core').controller('PropertiesCtrl', function ($rootScope, Effect) {
    var vm;

    vm = this;

    this.active_layer = null;

    this.onDrop = function (event, ui) {
        var effect_name;

        effect_name = ui.draggable.data('model').name;

        vm.active_layer.effects.push(new Effect(effect_name));
        $rootScope.$apply();
    };

    $rootScope.$on('Timeline:LayerSelected', function (event, layer) {
        vm.active_layer = layer;
        $rootScope.$apply();
    })
});
