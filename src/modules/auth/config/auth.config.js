'use strict';

angular.module('module.auth').config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})
