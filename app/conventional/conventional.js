'use strict';

angular.module('conventional', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/conventional', {
      templateUrl: 'conventional/conventional.html',
      controller: 'ConventionalCtrl'
    });
  }])

  .controller('ConventionalCtrl', function ($scope, $http, $location, $window, $rootScope, $timeout, $interval, $filter) {

    var tick = function () {
        $scope.clock = Date.now();
      }
      tick();
      $interval(tick, 1000);

   

      $scope.doRefresh=function(){
        $scope.myLoader = true;
        $http({
            method: 'GET',
            url: $rootScope.api_url + 'api/v1/ct_dashboard?tenant_id=' + $scope.tenant_id
          }).then(function (response) {
            $scope.myLoader = false;
            $scope.cardnames = response.data;
          
            
    
          })
      }
  });
