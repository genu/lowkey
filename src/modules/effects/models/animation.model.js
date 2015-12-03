'use strict';

angular.module('module.effects').service('Animation', function ($rootScope, Hash, Keyframe) {
    function Animation() {
        this.$id = Hash.random();
        this.keyframes = [];
        this.active = true;
        this.isAnimating = false;
        this.bezier = null;
    }

    Animation.prototype.test = function () {
        console.log("test");
    };

    Animation.prototype.addKeyframe = function (location, value) {
        var keyframe;

        keyframe = new Keyframe(location, value);

        // Add the keyframe if it doesn't already exists
        if (!_.isUndefined(_.find(this.keyframes, function (_keyframe) {
                return _keyframe == keyframe;
            }))) {

            this.keyframes.push(keyframe);
        }
    };

    return Animation;
});