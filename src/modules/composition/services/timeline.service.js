'use strict';

angular.module('module.composition').service('Timeline', function ($rootScope, $timeout, $interval, Seriously, moment) {
    var vm = this;

    this.active_segment = null;
    this.active_layer = null;
    this.sequences = [];
    this.cursor = 0;
    this.isPaused = true;

    var seriously = Seriously.getInstance();
    var target = null;

    var player;

    $rootScope.$on('Timeline:RequestToSwitchSegmentContext', function () {
        // Stop active segment
        if (!_.isNull(vm.active_segment)) {
            vm.active_segment.media.video.pause();
        }
    });

    $rootScope.$on('Timeline:SwitchSegmentContext', function () {
        target.source = vm.videoScale(vm.active_segment.render());

        // Play from cursor
        vm.active_segment.playAt(vm.cursor);
    });

    $rootScope.$on('Timeline:RequestToRender', function () {
        target.source = vm.videoScale(vm.active_segment.render());
    });

    $rootScope.$on('Media:Loaded', function (event, media_ref) {
        //Initialize the segment with the new media
        _.forEach(vm.sequences, function (sequence) {
            _.forEach(sequence.segments, function (segment) {
                if (!segment.isInitialized && segment.media.id === media_ref.id) {
                    segment.initSource(media_ref.element);
                }
            })
        });
    });

    this.getSequenceBySegment = function (segment) {
        return _.find(this.sequences, function (sequence) {
            return !_.isUndefined(sequence.getSegmentById(segment.$id));
        });
    };

    this.getSequenceById = function (id) {
        return _.filter(this.sequences, function (sequence) {
            return sequence.$id === _.parseInt(id);
        })[0];
    };

    this.addSequence = function (sequence) {
        sequence.order = this.sequences.length; // Automatically make it the last sequence
        this.sequences.push(sequence);

        $rootScope.$broadcast('Timeline:addSequence', sequence);
    };

    this.setTarget = function (target_ref) {
        target = seriously.target(target_ref);

        seriously.go();
    };

    this.videoScale = function (source) {
        var reformat;
        reformat = seriously.transform('reformat');
        reformat.width = target.width;
        reformat.height = target.height;
        reformat.mode = "distort";
        reformat.source = source;

        return reformat;

    };

    this.play = function () {
        player = $interval(function () {
            var hasSegments, sortedSequences;

            hasSegments = false;

            vm.cursor += 50;

            // Check for available segments
            _.forEach(vm.sequences, function (sequence) {
                if (sequence.hasSegments()) {
                    hasSegments = true;
                }
            });

            if (!hasSegments) {
                target.source = vm.videoScale('#colorbars');
                vm.active_segment = null;
            } else {
                //Figure out which segment to play
                sortedSequences = _.sortBy(vm.sequences, function (sequence) {
                    return sequence.order;
                });

                _.forEach(sortedSequences, function (sequence) {
                    var segment;

                    segment = sequence.getSegmentAtTime(vm.cursor);

                    if (!_.isNull(segment)) {
                        if (_.isNull(vm.active_segment) || segment.$id !== vm.active_segment.$id) {
                            $rootScope.$broadcast('Timeline:RequestToSwitchSegmentContext');
                            vm.active_segment = segment;
                            $rootScope.$broadcast('Timeline:SwitchSegmentContext');
                            vm.isPaused = false;
                        } else if (vm.isPaused) {
                            segment.playAt(vm.cursor);
                            vm.isPaused = false;
                        }
                    } else {
                        target.source = vm.videoScale('#colorbars');
                        vm.active_segment = null;
                    }
                });
            }
        }, 50);
    };

    this.pause = function () {
        $interval.cancel(player);

        this.isPaused = true;

        // Stop active segment if available
        if (!_.isNull(this.active_segment)) {
            this.active_segment.media.video.pause();
        }
    };
});
