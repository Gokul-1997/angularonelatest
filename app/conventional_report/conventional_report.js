'use strict';

angular.module('conventionalreport', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/conventionalreport', {
      templateUrl: 'conventional_report/conventional_report.html',
      controller: 'ConventionalreportCtrl'
    });
  }])

  .controller('ConventionalreportCtrl', function ($scope, $http, $location, $window, $rootScope, $timeout, $interval, $filter) {

    $scope.MachineID;
  $scope.ShiftID;
  $scope.tenant_id = localStorage.getItem("tenant_id");
  $scope.username = localStorage.getItem("username");
  $scope.roleforpage = localStorage.getItem("role_id");
  $scope.useridforedit = localStorage.getItem("userid");
  $scope.JobID;
  $scope.dateday = new Date();

  $scope.from_date;
  $scope.to_date;
  $scope.hourtype=false;
  $scope.programNo=false;
  $scope.report_list = [];
  $scope.momentToday= moment(new Date()).format("YYYY-MM-DD");
  $scope.momentToday1=moment().subtract(1, 'day').format("YYYY-MM-DD");


  $http({

    method: 'GET',
    url: $rootScope.api_url + 'api/v1/operators?tenant_id=' + $scope.tenant_id
  })
  .then(function (response) {
    $rootScope.operators = response.data;

  })

  $http({

    method: 'GET',
    url: $rootScope.api_url + 'api/v1/report_value?tenant_id=' + $scope.tenant_id
  })
  .then(function (response) {
   $scope.selecttype = response.data;

  })



  $scope.mychange = function (man) {
    //$scope.operator_id='';

    // $scope.ShiftID = undefined;

    $http({

      method: 'GET',
      url: $rootScope.api_url + 'api/v1/resport_split_value?report_type='+man+'&tenant_id='+ $scope.tenant_id
    })
    .then(function (response) {
     $scope.selectsplit = response.data;

    })

    $rootScope.wise = man;
    if($rootScope.wise == "Datewise Utilization" || $rootScope.wise == "Monthwise Utilization"){
      $scope.operator_id = undefined;
      $scope.ShiftID = undefined;
      $scope.hourtype=undefined;
       $scope.programNo=undefined;
    }
  }
  $scope.checkingmachineid = function () {
    if ($scope.MachineID == null) {
      $scope.MachineID = undefined;
    }
    //alert($scope.MachineID);

  }
  $scope.checkingshiftid = function () {
    $scope.operator_id = undefined;
    if ($scope.ShiftID == null) {
      $scope.ShiftID = undefined;
    }
    //alert($scope.ShiftID);
  }

  $scope.checkingopid = function () {
    $scope.ShiftID = undefined;
    if ($scope.operator_id == null) {
      $scope.operator_id = undefined;
    }
    //alert($scope.operator_id);
  }

  $scope.checkhour=function(data){
   

   if(data=='Hourwise'){
   
    $scope.hourtype=true;
   }else{
    $scope.hourtype=false;
   }

   if(data=='ProgramNumber'){
    $scope.programNo=true;
   }else{
    $scope.programNo=false;
   }
   
  }

  $http({
    method: 'GET',
    url: $rootScope.api_url + 'api/v1/machines?tenant_id=' + $scope.tenant_id
  })
  .then(function (response) {
    $rootScope.allmachines = response.data;
  })

// $http({
//     method: 'GET',
//     url: $rootScope.api_url + 'api/v1/cncjobs?tenant_id=' + $scope.tenant_id
//   })
//   .then(function (response) {
//     $rootScope.alljobs = response.data;
//   })

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

  });