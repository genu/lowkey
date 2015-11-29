'use strict';

angular.module('module.core').controller('TimelineCtrl', function ($compile, $interpolate, $rootScope, $timeout, Timeline, Layer, Media, moment, VisDataSet, $scope) {
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

    $rootScope.$on('video:timeupdate', function () {
        vm.timeline.setCustomTime(Timeline.cursor, 'playing-cursor');
        vm.timeline.redraw();
    });

    $rootScope.$on('select', function (items, e) {
        debugger;
    });

    $rootScope.$on('media:loaded', function (a, b, c) {
        vm.items = new VisDataSet();
        _.forEach(Timeline.layers, function (layer) {
            vm.items.add({
                id: groupCount,
                group: groupCount,
                layer: layer,
                start: 0,
                end: layer.media.video.duration() * 1000
            });

            groups.add({id: groupCount, content: 'layer: ' + layer.name});

            groupCount++;
            $scope.timelineData = {
                items: vm.items,
                group: groups
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
        groupOrder: 'content',  // groupOrder can be a property name or a sorting function
        timeAxis: {scale: 'second', step: 15},
        type: 'range',
        showCurrentTime: false,
        //moveable: false,
        //zoomable: false,
        template: function (media) {
            var html;
            html = '' +
                '<div class="ui positive message" droppable>' +
                '   <div class="header" style="border 1px solid black; padding:30px;">' + media.layer.name + '</div>' +
                '   <table class="ui definition compact small table">' +
                '       <thead>' +
                '           <tr>' +
                '               <th></th>' +
                '               <th>Effect</th>' +
                '           </tr>' +
                '       </thead>' +
                '       <tbody>' +
                '           <tr>' +
                '               <td>off</td>' +
                '               <td>BW</td>' +
                '           </tr>' +
                '       </tbody>' +
                '   </table>' +
                '</div>';

            return $compile(html)($rootScope.$new()).html();
        },
        multiselect: true,
        autoResize: false,
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
