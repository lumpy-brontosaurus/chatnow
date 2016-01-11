/**
 * Created by Ron on 1/9/2016.
 */
// googlemaps api AIzaSyDaeFJE1l6yYyPpgozt8AN3cQxEeC8A_aI
app.controller('mapController', function ($scope, $interval, $http, NgMap) {

  $scope.friends = [];

  $scope.friends.push(
    {position: {lat: 100, lng: 100}, name: 'Aj'},
    {position: {lat: 150, lng: -100}, name: 'Lyly'},
    {position: {lat: -100, lng: 50}, name: 'Random'}
  );

  var vm = this;

  vm.setPositions = function(position) {
    vm.positions = angular.copy(position);
  };

  vm.setPositions($scope.friends);


  var init = function () {

    //var updateMyPosition = function (position) {
    //  $scope.friends[0].position.lat = position.coords.latitude;
    //  $scope.friends[0].position.lng = position.coords.longitude;
    //};

    //update Positions
    $interval(function () {
      for (var i = 0; i < $scope.friends.length; i++) {
        NgMap.getMap().then(function (map) {
          //map.customMarkers.test.setPosition(friends[i].position);
        });
      }

      //update my position
      //navigator.geolocation.getCurrentPosition(updateMyPosition);
      //$http get positions from the server
    }, 3000);

  };


  init();
});


/* Old marker adding system
 $scope.friends[i].googleMarker = new google.maps.Marker({
 title: "This is " + $scope.friends[i].name
 });
 $scope.friends[i].googleMarker.setPosition(new google.maps.LatLng($scope.friends[i].position.lat, $scope.friends[i].position.lng));
 NgMap.getMap().then(function(map) {
 $scope.friends[i].googleMarker.setMap($scope.map);
 });*/
