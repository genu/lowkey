'use strict';

angular.module('module.composition').service('Timeline', function ($rootScope, $interval, Seriously, moment) {
    var vm = this;
    this.active_layer = null;
    this.layers = [];
    var seriously = Seriously.getInstance();
    var target = null;

    var framerate = 1;
    this.cursor = 0;
    var start = 0;
    var end = 100;
    var vid = null;

    //The function that generates a frame at each interval
    var frameFn = null;

    $rootScope.$on('video:timeupdate', function (event, media) {
        var playable;

        playable = vm.getPlayable();

        vid = media.video;
        vm.cursor = media.video.currentTime() * 1000;
        target.source = playable.source;

        // If the vid
        if (playable.media.video.paused()) {
            playable.media.video.play();
        }
    });

    $rootScope.$on('media:loaded', function (event, options) {
        var layer = _.filter(vm.layers, function (layer) {
            return layer.media.id === options.id;
        });

        layer[0].initSource(options.element);
    });

    this.addLayer = function (layer) {
        this.layers.push(layer);

        $rootScope.$broadcast('Timeline:addLayer');
    };

    this.setTarget = function (target_ref) {
        target = seriously.target(target_ref);

        seriously.go();
    };

    this.play = function () {
        if (_.isNull(this.active_layer)) {
            this.getPlayable();
        }

        this.active_layer.media.video.play();

        $rootScope.$broadcast('Timeline:playing');
    };

    this.pause = function () {
        if (_.isNull(this.active_layer)) {
            this.getPlayable();
        }

        this.active_layer.media.video.pause();
    };

    this.next = function () {
        var playable_layer = this.getPlayable();
    };

    this.getPlayable = function () {
        var sorted_layers, bounded_layers = [];

        //Find the layer that is within the bounds of the cursor
        _.forEach(_.sortBy(this.layers, 'order'), function (layer) {
            if (vm.cursor >= layer.in && vm.cursor < layer.out) {
                bounded_layers.push(layer);
            }
        });

        this.active_layer = bounded_layers[0];

        return this.active_layer;
    };
});
