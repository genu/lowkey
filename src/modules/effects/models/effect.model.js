'use strict';

angular.module('module.effects').service('Effect', function ($rootScope, Seriously, effects) {
    function Effect(name) {
        this.name = name;
        this.node = Seriously.getInstance().effect(name);
        this.order = 0;
        this.active = true;
        this.inputs = _.toArray(this.node.inputs());
        this.animations = [];
    }

    Effect.prototype.hasAnimation = function (animation) {
        if (_.isUndefined(_.find(this.animations, function (_animation) {
                return _animation.param.$$hashKey === animation.param.$$hashKey;
            }))) {
            return false;
        } else {
            return true;
        }
    };

    Effect.prototype.removeAnimation = function (animation) {
        _.remove(this.animations, function (_animation) {
            return _animation.param.$$hashKey === animation.param.$$hashKey;
        })
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