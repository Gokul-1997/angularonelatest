'use strict';

angular.module('alarms', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/alarms', {
      templateUrl: 'alarms/alarms.html',
      controller: 'AlarmsCtrl'
    });
  }])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/connectionlog', {
      templateUrl: 'alarms/connectionlog.html',
      controller: 'AlarmsCtrl'
    });
  }])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/alarmsreport', {
      templateUrl: 'alarms/alarmsreport.html',
      controller: 'AlarmsCtrl'
    });
  }])

  .controller('AlarmsCtrl', ['$scope', '$http', '$location', '$window', '$rootScope','$filter',
    function ($scope, $http, $location, $window, $rootScope,$filter) {
      if (localStorage.getItem("tenant_id") == null) {
        $location.path('/login')
        return;
      }
      $scope.myLoader = true;

      $scope.tenant_id = localStorage.getItem("tenant_id");
      $rootScope.tenant = $scope.tenant_id;
      $scope.clientregistration = {
        id: null,
        client_name: "",
        email_id: "",
        phone_number: "",
        tenant_id: $scope.tenant_id
      };
      $scope.username = localStorage.getItem("username");


      /* $http({
        method:'GET',
        url:$rootScope.api_url+'api/v1/alarms?tenant_id='+$scope.tenant_id})
        .then(function(response){
         $scope.myLoader = false;
              $scope.Alarm= response.data;
         })*/

         $scope.exportData = function () {
          var blob = new Blob([document.getElementById('exportable10').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
          });
          saveAs(blob, "Report.xls");
      
         
      
        
      
        };


        $scope.currentPage4 = 0;
        $scope.pageSize4 = 15;
        $scope.Alarmhistory = [];
        $scope.q4 = '';


         $scope.alramhistoryinit=function(){

          $scope.alarmhistorydiff = [];

          $http({
            method: 'GET',
            url: $rootScope.api_url + 'api/v1/alarm_histories?tenant_id=' + $scope.tenant_id
          }).then(function (response) {
  
            $scope.Alarmhistory = response.data;
          
           console.log( $scope.Alarmhistory);
          })
  

         }

         $scope.getData4 = function () {
          return $filter('filter')($scope.Alarmhistory, $scope.q4)
        }
        $scope.numberOfPages4 = function () {
          return Math.ceil($scope.getData4().length / $scope.pageSize4);
        }


         $scope.currentPage2 = 0;
         $scope.pageSize2 = 15;
         $scope.AlarmData = [];
         $scope.q2 = '';
   
      $scope.alramInit = function () {
        $scope.alarmdiff = [];

        $http({
          method: 'GET',
          url: $rootScope.api_url + 'api/v1/alarms?tenant_id=' + $scope.tenant_id
        }).then(function (response) {

          $scope.Alarm = response.data;
          for (var i = 0; i < response.data.length; i++) {
            var inputJSON = {
              "created_date": $scope.Alarm[i].created_at,
              "current_time": $scope.Alarm[i].updated_at
            };

            function getDataDiff(startDate, endDate) {
              var diff = endDate.getTime() - startDate.getTime();
              var days = Math.floor(diff / (60 * 60 * 24 * 1000));
              var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
              var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
              var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
              return {
                day: days,
                hour: hours,
                minute: minutes,
                second: seconds
              };
            }
            $scope.diff = getDataDiff(new Date(inputJSON.created_date), new Date(inputJSON.current_time));
            $scope.alarmdiff.push($scope.diff);

          }
          $scope.AlarmData = angular.merge($scope.Alarm, $scope.alarmdiff);
        })

        $scope.getData2 = function () {
          return $filter('filter')($scope.AlarmData, $scope.q2)
        }
        $scope.numberOfPages2 = function () {
          return Math.ceil($scope.getData2().length / $scope.pageSize2);
        }




        $scope.alarmdiff1 = [];
        $http({
            method: 'GET',
            url: $rootScope.api_url + 'api/v1/alarms/alarm_dashboard?tenant_id=' + $scope.tenant_id
          })
          .then(function (response) {
            $scope.myLoader = false;
            $scope.RecentAlarm = response.data;


            for (var i = 0; i < response.data.length; i++) {
              var inputJSON = {
                "created_date": $scope.RecentAlarm[i].created_at,
                "current_time": $scope.RecentAlarm[i].updated_at
              };

              function getDataDiff(startDate, endDate) {
                var diff = endDate.getTime() - startDate.getTime();
                var days = Math.floor(diff / (60 * 60 * 24 * 1000));
                var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
                var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
                var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
                return {
                  day: days,
                  hour: hours,
                  minute: minutes,
                  second: seconds
                };
              }
              $scope.diff1 = getDataDiff(new Date(inputJSON.created_date), new Date(inputJSON.current_time));
              $scope.alarmdiff1.push($scope.diff1);

            }
            $scope.AlarmDataRe = angular.merge($scope.RecentAlarm, $scope.alarmdiff1);
          })
      }

      $scope.delete = function (id) {
        if ($window.confirm("Please confirm?")) {
          $http.delete($rootScope.api_url + 'api/v1/alarms/' + id).success(function (data) {

            if (data) {

              // $state.go('/company_registration');
              alert("Deleted Successfully");
              $window.location.reload();
            } else {
              alert('Delete Failed');
            }
          });
        }

      }


     

      //report alarm

      $scope.reportAlarmInit = function () {

        $http({

            method: 'GET',
            url: $rootScope.api_url + 'api/v1/operators?tenant_id=' + $scope.tenant_id
          })
          .then(function (response) {
            $rootScope.operators = response.data;
            $scope.myLoader = false;
          })
        $http({
            method: 'GET',
            url: $rootScope.api_url + 'api/v1/machines?tenant_id=' + $scope.tenant_id
          })
          .then(function (response) {
            $rootScope.allmachines = response.data;
          })


        $http({
            method: 'GET',
            url: $rootScope.api_url + 'api/v1/shifts?tenant_id=' + $scope.tenant_id
          })
          .then(function (response) {
            $scope.shiftdetailfordrop = response.data;

            $http({
                method: 'GET',
                url: $rootScope.api_url + 'api/v1/shifttransactions?shift_id=' + $scope.shiftdetailfordrop.id
              })
              .then(function (response) {
                $rootScope.shiftstransfordrop = response.data;

              })
          })
      }




      $scope.percentageValue = 39;
      $scope.alarmMachineID;
      $scope.alarmShiftID;
      $scope.from_date;
      $scope.to_date;
      $scope.report_list = [];

      $scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable3').innerHTML], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
      };

      //$scope.typewise=["Shiftwise"]
      $scope.alarmtypewise = ["Shiftwise", "Operatorwise"]
      $scope.mychange1 = function (man) {
        $rootScope.alarmwise = man;
        if (man == "Shiftwise") {
          $scope.alarmoperator_id = null;
        } else {
          $scope.alarmShiftID == null;
        }
      }
      $scope.checkingshiftid = function () {

        // $scope.alarmMachineID
      }



      //http://182.72.104.66:3007/api/v1/alarm_reports?tenant_id=7&start_date=2017-12-1&end_date=2017-12-22&report_type=Shiftalarmwise&machine_id=1&shift_id=1
      $scope.alarmgenerate_report = function (gd, opid) {
        $scope.alarmoperator_id = opid;
        if ($rootScope.alarmwise == 'Operatorwise' && $scope.alarmoperator_id == undefined) {
          alert("please select operator")
          return;
        }



        $scope.myLoader = true;
        $scope.isdisabled = true;
        //alert($scope.alarmoperator_id);
        if ($scope.alarmMachineID == undefined && $scope.alarmoperator_id != null) {


          $http({
            method: 'GET',
            url: $rootScope.api_url_report + 'api/v1/alarm_histories_reports?tenant_id=' + $scope.tenant_id + '&start_date=' + $scope.from_date + '&end_date=' + $scope.to_date + '&report_type=' + $rootScope.alarmwise + '&operator_id=' + $scope.alarmoperator_id
          }).then(function (response) {
            $scope.myLoader = false;
            $scope.items = response.data;
            $scope.isdisabled = false;
          })

        } else if ($scope.alarmMachineID != undefined && $scope.alarmoperator_id != null) {

          $http({
            method: 'GET',
            url: $rootScope.api_url_report + 'api/v1/alarm_histories_reports?tenant_id=' + $scope.tenant_id + '&start_date=' + $scope.from_date + '&end_date=' + $scope.to_date + '&machine_id=' + $scope.alarmMachineID + '&report_type=' + $rootScope.alarmwise + '&operator_id=' + $scope.alarmoperator_id
          }).then(function (response) {
            $scope.myLoader = false;
            $scope.items = response.data;
            $scope.isdisabled = false;
          })
        } else if ($scope.alarmMachineID == undefined && $scope.alarmShiftID != undefined) {

          $http({
            method: 'GET',
            url: $rootScope.api_url_report + 'api/v1/alarm_histories_reports?tenant_id=' + $scope.tenant_id + '&start_date=' + $scope.from_date + '&end_date=' + $scope.to_date + '&shift_id=' + $scope.alarmShiftID + '&report_type=' + $rootScope.alarmwise
          }).then(function (response) {
            $scope.myLoader = false;
            $scope.items = response.data;
            $scope.isdisabled = false;
          })
        } else if ($scope.alarmMachineID != undefined && $scope.alarmShiftID == undefined) {

          $http({
              method: 'GET',
              url: $rootScope.api_url_report + 'api/v1/alarm_histories_reports?tenant_id=' + $scope.tenant_id + '&start_date=' + $scope.from_date + '&end_date=' + $scope.to_date + '&machine_id=' + $scope.alarmMachineID + '&report_type=' + $rootScope.alarmwise
            })
            .then(function (response) {
              $scope.myLoader = false;
              $scope.items = response.data;
              $scope.isdisabled = false;
            })
        } else if ($scope.alarmMachineID == undefined && $scope.alarmShiftID == undefined) {

          $http({
              method: 'GET',
              url: $rootScope.api_url_report + 'api/v1/alarm_histories_reports?tenant_id=' + $scope.tenant_id + '&start_date=' + $scope.from_date + '&end_date=' + $scope.to_date + '&report_type=' + $rootScope.alarmwise
            })
            .then(function (response) {
              $scope.myLoader = false;
              $scope.items = response.data;
              $scope.isdisabled = false;
            })
        } else {

          $http({
              method: 'GET',
              url: $rootScope.api_url_report + 'api/v1/alarm_histories_reports?tenant_id=' + $scope.tenant_id + '&start_date=' + $scope.from_date + '&end_date=' + $scope.to_date + '&machine_id=' + $scope.alarmMachineID + '&shift_id=' + $scope.alarmShiftID + '&report_type=' + $rootScope.alarmwise
            })
            .then(function (response) {
              $scope.myLoader = false;
              $scope.items = response.data;
              $scope.isdisabled = false;
            })

        }

      };

      //connection log page

      $scope.currentPage = 0;
      $scope.pageSize = 15;
      $scope.machineConnStatus = [];
      $scope.q = '';

      $scope.currentPage1 = 0;
      $scope.pageSize1 = 15;
      $scope.connectionStatus = [];
      $scope.q1 = '';

      $scope.currentPage2 = 0;
      $scope.pageSize2 = 15;
      $scope.powerStatus = [];
      $scope.q2 = '';



      $scope.connection_init = function () {


        $http({
          method: 'GET',
          url: $rootScope.api_url + 'api/v1/connection_logs?tenant_id=' + $scope.tenant_id
        }).then(function (response) {
          $scope.myLoader = false;
          for(var i in response.data){ 
            if(response.data[i].status != 'Power Connected'){
          $scope.connectionStatus.push(response.data[i]);
            }else{
              $scope.powerStatus.push(response.data[i])
            }
        }
        })


        $http({
          method: 'GET',
          url: $rootScope.api_url + 'api/v1/ethernet_logs?tenant_id=' + $scope.tenant_id
        }).then(function (response) {

          $scope.machineConnStatus = response.data;
          // for(var i in $scope.machineConnStatus){
          //   $scope.data.push($scope.machineConnStatus[i]);
          // }
          //$scope.data= $scope.machineConnStatus;
        })
      }

   


      $scope.getData = function () {
        return $filter('filter')($scope.machineConnStatus, $scope.q)
      }
      $scope.numberOfPages = function () {
        return Math.ceil($scope.getData().length / $scope.pageSize);
      }
      $scope.getData1 = function () {
        return $filter('filter')($scope.connectionStatus, $scope.q1)
      }
      $scope.numberOfPages1 = function () {
        return Math.ceil($scope.getData1().length / $scope.pageSize1);
      }

      $scope.getData2 = function () {
        return $filter('filter')($scope.powerStatus, $scope.q2)
      }
      $scope.numberOfPages2 = function () {
        return Math.ceil($scope.getData2().length / $scope.pageSize2);
      }







    }
  ]);
