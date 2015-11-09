'use strict';

angular.module('module.composition').factory('Media', function ($rootScope, Hash, Video) {
    function Media(src, type) {
        this.id = 'source_' + Hash.encode(src);
        this.video = null;
        this.sources = [{src: src, type: type}];
        this.tracks = [];
        this.poster = null;
    }

    Media.prototype.addSource = function (source_ref, type) {
        var _source = {
            src: source_ref,
            type: type
        };

        this.sources.push(_source);
    };

    Media.prototype.addTrack = function (kind, label, src, srclang) {
        var _track = {
            kind: kind,
            label: label,
            src: src,
            srclang: srclang
        };

        this.tracks.push(_track);
    };

    return Media;
});
