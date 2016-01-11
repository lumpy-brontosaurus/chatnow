
var access_token;
var app = angular.module('geoChat', ['ui.router', 'ngCookies', 'ngResource', 'ngSanitize','btford.socket-io'])
    .value('nickName', 'anonymous');
var username = '';

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        FB.api('/me', function(response) {
            console.log("here");
            console.log(JSON.stringify(response));
            username = response.name;
        });
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

window.fbAsyncInit = function() {
  FB.init({
    appId      : '438180583036734',
    status     : true,
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  FB.Event.subscribe('auth.login', function(resp) {
   window.location = 'http://www.localhost:3000/#/home';
 });
    FB.Event.subscribe('auth.logout', function(resp) {
   window.location = 'http://www.localhost:3000/';
 });

};
  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)){
      return;
    }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


app.controller('AuthCtrl', ["$scope", "User", function ($scope, User) {
    $scope.FBLogin = function(){
        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome! Fetching your information... ');
                FB.api('/me', function(response) {
                    console.log('Good to see you, ' + response.name + '.');
                    var accessToken = FB.getAuthResponse().accessToken;
                    console.log(accessToken);
                    username = response.name;
                    User.addUser(username)
                        .catch(function (error) {
                            console.log(error);
                        })
                });
     // $scope.$apply();
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: ''});
    };

    $scope.FBFriends = function() {
      FB.api('/me/friends?access_token=CAACEdEose0cBAL5TMM7iOge5JauOU5JlAJl6Pt1qzMlkmiwxJo9RezXcY6zWRXslYd1AWZBf43WvULwzg9WKdbGgHL8FqqvOJ8J4582s76sXcoiCT8nZATMSduEFAywHlmZAzoecHNB6b83Wh69GfA3FKDQfAZC9b0faKYLSZAQ8IH4bhetuaoqSV6uTaBZCoxsPDunmtsrAZDZD', function(response) {
        $scope.$apply(function() {
          $scope.myFriends = response.data;
          console.log(response);
        });
      });
    };

  $scope.FBLogout = function(){
    FB.logout(function(response) {
      $scope.access_token =   FB.getAuthResponse()['accessToken'];
      FB.Auth.setAuthResponse(null, 'unknown');
      console.log("You are logged out");
      // $scope.$apply();
    });
  };

}]);

app.factory('User', ['$http', function( $http) {
    return {
        addUser: function (item) {
            return $http({
                method: 'POST',
                url: '/home/add',
                headers: {Authorization: 'Bearer ' + Auth.getToken()},
                data: item

            })
                .then(function (resp) {
                    return resp;
                });
        }
    }
}]);


app.controller('SocketCtrl', function ($log, $scope, chatSocket, messageFormatter, nickName) {
    //if(statusChangeCallback().authResponse.id !== undefined){
    //    FB.api('/me', function(response) {
    //        console.log('Good to see you, ' + response.name + '.');
    //        var accessToken = FB.getAuthResponse().accessToken;
    //        console.log(accessToken);
    //        username = response.name;
    //    });
    //}
  $scope.nickName = username;
  $scope.messageLog = 'Ready to chat!';
  $scope.sendMessage = function() {
    var match = $scope.message.match('^\/nick (.*)');

    if (angular.isDefined(match) && angular.isArray(match) && match.length === 2) {
      var oldNick = nickName;
      nickName = match[1];
      $scope.message = '';
      $scope.messageLog = messageFormatter(new Date(),
              nickName, 'nickname changed - from ' +
              oldNick + ' to ' + nickName + '!') + $scope.messageLog;
      $scope.nickName = nickName;
    }

    $log.debug('sending message', $scope.message);
    chatSocket.emit('message', nickName, $scope.message);
    $scope.message = '';
  };

  $scope.$on('socket:broadcast', function(event, data) {
    $log.debug('got a message', event.name);
    if (!data.payload) {
      $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
      return;
    }
    $scope.$apply(function() {
      $scope.messageLog = $scope.messageLog + messageFormatter(new Date(), data.source, data.payload);
    });
  });
});

app.factory('chatSocket', function (socketFactory) {
  var socket = socketFactory();
  socket.forward('broadcast');
  return socket;
});

app.value('messageFormatter', function(date, nick, message) {
  return date.toLocaleTimeString() + ' - ' +
      nick + ' - ' +
      message + '\n';

});


app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/login');

  $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/auth/login.html',
        controller: 'SocketCtrl'
      });

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'app/chat/chat.html',
      controller: 'SocketCtrl'
  })
});
