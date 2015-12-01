'use strict';

angular.module('module.core').controller('TimelineCtrl', function ($compile, $interpolate, $rootScope, $timeout, Timeline, Layer, Sequence, Media, moment, VisDataSet, Hash) {
    var vm;
    vm = this;

    vm.data = '';
    this.isAddingMedia = false;
    this.cursor = Timeline.cursor;
    this.layers = Timeline.layers;
    this.active_layer = Timeline.active_layer;
    this.items = new VisDataSet();
    this.groups = new VisDataSet();
    this.events = {
        onload: function (timeline) {
            vm.timeline = timeline;

            timeline.addCustomTime(1000, 'playing-cursor');
        },
        onAddGroup: function(a,b,c,d){
            debugger;
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

    this.onAddMedia = function (source_media) {
        var layer, media;

        media = new Media(source_media.path, source_media.type);
        layer = new Layer(source_media.title);
        layer.media = media;

        Timeline.addLayer(layer);
    };

    this.addSequence = function () {
        Timeline.addSequence(new Sequence());
    };

    // Configure VisJS
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
        onAddGroup: function(a,b,c){
            debugger;
        },
        itemsAlwaysDraggable: true,
        groupEditable: true,
        orientation: {
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

    Timeline.setTarget('#canvas');


    // Handle events
    $rootScope.$on('Timeline:addSequence', function (e, sequence) {
        vm.groups.add({id: sequence.$id, title: sequence.$id, content: sequence});
        vm.timeline.setGroups(vm.groups);
    });

    $rootScope.$on('draggable:start', function () {
        vm.isAddingMedia = true;
        $rootScope.$apply();
    });

    $rootScope.$on('draggable:end', function () {
        vm.isAddingMedia = false;
        $rootScope.$apply();
    });

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
});
