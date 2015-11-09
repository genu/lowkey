'use strict';

angular.module('module.core').filter('inDuration', function () {
    function isNumeric(str) {
        return !isNaN(str);
    }

    function pad(num) {
        if (isNumeric(num)) {
            num = parseInt(num);

            if (num < 10) {
                num = "0" + num;
            }
        }

        return num;
    }

    return function (input) {
        var ms, seconds, minutes, hours;
        ms = seconds = minutes = hours = 0;
        ms = input;

        if (ms > 1000) {
            seconds = Math.floor(ms / 1000);
            ms -= (seconds * 1000);
        }

        if (seconds > 60) {
            minutes = Math.floor(seconds / 60);
            seconds -= (minutes * 60);
        }

        if (minutes > 60) {
            hours = Math.floor(minutes / 60);
            minutes -= (hours * 60);
        }

        return "00:" + pad(hours) + ":" + pad(minutes) + ":" + pad(seconds) + ":" + pad(String(parseInt(ms)).substr(0, 2));
    };
});
