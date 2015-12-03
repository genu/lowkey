'use strict';

angular.module('module.effects').service('Effect', function ($rootScope, Seriously, Param) {
    function Effect(name) {
        this.name = name;
        this.node = Seriously.getInstance().effect(name);
        this.order = 0;
        this.active = true;
        this.params = [];

        // Initialize params with effect inputs
        _.forEach(_.toArray(this.node.inputs()), function (input) {
            this.params.push(new Param(input));
        }, this);
    }

    Effect.prototype.createParam = function (input) {
        return new Param(input);
    };

    Effect.prototype.hasAnimation = function (animation) {
        return !_.isUndefined(_.find(this.animations, function (_animation) {
            return _animation.param.$$hashKey === animation.param.$$hashKey;
        }));
    };

    Effect.prototype.removeAnimation = function (animation) {
        _.remove(this.animations, function (_animation) {
            return _animation.param.$$hashKey === animation.param.$$hashKey;
        })
    };

    /**
     * Ad an animation
     *
     * @param animation
     * @return true|false True if animation was added, false if this animation already existed
     */
    Effect.prototype.addAnimation = function (animation) {
        var found = _.find(this.animations, function (_animation) {
            return _animation.$id = animation.$id;
        });

    };

    Effect.prototype.getAnimationByParam = function (param) {
        return _.find(this.animations, function (_animation) {
            return _animation.param.$$hashKey === param.$$hashKey;
        })
    };

    Effect.prototype.setOrder = function (order) {
        this.order = order;
    };

    Effect.prototype.isActive = function () {
        return this.active;
    };

    Effect.prototype.setActive = function (active) {
        this.enabled = active;
    };

    Effect.getAvailable = function () {
        return _.pairs(Seriously.getInstance().effects())
    };

    return Effect;
});