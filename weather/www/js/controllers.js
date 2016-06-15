angular.module('starter.controllers', ['ionic'])
.constant('FORECASTIO_KEY', '673cebf3d7cbd2a1869b03575f8ef3e1')
.controller('HomeCtrl', function($scope,$state,Weather,DataStore) {
    //read default settings into scope
  console.log('inside home');
  $scope.city = DataStore.city;
  var latitude =  DataStore.latitude;
  var longitude = DataStore.longitude;
  var hitCount = DataStore.getHitCount();
  $scope.current;
  $scope.scottishData;

  function callWeatherAPI(lat, long) {
    //CALL GET CURRENT WEATHER FROM WEATHER FACTORY
    Weather.getCurrentWeather(lat, long)
    .then(function(resp) {
      $scope.current = resp.data;
      console.log('GOT CURRENT', $scope.current);

      if($scope.current.currently.temperature < 32){
        $scope.scottishData = scottishInfo.chankin;
      } else if($scope.current.currently.temperature >= 32 && $scope.current.currently.temperature <= 72) {
        $scope.scottishData = scottishInfo.naeBad;
      } else {
        $scope.scottishData = scottishInfo.roastin;
      }
      //SHOW ERROR IF CAN'T GET WEATHER 
    }, function(error) {
      alert('Unable to get current conditions');
      console.error(error);
    });
  };


  if (hitCount === 0) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(data){
        console.log(">>>>>>>", data);
        DataStore.latitude = data.coords.latitude;
        DataStore.longitude = data.coords.longitude;
        callWeatherAPI(data.coords.latitude, data.coords.longitude)
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    };
    DataStore.setHitCount();
  } else {
    callWeatherAPI(latitude, longitude)
  };


  // OBJECTS OF SCOTTISH DATA 
  var scottishInfo = {
    chankin : {
      header: "Chankin!",
      explainer: "very cold",
      phrase: "it's pure chanking ootside."
    },
    roastin : {
      header: "Roastin!",
      explainer: "very warm",
      phrase: "It's heavy roastin ootside."
    },
    naeBad : {
      header: "Nae Bad",
      explainer: "fairly pleasant",
      phrase: "It's nae bad the day."
    }
  };

}) // END OF HOME CONTROLLER 


// GETTTING NEW LAT AND LONG OF SELECTED CITY 
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















