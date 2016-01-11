'use strict';

angular
  .module('geoChat', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io'
  ])
  .value('nickName', username);
