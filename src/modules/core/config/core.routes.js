'use strict';

angular.module('module.core').config(function ($stateProvider, USER_ROLES) {
    $stateProvider
        .state('app', {
            url: '/app',
            views: {
                '': {
                    templateUrl: 'modules/core/views/layouts/app.html',
                    controller: 'AppCtrl as app'
                },
                'previewer': {
                    templateUrl: 'modules/core/views/editor/previewer/main.html',
                    controller: 'PreviewerCtrl as previewer'
                },
                'resources': {
                    templateUrl: 'modules/core/views/editor/resources/main.html',
                    controller: 'ResourcesCtrl as resources'
                },
                'timeline': {
                    templateUrl: 'modules/core/views/editor/timeline/main.html',
                    controller: 'TimelineCtrl as timeline',
                    onEnter: function(){
                        console.log("entered state");
                    }
                }
            }
        })
        .state('page', {
            abstract: true,
            url: '/page',
            templateUrl: 'modules/core/views/layouts/page.html',
            controller: 'PageCtrl as page',
            data: {
                authorizedRoles: [USER_ROLES.all],
                authRequired: false
            }
        })
        .state('page.home', {
            url: '/home',
            templateUrl: 'modules/core/views/home.html'
        })
        .state('page.about', {
            url: '/about',
            templateUrl: 'modules/core/views/about.html'
        })
        .state('page.architecture', {
            url: '/architecture',
            templateUrl: 'modules/core/views/architecture.html'
        })
});
