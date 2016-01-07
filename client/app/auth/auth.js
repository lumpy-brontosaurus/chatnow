  // // // This is called with the results from from FB.getLoginStatus().
  // function statusChangeCallback(response) {
  //   console.log('statusChangeCallback');
  //   console.log(response);
  
  //   if (response.status === 'connected') {
  //     // Logged into your app and Facebook.
  //     testAPI();
  //   } else if (response.status === 'not_authorized') {
  //     // The person is logged into Facebook, but not your app.
  //     document.getElementById('status').innerHTML = 'Please log ' +
  //       'into this app.';
  //   } else {
  
  //     document.getElementById('status').innerHTML = 'Please log ' +
  //       'into Facebook.';
  //   }
  // }
  
  // function checkLoginState() {
  //   FB.getLoginStatus(function(response) {
  //     statusChangeCallback(response);
  //   });
  // }
  
  // // window.fbAsyncInit = function() {
  // // FB.init({
  // //   appId      : '{438180583036734}',
  // //   xfbml      : true,  // parse social plugins on this page
  // //   version    : 'v2.2' // use version 2.2
  // // });
  
  
  // // FB.getLoginStatus(function(response) {
  // //   statusChangeCallback(response);
  // // });
  
  // // };
  
  // // // Load the SDK asynchronously
  // // (function(d, s, id) {
  // //   var js, fjs = d.getElementsByTagName(s)[0];
  // //   if (d.getElementById(id)) return;
  // //   js = d.createElement(s); js.id = id;
  // //   js.src = "//connect.facebook.net/en_US/sdk.js";
  // //   fjs.parentNode.insertBefore(js, fjs);
  // // }(document, 'script', 'facebook-jssdk'));
  
  // // Here we run a very simple test of the Graph API after login is
  // // successful.  See statusChangeCallback() for when this call is made.
  // // function testAPI() {
  // //   console.log('Welcome!  Fetching your information.... ');
  // //   FB.api('/me', function(response) {
  // //     console.log('Successful login for: ' + response.name);
  // //     document.getElementById('status').innerHTML =
  // //       'Thanks for logging in, ' + response.name + '!';
  // //   });
  // // }
  // //

