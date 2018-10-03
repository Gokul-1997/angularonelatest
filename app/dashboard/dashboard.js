'use strict';

angular.module('dashboard', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboard', {
      templateUrl: 'dashboard/dashboard.html',
      controller: 'DashboardCtrl'
    });
  }])

  .controller('DashboardCtrl', ['$scope', '$http', '$location', '$window', '$rootScope', '$timeout', '$interval', '$filter',
    function ($scope, $http, $location, $window, $rootScope, $timeout, $interval, $filter) {

      var tick = function () {
        $scope.clock = Date.now();
      }
      tick();
      $interval(tick, 1000);

      $scope.myLoader = true;

      $scope.currentPage = 0;
      $scope.pageSize = 10;
      $rootScope.operator_all = [];
      $scope.q = '';

      $scope.getData = function () {
        return $filter('filter')($rootScope.operator_all, $scope.q)
      }
      $scope.numberOfPages = function () {
        // console.log($scope.getData());
        return Math.ceil($scope.getData().length / $scope.pageSize);
      }

      // $scope.machineCount=localStorage.getItem("machineCount")

      $scope.operatorinit = function () {

        $http({

          method: 'GET',
          url: $rootScope.api_url + 'api/v1/operator_mapping_allocations?tenant_id=' + $scope.tenant_id
        })
          .then(function (response) {
            $rootScope.operator_all1 = response.data;
            for (var i in response.data) {

              if (response.data[i].operator_allocation.shifttransaction.shift_no == ($scope.cardnames.data['Unit - 1'][0].shift_no)) {
                $rootScope.operator_all.push(response.data[i]);
              }
            }

          })
      }

      $scope.dashboard = function () {

        $http({
          method: 'GET',
          url: $rootScope.api_url + 'api/v1/machines/machine_counts?tenant_id=' + $scope.tenant_id
        }).then(function (response) {
          $scope.machineCount = response.data.machine_count;

          if ($scope.machineCount <= 4) {
            $http({
              method: 'GET',
              url: $rootScope.api_url + 'api/v1/machines/dashboard_live?tenant_id=' + $scope.tenant_id
            }).then(function (response) {
              $scope.myLoader = false;
              $scope.cardnames = response.data;
              //$scope.cardnames1 = response.data;
              //$scope.LastUpdate = $scope.cardnames[0].last_update;
              localStorage.setItem("shiftno", $scope.cardnames.shift_no);
              $scope.operatorinit();

            })
          }




          if ($scope.machineCount >= 5) {
            $http({
              method: 'GET',
              url: $rootScope.api_url + 'api/v1/machines/dashboard_status_1?tenant_id=' + $scope.tenant_id
            }).then(function (response) {
              $scope.myLoader = false;
              $scope.cardnames = response.data;
              // alert($scope.machineCount);         
              //  localStorage.setItem("shiftno", $scope.cardnames.shift_no)
              $scope.operatorinit();
            })
          }


        })

        $http({
          method: 'GET',
          url: $rootScope.api_url + 'api/v1/alarms/alarm_dashboard?tenant_id=' + $scope.tenant_id
        })
          .then(function (response) {
            $scope.RecentAlarm = response.data;
          })




      };


      $scope.machineclick = function (deatil) {
        $scope.myLoader = true;

        $http({
          method: 'GET',
          url: $rootScope.api_url + 'api/v1/machines/machine_process?tenant_id=' + $scope.tenant_id + '&machine_id=' + deatil.machine_id
        }).then(function (response) {
          $scope.myLoader = false;
          $('#machine_details').modal('show');
          $scope.modelshow = 0;
          $scope.singleMachineRes = response.data;
        })
      }



      $scope.loadStatus = function () {
        $http({
          method: 'GET',
          url: $rootScope.api_url + 'api/v1/machines/dashboard_status_1?tenant_id=' + $scope.tenant_id
        }).then(function (response) {

          $scope.cardnames = response.data;
        })


      }


      $scope.Downtime = function (totalloadunloadtime, idletime, downtime) {
        $scope.totalloadunloadtime = totalloadunloadtime;
        $scope.idletime = idletime;
        $scope.downtime = downtime;
      }

      $scope.machine_page_redirect = function (id) {
        localStorage.setItem("machine_id", id);
        $location.path('/machine')
      }

      $scope.machine_page_redirect1 = function () {
        //  $('#machine_details').modal('hide');
        // $('.modal-backdrop').remove();
        var id = $scope.singleMachineRes.machine_id;

        localStorage.setItem("machine_id", id);
        //return;
        $location.path('/machine')
      }

      $scope.job_page_redirect = function (id) {
        localStorage.setItem("cncjob_id", id);
        localStorage.setItem("Filterid", 0);
        $location.path('/jobpage')
      }

      $scope.PartsCountModal = function (Details) {
        $scope.Details = Details;
      }
    }
  ]);




