'use strict';

angular.module('module.composition').factory('Segment', function ($rootScope, Seriously, Hash) {
    var vm, seriously;

    vm = this;
    seriously = Seriously.getInstance();


    function Segment(name) {
        this.name = name;
        this.$id = Hash.random();
        this.order = 0;
        this.effects = [];
        this.active = true;
        this.media = null;
        this.source = null;
        this.lTrim = 0;
        this.rTrim = 0;
        this.offset = 0;
        this.in = 0;
        this.out = 0;
        this.length = null;
        this.isInitialized = false;
    }

    Segment.prototype.initSource = function (element) {
        this.source = seriously.source(element);
        this.out = this.media.video.duration() * 1000;
        this.rTrim = this.out;
        this.isInitialized = true;

        $rootScope.$broadcast('Segment:Initialized', this);
    };

    /**
     * Plays the video at the given timeline cursor
     * Time is adjusted for any offsets
     *
     * @param time In milliseconds
     */
    Segment.prototype.playAt = function (time) {
        var adjustimed_time;

        adjustimed_time = (time / 1000) + (this.lTrim / 1000);

        this.media.video.currentTime(adjustimed_time);
        this.media.video.play();
    };

    Segment.prototype.getTarget = function () {
        if (this.effects.length === 0) {
            return "#source_" + this.media.id;
        }

        return this.effects[this.effects.length - 1];
    };

    Segment.prototype.getActiveEffects = function () {
        return _.filter(this.effects, function (_effect) {
            return _effect.active;
        })
    };

    Segment.prototype.addEffect = function (effect) {
        this.effects.push(effect);
    };

    Segment.prototype.removeEffect = function (effect) {
        _.remove(this.effects, function (_effect) {
            return effect.$$hashKey === _effect.$$hashKey;
        });

        $rootScope.$broadcast('effects:removed');
    };

    Segment.prototype.render = function () {
        var effects = _.sortBy(this.getActiveEffects(), 'order');

        if (effects.length === 0) {
            return this.source;
        }

        effects[0].node.source = this.source;

        for (var i = 1; i < effects.length; i++) {
            effects[i].node.source = effects[i - 1].node;
        }

        return effects[effects.length - 1].node;
    };

    return Segment;
});
