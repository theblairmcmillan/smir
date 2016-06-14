angular.module('starter.controllers', ['ionic'])
.constant('FORECASTIO_KEY', '673cebf3d7cbd2a1869b03575f8ef3e1')
.controller('HomeCtrl', function($scope,$state,Weather,DataStore) {
    //read default settings into scope
  console.log('inside home');
  $scope.city  = DataStore.city;
  var latitude  =  DataStore.latitude;
  var longitude = DataStore.longitude;
  $scope.current;
  $scope.scottishData;


  //call getCurrentWeather method in factory ‘Weather’
  Weather.getCurrentWeather(latitude,longitude).then(function(resp) {
    $scope.current = resp.data;
    console.log('GOT CURRENT', $scope.current);
    console.log("Rain intesity >>>>", $scope.current.currently.precipIntensity);

    if($scope.current.currently.temperature < 32){
      $scope.scottishData = scottishInfo.chankin;
    } else {
      $scope.scottishData = scottishInfo.roastin;
    }
    //debugger;
  }, function(error) {
    alert('Unable to get current conditions');
    console.error(error);

  });

  var scottishInfo = {
    chankin : {
      header: "Chankin",
      explainer: "very cold",
      phrase: "it's pure chanking ootside"
    },
    roastin : {
      header: "Roastin",
      explainer: "very warm",
      phrase: "It's roastin, man!"
    }
  };


 







}) // END OF HOME CONTROLLER 
.controller('LocationsCtrl', function($scope,$state, Cities,DataStore) {
  $scope.cities = Cities.all();

  $scope.changeCity = function(cityId) {
    //get lat and longitude for seleted location
    var lat  = $scope.cities[cityId].lat; //latitude
    var lgn  = $scope.cities[cityId].lgn; //longitude
    var city = $scope.cities[cityId].name; //city name

    DataStore.setCity(city);
    DataStore.setLatitude(lat);
    DataStore.setLongitude(lgn);

    $state.go('tab.home');
  }

})

.controller('SettingsCtrl', function($scope) {
    //manages app settings

});















