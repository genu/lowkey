'use strict';

angular.module('module.effects').service('Keyframe', function ($rootScope, Seriously, effects) {
    function Keyframe(param, value) {
        this.param = param;
        this.value = value;
    }

    return Keyframe;
});