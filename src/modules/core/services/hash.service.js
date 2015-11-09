'use strict';

angular.module('module.core').service('Hash', function () {
    return {
        encode: function (string) {
            var hash = 0, i, chr, len;
            if (string.length == 0) return hash;
            for (i = 0, len = string.length; i < len; i++) {
                chr = string.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }

            return Math.abs(hash);
        }
    }
});
