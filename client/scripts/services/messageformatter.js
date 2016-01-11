'use strict';

angular.module('chatApp')
  .value('messageFormatter', function(date, username, message) {
    return date.toLocaleTimeString() + ' - ' + 
           username + ' : ' + 
           message + '\n';
    
  });
