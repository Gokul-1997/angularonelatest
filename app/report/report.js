'use strict';

angular.module('report', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/report', {
    templateUrl: 'report/report.html',
    controller: 'ReportCtrl'
  });
}])



.controller('ReportCtrl', ['$scope', '$http', '$location', '$rootScope', '$timeout', '$window', function ($scope, $http, $location, $rootScope, $timeout, $window) {
  $scope.percentageValue = 39;
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


//alert(moment());
  /*$http({
  method:'GET',
  url:$rootScope.api_url+'api/v1/month_reports?tenant_id='+$scope.tenant_id
})
.then(function(response){
 console.log(response,"ssss")
 $scope.reportDate=response.data.date;
 
 $scope.reportUrl="http://dp.yantra24x7.com"+response.data.file_path.url;
  })
*/

  // $http({
  //     method: 'GET',
  //     url: $rootScope.api_url + 'api/v1/month_reports?tenant_id=' + $scope.tenant_id
  //   })
  //   .then(function (response) {
  //     $scope.reportDate = response.data;

  //   })

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

    
   


  $scope.exportData = function () {
    var blob = new Blob([document.getElementById('exportable').innerHTML], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    });
    saveAs(blob, "Report.xls");

   

  

  };
  $scope.exportData1 = function () {
    var blob1 = new Blob([document.getElementById('exportable1').innerHTML], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    });
    saveAs(blob1, "Report.xls");
  }
  $scope.exportData2 = function () {
    var blob2 = new Blob([document.getElementById('exportable2').innerHTML], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    });
    saveAs(blob2, "Report.xls");
  }

  $scope.typewise = ["Datewise Utilization", "Shiftwise", "Operatorwise","Monthwise Utilization"]
  
  $scope.splitwise=['Hourwise','ProgramNumber'];


  

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


  $scope.generate_report = function (gd, opid) {



    if ($rootScope.wise == 'Operatorwise' && $scope.operator_id == undefined) {
      alert("Please Select Operator");
      return;
    }

    if($scope.hourtype == true && $scope.MachineID==undefined){
     alert("Please Select Machine");
     return;
    }

    
    $scope.myLoader = true;
 if($scope.hourtype == true){
         
    
    $http({
      method: 'GET',
      url: $rootScope.api_url_report + 'api/v1/hour_reports?tenant_id=' + $scope.tenant_id + '&start_date=' + $scope.from_date + '&end_date=' + $scope.to_date + '&machine_id=' + $scope.MachineID + '&operator_id=' + $scope.operator_id + '&shift_id=' + $scope.ShiftID +'&report_type=' +  $rootScope.wise +'&hour_wise='+$scope.hourtype
    })
    .then(function (response) {
      $scope.myLoader = false;
      $scope.items = response.data;
      $scope.isdisabled = false;
    })
    return;
  }  

  if($scope.programNo == true){

    
    $http({
      method: 'GET',
      url: $rootScope.api_url_report + 'api/v1/hour_reports?tenant_id=' + $scope.tenant_id + '&start_date=' + $scope.from_date + '&end_date=' + $scope.to_date + '&machine_id=' + $scope.MachineID + '&operator_id=' + $scope.operator_id + '&shift_id=' + $scope.ShiftID +'&report_type=' +  $rootScope.wise +'&hour_wise=false'+'&program_wise='+$scope.programNo
    })
    .then(function (response) {
      $scope.myLoader = false;
      $scope.items1 = response.data;
      $scope.isdisabled = false;
    })
    return;
  }  

  if($rootScope.wise == "Datewise Utilization"){
    $http({
      method: 'GET',
      url: $rootScope.api_url_report + 'api/v1/utilization_reports?tenant_id=' + $scope.tenant_id + '&start_date=' + $scope.from_date + '&end_date=' + $scope.to_date +'&report_type=' +  $rootScope.wise+ '&machine_id=' + $scope.MachineID 
    })
    .then(function (response) {
      $scope.myLoader = false;
      $scope.items2 = response.data;
      $scope.isdisabled = false;
    })
    
    return;
  }

  if($rootScope.wise == "Monthwise Utilization"){
    $http({
      method: 'GET',
      url: $rootScope.api_url_report + 'api/v1/utilization_reports?tenant_id=' + $scope.tenant_id + '&start_date=' + $scope.from_date + '&end_date=' + $scope.to_date + '&report_type=' +  $rootScope.wise+'&machine_id=' + $scope.MachineID 
    })
    .then(function (response) {
      $scope.myLoader = false;
      $scope.items2 = response.data;
      $scope.isdisabled = false;
    })
    return;
  }


    

    if ($scope.MachineID == undefined && $rootScope.wise == "Shiftwise" && $scope.ShiftID == undefined) {

      $http({
        method: 'GET',
        url: $rootScope.api_url_report + 'api/v1/machines/reports_page?tenant_id=' + $scope.tenant_id + '&start_date=' + $scope.from_date + '&end_date=' + $scope.to_date + '&report_type=' + $rootScope.wise
      }).then(function (response) {
        $scope.myLoader = false;
        $scope.items = response.data;
        console.log($scope.items);
        $scope.isdisabled = false;
        // for(var i in response.data){
        //   for(var j in  $rootScope.allmachines){
        //     if(response.data[i].machine_name ==  $rootScope.allmachines[j].machine_name){
        //       console.log(response.data[i]);
        //     }
        //   }
        // }
      })

    } else if ($scope.MachineID == undefined && $rootScope.wise == "Shiftwise" && $scope.ShiftID != undefined) {

      $http({
        method: 'GET',
        url: $rootScope.api_url_report + 'api/v1/machines/reports_page?tenant_id=' + $scope.tenant_id + '&start_date=' + $scope.from_date + '&end_date=' + $scope.to_date + '&shift_id=' + $scope.ShiftID + '&report_type=' + $rootScope.wise
      }).then(function (response) {
        $scope.myLoader = false;
        $scope.items = response.data;
        $scope.isdisabled = false;
      })
    } else if ($scope.MachineID != undefined && $rootScope.wise == "Shiftwise" && $scope.ShiftID != undefined) {

      $http({
          method: 'GET',
          url: $rootScope.api_url_report + 'api/v1/machines/reports_page?tenant_id=' + $scope.tenant_id + '&start_date=' + $scope.from_date + '&end_date=' + $scope.to_date + '&machine_id=' + $scope.MachineID + '&shift_id=' + $scope.ShiftID + '&report_type=' + $rootScope.wise
        })
        .then(function (response) {
          $scope.myLoader = false;
          $scope.items = response.data;
          $scope.isdisabled = false;
        })
    } else if ($scope.MachineID != undefined && $rootScope.wise == "Shiftwise" && $scope.ShiftID == undefined) {
      $http({
          method: 'GET',
          url: $rootScope.api_url_report + 'api/v1/machines/reports_page?tenant_id=' + $scope.tenant_id + '&start_date=' + $scope.from_date + '&end_date=' + $scope.to_date + '&machine_id=' + $scope.MachineID + '&report_type=' + $rootScope.wise
        })
        .then(function (response) {
       
          $scope.myLoader = false;
          $scope.items = response.data;
          $scope.isdisabled = false;
        })
    }



    

    //oop
    if ($scope.MachineID == undefined && $rootScope.wise == "Operatorwise" && $scope.operator_id == undefined) {

      $http({
        method: 'GET',
        url: $rootScope.api_url_report + 'api/v1/machines/reports_page?tenant_id=' + $scope.tenant_id + '&start_date=' + $scope.from_date + '&end_date=' + $scope.to_date + '&report_type=' + $rootScope.wise
      }).then(function (response) {
        $scope.myLoader = false;
        $scope.items = response.data;
        console.log($scope.items);
        $scope.isdisabled = false;
      })

    } else if ($scope.MachineID == undefined && $rootScope.wise == "Operatorwise" && $scope.operator_id != undefined) {

      $http({
        method: 'GET',
        url: $rootScope.api_url_report + 'api/v1/machines/reports_page?tenant_id=' + $scope.tenant_id + '&start_date=' + $scope.from_date + '&end_date=' + $scope.to_date + '&operator_id=' + $scope.operator_id + '&report_type=' + $rootScope.wise
      }).then(function (response) {
        $scope.myLoader = false;
        $scope.items = response.data;
        console.log($scope.items);
        $scope.isdisabled = false;
      })
    } else if ($scope.MachineID != undefined && $rootScope.wise == "Operatorwise" && $scope.operator_id != undefined) {

      $http({
          method: 'GET',
          url: $rootScope.api_url_report + 'api/v1/machines/reports_page?tenant_id=' + $scope.tenant_id + '&start_date=' + $scope.from_date + '&end_date=' + $scope.to_date + '&machine_id=' + $scope.MachineID + '&operator_id=' + $scope.operator_id + '&report_type=' + $rootScope.wise
        })
        .then(function (response) {
          $scope.myLoader = false;
          $scope.items = response.data;
          $scope.isdisabled = false;
        })
    } else if ($scope.MachineID != undefined && $rootScope.wise == "Operatorwise" && $scope.operator_id == undefined) {
      $http({
          method: 'GET',
          url: $rootScope.api_url_report + 'api/v1/machines/reports_page?tenant_id=' + $scope.tenant_id + '&start_date=' + $scope.from_date + '&end_date=' + $scope.to_date + '&machine_id=' + $scope.MachineID + '&report_type=' + $rootScope.wise
        })
        .then(function (response) {
          $scope.myLoader = false;
          $scope.items = response.data;
          $scope.isdisabled = false;
        })
    }

  }






  $http({
      method: 'GET',
      url: $rootScope.api_url + 'api/v1/machines?tenant_id=' + $scope.tenant_id
    })
    .then(function (response) {
      $rootScope.allmachines = response.data;
    })

  $http({
      method: 'GET',
      url: $rootScope.api_url + 'api/v1/cncjobs?tenant_id=' + $scope.tenant_id
    })
    .then(function (response) {
      $rootScope.alljobs = response.data;
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


    
}]);
