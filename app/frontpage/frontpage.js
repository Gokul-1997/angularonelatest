'use strict';

angular.module('frontpage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/frontpage', {
    templateUrl: 'frontpage/frontpage.html',
    controller: 'FrontpageCtrl'
  });
}])

.controller('FrontpageCtrl', function($scope,$location,$timeout) {


  function callAtTimeout() {
    $scope.myLoader=false;
}


  $scope.myLoader=true;

  $timeout(callAtTimeout, 1000);

  
    $scope.pageverification = function (url) {
        $scope.urls = url.substring(3);
        $location.path($scope.urls);
      }


      
});