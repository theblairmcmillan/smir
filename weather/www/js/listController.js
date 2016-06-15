angular.module('starters.controllers', ['ionic'])

.controller('listCtrl', function($scope, $state) {

    console.log('inside list Controller');
   
  
  $scope.data = {
    showDelete: false
  };
  
 
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
  
  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };
  
  $scope.items = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
  ];
}).controller('SettingsCtrl', function($scope){
    
});



