'use strict';

angular.module('module.effects').service('Keyframe', function ($rootScope, Seriously, effects) {
    function Keyframe(location, value) {
        this.location = location;
        this.value = value;
    }

    return Keyframe;
});