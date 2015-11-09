'use strict';

angular.module('module.core').run(function ($state, $rootScope, AuthService, AUTH_EVENTS) {
    // Validate that the user is allowed to enter the next state
    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
        if ('data' in next) {
            // Check if authentication is required
            if ('authRequired' in next.data && next.data.authRequired) {
                if (!AuthService.isAuthenticated()) {
                    if (next.name !== 'page.login') {
                        event.preventDefault();
                        $state.go('page.login');
                    }
                }
                // If user is authenicated check to see if they're allowed to access the state
            } else if ('authorizedRoles' in next.data) {
                if (!AuthService.isAuthorized(next.data.authorizedRoles)) {
                    event.preventDefault();
                    $state.go($state.current, {}, {
                        reload: true
                    });
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                }
            }
        }
    });

    // Top Menu
    $rootScope.topMenu = [];

    $rootScope.addTopMenu = function (name, uisref, icon) {
        $rootScope.topMenu.push({
            name: name,
            sref: uisref,
            icon: icon
        });
    };

    // Add static pages
    $rootScope.addTopMenu('Home', 'page.home', 'fa-home');
    $rootScope.addTopMenu('About', 'page.about', 'fa-question-circle');
    $rootScope.addTopMenu('Architecture', 'page.architecture', 'fa-wrench')
});
