'use strict';

angular.module('module.core').controller('PropertiesCtrl', function ($rootScope, Effect) {
    var vm;

    vm = this;

    this.active_segment = null;

    this.removeEffect = function (effect) {
        this.active_segment.removeEffect(effect);
        $rootScope.$broadcast('Timeline:RequestToRender');
    };

    this.refreshContext = function () {
        $rootScope.$broadcast('Timeline:RequestToRender');
    };

    this.onDrop = function (event, ui) {
        var effect_name;

        effect_name = ui.draggable.data('model').name;

        vm.active_segment.effects.push(new Effect(effect_name));

        $rootScope.$broadcast('Timeline:RequestToRender');
        $rootScope.$apply();
    };

    $rootScope.$on('Timeline:LayerSelected', function (event, segment) {
        vm.active_segment = segment;
        $rootScope.$apply();
    });

    $rootScope.$on('Timeline:LayerDeselected', function (event, segment) {
        vm.active_segment = null;
        $rootScope.$apply();
    })
});
