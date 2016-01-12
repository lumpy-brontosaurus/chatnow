var app = angular.module('geoChat', ['ui.router', 'ngCookies', 'ngResource', 'ngSanitize','btford.socket-io', 'ngMap'])
    .value('nickName', username);
var username;

app.factory('User', ['$http', function( $http) {
    return {
        addUser: function (user) {
            console.log(user);
            return $http({
                method: 'POST',
                url: '/api/add',
                data:user
            })
                .then(function (resp) {
                    return resp;
                });
        },

        getUser: function(){
            return $http({
                method: 'GET',
                url: '/api/add'
            })
                .then(function (resp) {
                    console.log(resp);
                    return resp.data;
                });
        }
    }
}]);

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        FB.api('/me', function (response) {
            username = response.name;
        });
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

window.fbAsyncInit = function () {
  FB.init({
    appId      : '438180583036734',
    status     : true,
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2'
  });

  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });

  FB.Event.subscribe('auth.login', function (resp) {
    window.location = 'https://chat-geo.herokuapp.com/#/home';
  });
  FB.Event.subscribe('auth.logout', function (resp) {
    window.location = 'https://chat-geo.herokuapp.com/';
  });
};
// Load the SDK asynchronously
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

app.controller('AuthCtrl', ["$scope", "User", function ($scope, User) {
    $scope.username = [];
    $scope.FBLogin = function(){
        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome! Fetching your information... ');
                FB.api('/me', function(response) {
                    console.log('Good to see you, ' + response.name + '.');
                    username = response.name;
                    var accessToken = FB.getAuthResponse().accessToken;
                    console.log(accessToken);
                    $scope.username.push({user:response.name});
                    console.log($scope.username);
                    User.addUser($scope.username)
                        .catch(function (error) {
                            console.log(error);
                        });

                    User.getUser()
                         .then(function (resData){
                             console.log(resData[1].user);
                             //username = resData[1].user;
                        })
                        .catch(function (error){
                            console.log(error);
                        });
                });
     // $scope.$apply();
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: ''});
    };
}]);


app.controller('SocketCtrl', function ($log, $scope, chatSocket, messageFormatter, nickName, $http) {
    
    $scope.newMessages = [];
    $scope.nickName = username;
    $scope.messageLog = 'Ready to chat!';

    $scope.FBLogout = function(){
        FB.logout(function(response) {
            console.log("You are logged out");
        });
    };


    $scope.sendMessage = function() {
    var match = $scope.message.match('^\/nick (.*)');
    // if (angular.isDefined(match) && angular.isArray(match) && match.length === 2) {
    //   var oldNick = nickName;
    //   nickName = match[1];
    //   $scope.message = '';
    //     console.log($scope.messageLog);
    //   $scope.messageLog = messageFormatter(new Date(),
    //       nickName, 'nickname changed - from ' +
    //       oldNick + ' to ' + nickName + '!') + $scope.messageLog;
    //   $scope.nickName = nickName;
    // }

    $log.debug('sending message', $scope.message);
    chatSocket.emit('message', nickName, $scope.message);
    $scope.message = '';
    console.log(username);
  };

  $scope.$on('socket:broadcast', function (event, data) {
    $log.debug('got a message', data);
      console.log("this is sending " + data.source);
    if (!data.payload) {
      $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
      return;
    }

    $scope.$apply(function() {
      //$scope.messageLog = $scope.messageLog + messageFormatter(new Date(), data.source, data.payload);
        $scope.messageLog = messageFormatter(new Date(), username, data.payload);

        $scope.newMessages.push($scope.messageLog);
        console.log(username)

    });
  });
});


//map
app.controller('mapController', function ($scope, $interval, $http, NgMap) {

  var friends = [];
  var markers = [];
  var me = { position: { }, marker : new google.maps.Marker() };


  var updateMyPosition = function (position) {
    me.position = { lat: position.coords.latitude, lng: position.coords.longitude};
    NgMap.getMap().then(function (map) {
      me.marker.setMap(null);
      me.marker = new google.maps.Marker({
        position: me.position,
        map: map,
        title: 'Ron'
      })
      map.panTo(me.position);
    });
  };
  navigator.geolocation.getCurrentPosition(updateMyPosition);

  //test
  //friends.push(
  //  {position: new google.maps.LatLng(parseFloat(-70), parseFloat(140)), name: 'Aj'},
  //  {position: new google.maps.LatLng(parseFloat(-34), parseFloat(150)), name: 'Lyly'},
  //  {position: new google.maps.LatLng(parseFloat(0), parseFloat(160)), name: 'Random'}
  //);

  var init = function () {

    //update Positions
    $interval(function () {

      //Send my location and receive other's location
      $http({
        method: 'GET',
        url: 'https://chat-geo.herokuapp.com/location',
        params: {position: me.position, name: username}
      }).then(function successCallback(response) {
        friends = [];
        friends = response.data;
        NgMap.getMap().then(function (map) {

          //delete old markerss
          for(var j = 0 ; j < markers.length; j++){
            markers[j].setMap(null);
          }
          markers.splice(0, markers.length);

          //add new markers
          console.log(friends.length);
          for (var i = 0; i < friends.length; i++) {
            console.log(friends[i].position);
            markers.push(new google.maps.Marker({
              position: friends[i].position,
              map: map,
              title: friends[i].name
            }));
          }
        });
      }, function errorCallback(response) {
        console.log('ajax response failed', response);
      });
    }, 3000);
  };

  init();
});

app.factory('chatSocket', function (socketFactory) {
  var socket = socketFactory();
  socket.forward('broadcast');
  return socket;
});

app.value('messageFormatter', function (date, nick, message) {
  return date.toLocaleTimeString() + ' - ' +
    nick + ' - ' +
    message + '\n';

});


app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'app/auth/login.html',
        controller: 'SocketCtrl'
      });

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'app/chat/chat.html',
      controller: 'SocketCtrl'
    }).state('home.map', {
    url: '/map',
    templateUrl: 'app/map/map.html',
    controller: 'mapController'
  })
});
