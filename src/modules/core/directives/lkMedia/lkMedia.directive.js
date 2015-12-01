'use strict';

angular.module('module.core').directive('media', function ($rootScope, Video) {
    return {
        restrict: 'A',
        scope: {
            media: '=',
            config: '='
        },
        link: function (scope, element) {
            var video = Video.getInstance()(element[0]);

            video.src(scope.media.sources);
            video.width(scope.media.width);
            video.height(scope.media.height);

            scope.media.video = video;

            // Handle events
            video.on('timeupdate', function () {
                $rootScope.$broadcast('Media:TimeUpdate', scope.media);
                $rootScope.$apply();
            });

            video.on('loadedmetadata', function () {
                $rootScope.$broadcast("Media:Loaded", {id: scope.media.id, element: element[0]});
            });
        }
    }
});