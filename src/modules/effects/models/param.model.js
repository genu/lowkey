angular.module('module.effects').service('Param', function ($rootScope, Hash, Animation) {
    function Param(input) {
        this.isAnimating = false;
        this.input = input;
        this.animation = null;
    }

    /**
     * Toggles the animation
     * @returns {null|Animation|*} Returns the animation that was added or removed
     */
    Param.prototype.toggleAnimation = function () {
        var _animation;

        if (_.isNull(this.animation)) {
            this.animation = new Animation();

            return this.animation;
        } else {
            _animation = this.animation;
            this.animation = null;

            return _animation;
        }
    };

    return Param;
});