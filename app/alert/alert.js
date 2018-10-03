'use strict';

angular.module('alert', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/alert', {
      templateUrl: 'alert/alert.html',
      controller: 'AlertCtrl'
    });
  }])

  .controller('AlertCtrl', function ($scope, $http, $location, $window, $rootScope,$filter) {


    $scope.myLoader = true;

    $scope.tenant_id = localStorage.getItem("tenant_id");
    $rootScope.tenant = $scope.tenant_id;

    $scope.currentPage2 = 0;
    $scope.pageSize2 = 15;
    $scope.alertRes = [];
    $scope.q2 = '';

    $scope.alert_init = function () {
        $http({
          method: 'GET',
          url: $rootScope.api_url + 'api/v1/alerts?tenant_id=' + $scope.tenant_id
        }).then(function (response) {
          $scope.myLoader = false;
          $scope.alertRes = response.data;
        })

      }

      $scope.getData2 = function () {
        return $filter('filter')($scope.alertRes, $scope.q2)
      }
      $scope.numberOfPages2 = function () {
        return Math.ceil($scope.getData2().length / $scope.pageSize2);
      }


  })