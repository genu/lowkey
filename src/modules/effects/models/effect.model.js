'use strict';

angular.module('module.effects').service('Effect', function ($rootScope, Seriously, effects) {
    function Effect(name) {
        this.name = name;
        this.node = Seriously.getInstance().effect(name);
        this.order = 0;
        this.active = true;

        $rootScope.$broadcast('effects:created')
    }

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