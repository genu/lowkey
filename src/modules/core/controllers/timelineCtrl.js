'use strict';

angular.module('module.core').controller('TimelineCtrl', function ($compile, $interpolate, $rootScope, $timeout, Timeline, Layer, Media, moment, VisDataSet, $scope) {
    var vm;
    vm = this;

    vm.data = '';
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
    this.items = [];
    this.events = {
        onload: function (timeline) {
            vm.timeline = timeline;

            timeline.addCustomTime(1000, 'playing-cursor');
        },
        select: function (data) {
            $rootScope.$broadcast('Timeline:LayerSelected', vm.items.get(data.items)[0].layer);
        }
    };

    this.zoomIn = function () {
        console.log("zoomin");
    };

    this.fitAll = function () {
        this.timeline.fit();
    };

    $rootScope.$on('video:timeupdate', function () {
        vm.timeline.setCustomTime(Timeline.cursor, 'playing-cursor');
        vm.timeline.redraw();
    });

    $rootScope.$on('select', function (items, e) {
        debugger;
    });

    $rootScope.$on('media:loaded', function (a, b, c) {
        vm.items = new VisDataSet();
        vm.groups = new VisDataSet();

        _.forEach(Timeline.layers, function (layer, index) {
            index++;
            vm.items.add({
                id: index,
                group: index,
                layer: layer,
                start: 0,
                end: layer.media.video.duration() * 1000,
                className: 'blah'
            });

            vm.groups.add({id: index, content: layer});

            vm.data = {
                items: vm.items,
                groups: vm.groups
            }
        });

        vm.timeline.redraw();
    });

    this.onAddMedia = function (source_media) {
        var layer, media;

        media = new Media(source_media.path, source_media.type);
        layer = new Layer(source_media.title);
        layer.media = media;

        Timeline.addLayer(layer);
    };

    Timeline.setTarget('#canvas');

    // create visualization
    this.options = {
        editable: true,
        start: 0,
        min: 0,
        end: 900000,
        align: 'left',
        height: "100%",
        timeAxis: {scale: 'second', step: 15},
        type: 'range',
        showCurrentTime: false,
        zoomMax: 1000 * 60 * 20,
        stack: false,
        template: function (media) {
            var html;
            html = '' +
                '<div class="ui small info message" style="padding: 5px;">' +
                '   <div class="header">' + media.layer.name + '</div>' +
                '</div>';

            return html;
        },
        groupOrder: function (layer1, layer2) {
            return layer1.content.order - layer2.content.order;
        },
        groupOrderSwap: function (layer1, layer2, gropus) {
            var a_order = layer1.content.order;

            layer1.content.order = layer2.content.order;
            layer2.content.order = a_order;
        },
        groupTemplate: function (group) {
            return '<div style="margin-top: 50px;">Sequence ' + group.content.order + '</div>';
        },
        itemsAlwaysDraggable: true,
        groupEditable: true,
        orientation:{
            axis: 'top',
            item: 'bottom'
        },
        multiselect: true,
        autoResize: false,
        format: {
            minorLabels: {
                millisecond: 'SSS',
                second: ':s',
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

    $scope.timelineLoaded = true;
});
