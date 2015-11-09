'use strict';

angular.module('module.core').controller('PreviewerCtrl', function ($rootScope, Timeline) {
    Timeline.setTarget('#canvas');
    this.play = function () {
        Timeline.play();
    };

    this.pause = function () {
        Timeline.pause();
    };

    this.next = function () {
        Timeline.next();
    }
});
