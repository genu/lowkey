'use strict';

angular.module('module.auth').service('AuthService', function(store) {
  var isAuthenticated = false;
  var role = '';
  var session = null;

  return {
    login: function() {
      // Implement custom login
      // store.set(package.name + '.session', 'CUSTOM SESSION');
    },
    logout: function() {
      // Implement custom logout
      // store.remove(package.name + '.session');
    },
    session: function() {
      return session;
    },
    isAuthorized: function(authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }

      // If authorizedRoles role has * allow passthrough
      if (authorizedRoles.indexOf('*') !== -1) {
        return true;
      } else {
        return (authorizedRoles.indexOf(role) !== -1);
      }
    },
    isAuthenticated: function() {
      return isAuthenticated;
    }
  }
})
