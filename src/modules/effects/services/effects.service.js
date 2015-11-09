'use strict';

angular.module('module.effects').service('Effects', function ($rootScope, Seriously, effects) {
    var active_effects = [];

    var toParams = function (inputs) {
        return _.toArray(inputs);
    };

    return {
        create: function (effect_name) {
            return new Effect(effect_name);
        },
        add: function (effect) {
            var _effect = {
                node: Seriously.getInstance().effect(effect),
                order: active_effects.length,
                enabled: true
            };

            //parametrize plugin configuration
            _effect.params = toParams(_effect.node.inputs());

            active_effects.push(_effect);

            $rootScope.$broadcast('effects:changed')

        },
        remove: function (effect) {
            _.remove(active_effects, function (_effect) {
                return effect.$$hashKey === _effect.$$hashKey;
            });

            $rootScope.$emit('effects:changed');
        },
        getAvailable: function () {
            return _.pairs(Seriously.getInstance().effects())
        }
        ,
        getActive: function () {
            return active_effects
        }
    }
});