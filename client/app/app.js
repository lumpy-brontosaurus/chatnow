var app = angular.module('geoChat', ['ui.router']);

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
  
    if (response.status === 'connected') {
    
    } else if (response.status === 'not_authorized') {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
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
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });
  
  
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
  
  };
  
  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


app.controller('AuthCtrl', ["$scope", "$location", function ($scope, $location) {


  $scope.FBLogin = function () {
    FB.login(function(response) {
      if (response.authResponse) {
      var access_token =   FB.getAuthResponse()['accessToken'];
       console.log('Welcome!  Fetching your information.... ');
       FB.api('/me', function(response) {
         console.log('Good to see you, ' + response.name + '.', response);
       });
      } else {
       console.log('User cancelled login or did not fully authorize.');
      }
    }, {scope: ''});
  }


  $scope.FBLogout = function(){
    FB.logout(function(response) {
      console.log("You are logged out");
    });
  }
}]);


app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/login');

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'app/auth/login.html',
    controller: 'AuthCtrl'
  })
})
