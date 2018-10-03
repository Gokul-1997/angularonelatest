'use strict';

angular.module('operation', ['ngRoute','ngSanitize','ui.bootstrap', 'mgcrea.ngStrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cnc_operation', {
    templateUrl: 'cnc_operation/operation.html',
    controller: 'OperationCtrl'
  });
}])

.controller('OperationCtrl', ['$scope', '$http','$location','$rootScope','$window','$filter','$interval',
  function($scope, $http,$location,$rootScope,$window,$filter,$interval) {
    $scope.myLoader = true;

    /* $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(10)
        .withOption('bLengthChange', false);*/

$scope.tenant_id=localStorage.getItem("tenant_id");
  $scope.theTime = new Date().toLocaleTimeString();
  $interval(function () {
      $scope.theTime = new Date().toLocaleTimeString();
  }, 1000);
console.log($scope.tenant_id);
$rootScope.tenant=$scope.tenant_id;
$scope.regid=localStorage.getItem("jobregid");

//$scope.plans;
$scope.username=localStorage.getItem("username"); 

//operation from







$scope.opregistration = {id: null,operation_name:"",description:"",cncjob_id:null,planstatus_id:null,tenant_id: $scope.tenant_id, operation_no: "", cycle_time: "", idle_cycle_time: "", start_date: "", end_date: "", cycle_time_dummy: "", idle_cycle_time_dummy: ""};


$scope.operationForm= function(){  

   $scope.cycle = $filter('date')($scope.opregistration.cycle_time_dummy, "HH:mm:ss");
  $scope.idle = $filter('date')($scope.opregistration.idle_cycle_time_dummy, "HH:mm:ss");
  // alert($scope.cycle );
        var opregistration = {"operation_name":$scope.opregistration.operation_name,"description":$scope.opregistration.description,
        "cncjob_id":$scope.regid,"planstatus_id":$scope.opregistration.planstatus_id,"tenant_id": $scope.opregistration.tenant_id,"operation_no":$scope.opregistration.operation_no,"cycle_time":$scope.cycle,"idle_cycle_time":$scope.idle,"start_date":$scope.opregistration.start_date,"end_date":$scope.opregistration.end_date,"cycle_time_dummy":$scope.opregistration.cycle_time_dummy,"idle_cycle_time_dummy":$scope.opregistration.idle_cycle_time_dummy};
      if ($scope.opregistration.id==null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'api/v1/cncoperations',
        data: opregistration  
      })
      
      .success(function(data) {        
        console.log(data);
        if(data){      
     alert("Registration completed");
      //$window.location.reload();
      $scope.cncoperationinit();
         $scope.breaktimeinit();
       $(document).ready(function () {
   $('#exampleModalLabel').modal('hide');
 });
        }else{      
        alert('Registration Failed');   
        }
      });
}else
{
//alert(opregistration.planstatus_id);
$http
      ({
        method: 'put',
        url: $rootScope.api_url+'api/v1/cncoperations/'+$scope.opregistration.id,
        data: opregistration  
      })
      
      .success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Updated Successfully");
       // $window.location.reload();
       $scope.cncoperationinit();
          $scope.breaktimeinit();
       $(document).ready(function () {
   $('#exampleModalLabel').modal('hide');
 });
        }else{      
        alert('Updation Failed');   
        }
      });
}

    }

/*app.js*/

/*
  $scope.tenant_id=localStorage.getItem("tenant_id");
$scope.username=localStorage.getItem("username");
$scope.roleforpage=localStorage.getItem("role_id");
$scope.useridforedit=localStorage.getItem("userid");
 $http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/tenants/'+$scope.tenant_id
  })
  .then(function(response){
   $rootScope.tenant_nme = response.data; 
   
    })
$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/users/'+$scope.useridforedit
  })
  .then(function(response){
   $rootScope.userbyid= response.data; 
   
    })


  $http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/menuconfigurations/page_detail?tenant_id='+$scope.tenant_id+'&role_id='+$scope.roleforpage
      })
  .then(function(response){
   $rootScope.page_details= response.data; 
   
    })

$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/roles/role_detail?role_id='+$scope.roleforpage
  })
  .then(function(response){
   $rootScope.role_namess = response.data; 
  
    })


*//*app.js end*/
$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/cncjobs/job_detail?job_id='+$scope.regid
  })
  .then(function(response){
   $rootScope.names_for_job = response.data; 
  // $scope.myjsonObj=$rootScope.jobs[0]
  
    })

$scope.cncoperationinit=function(){
$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/cncoperations/cncoperation_list?job_id='+$scope.regid
  })
  .then(function(response){
    $scope.myLoader = false;
   $rootScope.op = response.data; 
   //console.log($rootScope.op);
    })
}
$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/cncjobs/'+$scope.regid
  })
  .then(function(response){
   $rootScope.jobdetails = response.data; 
   //console.log($rootScope.op);
    })


$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/planstatuses'
  })
  .then(function(response){
   $rootScope.plans1 = response.data; 
   $rootScope.count=$rootScope.plans1.length;
    })

/*alert($rootScope.plans.id);*/
  $scope.showdetails = function(id){

         var i=0;
    var len=$rootScope.count;
    //alert(id);
    for (; i<len; i++) {
      if ($rootScope.plans1[i].id == id) {
      
       return $rootScope.plans1[i].planstatus_name;
      //alert($rootScope.plans[i].planstatus_name);
      }
    }
          //JSON.stringify(found);
     }



    $scope.cleandata = function() {
      //alert(id);
$scope.opregistrat = {id: null,operation_name:"",description:"",cncjob_id:null,planstatus_id:null,tenant_id: $scope.tenant_id};

               $scope.opregistration = angular.copy($scope.opregistrat);
    }

    $scope.edit = function(id) {
      //alert(id);
var i;
   for(i in $rootScope.op) {
          // console.log(i);
            if($rootScope.op[i].id == id) {
               var op_id=$rootScope.op[i];
                 // console.log(op_id);
               $scope.opregistration = angular.copy(op_id);
            }
           
        }
    }



$scope.allocation=function(id){
  
localStorage.setItem("operationid",id);
         $location.path('/machine_allocation');

}
$scope.delete = function(id) {

$http.delete($rootScope.api_url+'api/v1/cncoperations/'+id).success(function(data) {
        
        if(data){
       // $state.go('/company_registration');
alert("Deleted Successfully");
      $scope.cncoperationinit();
        }else{      
        alert('Delete Failed');   
        }
      });


}

//opertion end





}]);