'use strict';

angular.module('module.composition').factory('Layer', function ($rootScope, Seriously, Timeline) {
    var seriously = Seriously.getInstance();

    function Layer(name) {
        this.name = name;
        this.order = 0;
        this.effects = [];
        this.active = true;
        this.media = null;
        this.source = null;
        this.offset = 0;
        this.in = 0;
        this.out = 0;
        this.length = null;
    }

    Layer.prototype.initSource = function (element) {
        this.source = seriously.source(element);
        this.out = this.media.video.duration() * 1000;
    };

    Layer.prototype.getTarget = function () {
        if (this.effects.length === 0) {
            return "#source_" + this.media.id;
        }

        return this.effects[this.effects.length - 1];
    };

    Layer.prototype.getActiveEffects = function () {
        return _.filter(this.effects, function (_effect) {
            return _effect.active;
        })
    };

    Layer.prototype.addEffect = function (effect) {
        this.effects.push(effect);
    };

    Layer.prototype.removeEffect = function (effect) {
        _.remove(this.effects, function (_effect) {
            return effect.$$hashKey === _effect.$$hashKey;
        });

        $rootScope.$broadcast('effects:removed');
    };

    Layer.prototype.render = function () {
        var effects = _.sortBy(this.getActive(), 'order');

        effects[0].node.source = this.source;

        for (var i = 1; i < effects.length; i++) {
            effects[i].node.source = effects[i - 1].node;
        }
    };

    return Layer;
});
