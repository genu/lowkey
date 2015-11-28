'use strict';

angular.module('module.core').controller('TimelineCtrl', function ($rootScope, $timeout, Timeline, Layer, Media, moment, VisDataSet, $scope) {
    var vm, groups, groupCount, graph2d, timeline;
    vm = this;
    groups = new VisDataSet();
    groupCount = 0;

    this.isAddingMedia = false;

    $rootScope.$on('draggable:start', function () {
        vm.isAddingMedia = true;
        $rootScope.$apply();
    });

    $rootScope.$on('draggable:end', function () {
        vm.isAddingMedia = false;
        $rootScope.$apply();
    });

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

    this.cursor = Timeline.cursor;
    this.layers = Timeline.layers;
    this.active_layer = Timeline.active_layer;
    this.events = {
        onload: function (timeline) {
            vm.timeline = timeline;

            timeline.addCustomTime(1000, 'playing-cursor');
        }
    };

    $rootScope.$watch(Timeline, function (newVal) {
        console.log("Timeline changed");
    });

    $rootScope.$on('video:timeupdate', function () {
        vm.timeline.setCustomTime(Timeline.cursor, 'playing-cursor');
    });

    $rootScope.$on('media:loaded', function (a, b, c) {
        var items = new VisDataSet();
        _.forEach(Timeline.layers, function (layer) {
            items.add({
                id: groupCount,
                group: groupCount,
                content: layer.name,
                start: 0,
                end: layer.media.video.duration() * 1000
            });

            groups.add({id: groupCount, content: 'layer: ' + layer.name});

            groupCount++;
            $scope.timelineData = {
                items: items,
                group: groups
            }
        })
    });

    $rootScope.$on('Timeline:playing', function () {
        console.log("playing");
    });

    this.onAddMedia = function (source_media) {
        var layer, media;

        media = new Media(source_media.path, source_media.type);
        layer = new Layer(source_media.title);
        layer.media = media;

        Timeline.addLayer(layer);
    };

    Timeline.setTarget('#canvas');

    // ------------------------------------------------
    // Event Handlers
    $scope.setNow = function (direction) {
        var range = graph2d.getWindow();
        var interval = range.end - range.start;
        $scope.timeNow = moment().valueOf();

        if (graph2d === undefined) {
            return;
        }

        graph2d.setOptions({max: $scope.timeNow});
        graph2d.setWindow(0, 1000);
    };

    $scope.stepWindow = function (direction) {
        var percentage = (direction > 0) ? 0.2 : -0.2;
        var range = graph2d.getWindow();
        var interval = range.end - range.start;

        if (graph2d === undefined) {
            return;
        }

        graph2d.setWindow({
            start: 0,
            end: 1000
        });
    };

    $scope.zoomWindow = function (percentage) {
        var range = graph2d.getWindow();
        var interval = range.end - range.start;

        if (graph2d === undefined) {
            return;
        }

        graph2d.setWindow({
            start: 0,
            end: 1000
        });
    };

    $scope.setDateRange = function () {
        $scope.timeNow = moment().valueOf();

        if (graph2d === undefined) {
            return;
        }

        graph2d.setOptions({max: $scope.timeNow});
        graph2d.setWindow(0, 1000);
        graph2d.addCustomTime(1000, 'cursor');
    };

    // create visualization
    $scope.timelineOptions = {
        editable: true,
        start: 0,
        end: 900000,
        stack: true,
        height: "100%",
        groupOrder: 'content',  // groupOrder can be a property name or a sorting function
        timeAxis: {scale: 'second', step: 15},
        type: 'range',
        showCurrentTime: false,
        format: {
            minorLabels: {
                millisecond: 'SSS',
                second: 's',
                minute: 'HH:mm',
                hour: 'HH:mm',
                weekday: 'ddd D',
                day: 'D',
                month: 'MMM',
                year: 'YYYY'
            },
            majorLabels: {
                millisecond: 'HH:mm:ss',
                second: '00:mm:ss',
                minute: 'D MMMM',
                hour: 'ddd D MMMM',
                weekday: 'MMMM YYYY',
                day: 'MMMM YYYY',
                month: '',
                year: ''
            }
        }
    };

    $scope.timelineData = "";

    $scope.timelineLoaded = true;


});
