'use strict';

angular.module('module.composition').factory('Sequence', function (Hash) {
    function Sequence(name) {
        this.$id = Hash.random();
        this.name = name;
        this.order = 0;
        this.segments = [];
        this.active = true;
    }

    Sequence.prototype.getSegmentById = function (id) {
        return _.find(this.segments, function (segment) {
            return segment.$id === id;
        });
    };

    Sequence.prototype.getSegmentAtTime = function (time) {
        var active = null;

        _.forEach(this.segments, function (segment) {
            if (segment.lTrim <= time && segment.rTrim >= time) {
                active = segment;
            }
        });

        return active;
    };

    Sequence.prototype.hasSegments = function () {
        return this.segments.length > 0;
    };

    Sequence.prototype.addSegment = function (segment) {
        this.segments.push(segment);
    };

    Sequence.prototype.initSource = function (element) {
    };


    return Sequence;
});
