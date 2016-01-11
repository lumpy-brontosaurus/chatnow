/**
 * Created by Ron on 1/9/2016.
 */
// googlemaps api AIzaSyDaeFJE1l6yYyPpgozt8AN3cQxEeC8A_aI

//app.controller('mapController', function ($scope, $interval, $http, NgMap) {
//
//  var friends = [];
//  var markers = [];
//  var me = {position: {lat: -25.363, lng: 131.044}, name: 'Ron'};
//
//
//  var updateMyPosition = function (position) {
//    me.position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//    console.log(me.position, position.coords.latitude, position.coords.longitude)
//
//  };
//  navigator.geolocation.getCurrentPosition(updateMyPosition);
//
//  //test
//  friends.push(
//    {position: new google.maps.LatLng(parseFloat(-70), parseFloat(140)), name: 'Aj'},
//    {position: new google.maps.LatLng(parseFloat(-34), parseFloat(150)), name: 'Lyly'},
//    {position: new google.maps.LatLng(parseFloat(0), parseFloat(160)), name: 'Random'}
//  );
//
//  NgMap.getMap().then(function (map) {
//    //friends = response.data;
//    friends.push(
//      {position: new google.maps.LatLng(parseFloat(-70), parseFloat(140)), name: 'Aj'},
//      {position: new google.maps.LatLng(parseFloat(-34), parseFloat(150)), name: 'Lyly'},
//      {position: new google.maps.LatLng(parseFloat(0), parseFloat(160)), name: 'Random'}
//    );
//  });
//
//  var init = function () {
//
//    //update Positions
//    $interval(function () {
//
//      //Send my location and receive other's location
//      $http({
//        method: 'GET',
//        url: 'http://localhost:3000/location',
//        params: {position: me.position, name: 'Ron'}
//      }).then(function successCallback(response) {
//        friends = response.data;
//        console.log(response.data)
//        NgMap.getMap().then(function (map) {
//          for (var i = 0; i < friends.length; i++) {
//            for(var j = 0 ; j < markers.length; j++){
//              markers[j].setMap(null);
//              markers.splice(0, markers.length);
//            }
//            markers.push(new google.maps.Marker({
//              position: friends[i].position,
//              map: map,
//              title: friends[i].name
//            }));
//          }
//        });
//      }, function errorCallback(response) {
//        console.log('ajax response failed', response);
//
//      });
//    }, 3000);
//  };
//
//  init();
//});