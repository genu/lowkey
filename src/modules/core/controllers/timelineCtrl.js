'use strict';

angular.module('module.core').controller('TimelineCtrl', function ($rootScope, $timeout, Timeline, Layer, Media, moment) {
    var vm, media1, media3, timeline, surfaces;
    vm = this;

    $rootScope.$watch(function () {
        return Timeline.active_layer
    }, function (active_layer) {
        vm.active_layer = active_layer;
    });

    $rootScope.$watch(
        function () {
            return Timeline.layers;
        },
        function (updatedLayers) {
            vm.layers = updatedLayers;
        }
    );

    $rootScope.$watch(
        function () {
            return Timeline.cursor;
        },
        function (cursor) {
            vm.cursor = cursor;
        }
    );

    this.cursor = Timeline.cursor;
    this.layers = Timeline.layers;
    this.active_layer = Timeline.active_layer;

    media1 = new Media('media/sample_2.mkv', 'video/webm');
    media3 = new Media('media/tears_of_steel.webm', 'video/webm');

    var layer1 = new Layer('Layer for Media 1');
    layer1.media = media1;
    layer1.order = 1;

    var layer3 = new Layer('Layer for Media 3');
    layer3.media = media3;
    layer3.order = 0;
    layer3.in = 5000;


    $rootScope.$watch(Timeline, function (newVal) {
        console.log("Timeline changed");
    });

    Timeline.addLayer(layer1);
    Timeline.addLayer(layer3);
    Timeline.setTarget('#canvas');
});
