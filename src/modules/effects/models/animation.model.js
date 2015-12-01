'use strict';

angular.module('module.effects').service('Animation', function ($rootScope, Seriously, Hash) {
    function Animation(param) {
        this.$id = Hash.random();
        this.param = param;
        this.keyframes = [];
        this.isEnabled = true;
    }

    Animation.prototype.addKeyframe = function (keyframe) {
        // Only add the keyframe if it doesn't already exist at that time
        this.keyframes.push(keyframe);
    };

    return Animation;
});