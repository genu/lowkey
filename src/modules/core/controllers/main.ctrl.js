'use strict';

angular.module('module.core').controller('MainCtrl', function($rootScope, AUTH_EVENTS) {
  $rootScope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    // Handle an unauthorized user
  })

  $rootScope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    // Handle an unauthenticated user
  })
})
