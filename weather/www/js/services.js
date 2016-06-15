'use strict';
// CONTACTING FORCASTio AND GETTING CURRENT WEATHER JSON 

  var forecastioWeather = ['$q', '$resource', '$http', 'FORECASTIO_KEY', 
    function($q, $resource, $http, FORECASTIO_KEY) {
    var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';

    // var weatherResource = $resource(url, {
    //   callback: 'JSON_CALLBACK',
    // }, {
    //   get: {
    //     method: 'JSONP'
    //   }
    // });

    return {
      getCurrentWeather: function(lat, lng) {
        return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK');
      }
    }
  }];


// DEFAULT LIST OF CITIES IN CITIES TAB
angular.module('starter.services', ['ngResource'])
.factory('Cities', function() {
  var cities = [
    { id: 0, name: 'Miami', lat:25.7877 , lgn: 80.2241 },
    { id: 1, name: 'New York City' ,lat: 40.7127 , lgn: 74.0059 },
    { id: 2, name: 'London' ,lat:51.5072 , lgn: 1.1275 },
    { id: 3, name: 'Los Angeles' ,lat: 34.0500 , lgn: 118.2500 },
    { id: 4, name: 'Dallas' ,lat: 32.7758 , lgn:96.7967  },
    { id: 5, name: 'Frankfurt' ,lat:50.1117 , lgn: 8.6858 },
    { id: 6, name: 'Reykjavik' ,lat:64.1265 , lgn: 21.8174 }
  ];

  return {
    all: function() {
      return cities;
    },
    get: function(cityId) {
      // Simple index lookup
      return cities[cityId];
    }
  }
}).


// SETTING MIAMI AS THE DEFAULT LOCATION ON LOAD -> DATASTORE
factory('DataStore', function() {
  //create datastore with default values
  var DataStore = {
    city:       'Miami',
    latitude:   25.7877,
    longitude:  80.2241 
  };

  var hitCount = 0;

  DataStore.getHitCount = function(){
    return hitCount;
  };

  DataStore.setHitCount = function(){
    hitCount = 1;
  };

  // get user's current location
  // DataStore.getLocation = function() {
  //   console.log("got here");
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function(data){
  //       console.log(">>>>>>>", data);
  //       DataStore.latitude = data.coords.latitude;
  //       DataStore.longitude = data.coords.longitude;
  //       return DataStore;
  //     });
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // };

  DataStore.setCity = function (value) {
    DataStore.city = value;
  };

  DataStore.setLatitude = function (value) {
    DataStore.latitude = value;
  };

  DataStore.setLongitude = function (value) {
    DataStore.longitude = value;
  };

  return DataStore;
})
.factory('Weather', forecastioWeather);
