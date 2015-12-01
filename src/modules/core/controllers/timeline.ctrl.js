'use strict';

angular.module('module.core').controller('TimelineCtrl', function ($compile, $interval, $interpolate, $rootScope, $timeout, Timeline, Segment, Sequence, Media, moment, VisDataSet, Hash) {
    var vm;
    vm = this;

    vm.data = '';
    this.isScrubbing = false;
    this.cursor = Timeline.cursor;
    this.sequences = Timeline.sequences;
    this.active_layer = Timeline.active_layer;
    this.items = new VisDataSet();
    this.groups = new VisDataSet();

    $rootScope.$watch(function () {
        return Timeline.cursor;
    }, function (new_cursor) {
        if (!_.isUndefined(vm.timeline)) {
            if (!vm.isScrubbing) {
                vm.timeline.setCustomTime(vm.cursor, 'playing-cursor');
            }
        }

        vm.cursor = new_cursor;
    });
    /* Background processes */
    $interval(function () {
        // Make each sequence a droppable target
        $('.draggable.sequence').droppable({
            hoverClass: 'sequence-drop-hover',
            drop: vm.onMediaDrop
        })
    }, 1000);

    /* Events */
    this.onMoveSequence = function (sequence, callback) {
        callback(sequence);
    };

    this.onChangeSegment = function (item, callback) {
        var lTrim, rTrim, actual_duration, trimed_duration, offset;

        actual_duration = item.segment.out - item.segment.in;

        lTrim = moment(item.start).diff(vm.timeline_start, 'milliseconds');
        rTrim = moment(item.end).diff(vm.timeline_start, 'milliseconds');

        trimed_duration = rTrim - lTrim;

        if (trimed_duration <= actual_duration) {
            item.segment.lTrim = lTrim;
            item.segment.rTrim = rTrim;
            callback(item);
        }
    };

    this.onMediaDrop = function (event, ui) {
        var model, segment;

        model = ui.draggable.data('model');

        segment = new Segment(model.title);
        segment.media = new Media(model.path, model.type);

        Timeline.getSequenceById(this.title).addSegment(segment);
    };

    this.events = {
        onload: function (timeline) {
            vm.timeline = timeline;

            vm.timeline_start = moment(vm.timeline.getWindow().start);

            timeline.addCustomTime(1000, 'playing-cursor');
        },
        onaddgroup: function (a, b, c, d) {
            debugger;
        },
        onupdate: function (a, b, c, d) {
            debugger;
        },
        select: function (data) {
            if (data.items.length > 0) {
                $rootScope.$broadcast('Timeline:LayerSelected', vm.items.get(data.items)[0].segment);
            } else {
                $rootScope.$broadcast('Timeline:LayerDeselected');
            }
        },
        rangechange: function (start, end, byUser) {

        },
        timechange: function (time_ref) {
            vm.isScrubbing = true;
            if (time_ref.id == 'playing-cursor') {
                Timeline.cursor = moment(time_ref.time).diff(vm.timeline_start, 'milliseconds');
            }
        },
        timechanged: function (time_ref) {
            vm.isScrubbing = false;
        }
    };

    /* User Actions */
    this.zoomIn = function () {
        console.log("zoomin");
    };

    this.fitAll = function () {
        this.timeline.fit();
    };

    this.addSequence = function () {
        var sequence;

        sequence = new Sequence();
        Timeline.addSequence(sequence);

        // Add to vis
        this.groups.add({id: sequence.$id, title: sequence.$id, content: sequence, className: 'sequence'});
        this.timeline.setGroups(this.groups);
    };

    // Configure VisJS
    this.options = {
        editable: true,
        selectable: true,
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
        template: function (item) {
            var html;
            html = '' +
                '<div class="ui small info message" style="padding: 5px;">' +
                '   <div class="header">' + item.segment.name + '</div>' +
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
            return '<div style="margin-top: 50px;">Sequence ' + (group.content.order + 1) + '</div>';
        },
        onMoveGroup: this.onMoveSequence,
        onMoving: this.onChangeSegment,
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
    $rootScope.$on('video:timeupdate', function () {
        vm.timeline.setCustomTime(Timeline.cursor, 'playing-cursor');
        vm.timeline.redraw();
    });

    $rootScope.$on('select', function (items, e) {
        debugger;
    });

    $rootScope.$on('Segment:Initialized', function (e, segment) {
        var sequence;

        // Add the new segment to the vis timeline
        sequence = Timeline.getSequenceBySegment(segment);

        vm.items.add({
            id: segment.$id,
            group: sequence.$id,
            segment: segment,
            start: 0,
            end: segment.media.video.duration() * 1000
        });

        vm.timeline.setItems(vm.items);
    });
});
