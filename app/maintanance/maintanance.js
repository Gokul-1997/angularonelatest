'use strict';

angular.module('Maintanances', ['ngRoute','ngSanitize','ui.bootstrap', 'mgcrea.ngStrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/maintanance', {
    templateUrl: 'maintanance/maintanance.html',
    controller: 'maintananceCtrl'
  });
}])


.controller('maintananceCtrl', ['$scope','$filter', '$http','$location','$window','$rootScope',
  function($scope,$filter, $http,$location,$window,$rootScope, DTOptionsBuilder) {
//$scope.maintananceinit();

 $scope.myLoader = true;
 $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  $scope.email = {
        text: 'me@example.com'
      };
$scope.tenant_id=localStorage.getItem("tenant_id");
$rootScope.tenant=$scope.tenant_id;
$scope.maintananceentry = {id: null,maintanance_type:"",maintanance_date:"",service_engineer_name:"",maintanance_time:"",maintanance_time_dummy:"",remarks:"",machine_id:"",tenant_id: $scope.tenant_id};
$scope.username=localStorage.getItem("username");
$scope.clientForm= function(){  
 $scope.main_time = $filter('date')($scope.maintananceentry.maintanance_time_dummy, "HH:mm:ss");
 
        var maintananceentry = {"maintanance_type":$scope.maintananceentry.maintanance_type,"maintanance_date":$scope.maintananceentry.maintanance_date,"service_engineer_name":$scope.maintananceentry.service_engineer_name,"maintanance_time":$scope.main_time,"maintanance_time_dummy":$scope.maintananceentry.maintanance_time_dummy,"remarks":$scope.maintananceentry.remarks,"machine_id":$scope.maintananceentry.machine_id,"tenant_id": $scope.maintananceentry.tenant_id};
  if ($scope.maintananceentry.id== null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'api/v1/maintananceentries',
        data: maintananceentry  
      })
      
      .success(function(data) {
        
        if(data){
$scope.maintananceentry="";
    alert("Registration completed");
    $scope.maintananceinit();
     $(document).ready(function () {
   $('#maintanance').modal('hide');
 });
        }else{      
        alert('Registration Failed');   
        }
      });
    }else
    {
      
 $http
      ({
        method: 'put',
        url: $rootScope.api_url+'api/v1/maintananceentries/'+$scope.maintananceentry.id,
        data: maintananceentry  
      })
      
      .success(function(data) {
        
        if(data){

alert("Updated Successfully");
     $scope.maintananceinit();
        $(document).ready(function () {
   $('#maintanance').modal('hide');
 });
  
        }else{      
        alert('Updation Failed');   
        }
      });
    }
    }

$scope.maintananceinit=function(){
 
    $http({
    method:'GET',
    url:$rootScope.api_url+'api/v1/maintananceentries?tenant_id='+$scope.tenant_id
    }).then(function(response){
      $scope.myLoader = false;
   $rootScope.allmaintanances = response.data; 

   console.log($rootScope.allmaintanances);
   
    })
}
$http({
    method:'GET',
    url:$rootScope.api_url+'api/v1/machines?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    scope.myLoader = false;
   $rootScope.allmachines = response.data; 

   $rootScope.count=$rootScope.allmachines.length;
    })


 $scope.showdetails = function(id){

         var i=0;
    var len=$rootScope.count;
    for (; i<len; i++) {
      if ($rootScope.allmachines[i].id == id) {
      
       return $rootScope.allmachines[i].machine_name;
      }
    }
     }





  $scope.cleandata=function(){

$scope.cleardata= {id: null,maintanance_type:"",maintanance_date:"",service_engineer_name:"",maintanance_time:"",remarks:"",machine_id:"",tenant_id: $scope.tenant_id};
$scope.maintananceentry = angular.copy($scope.cleardata);
  }

    $scope.edit = function(id) {
var i;
   for(i in $rootScope.allmaintanances) {

            if($rootScope.allmaintanances[i].id == id) {
               var maintanance_id=$rootScope.allmaintanances[i];
               $scope.maintananceentry = angular.copy(maintanance_id);
            }
           
        }
    }

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'api/v1/maintananceentries/'+id).success(function(data) {
        
        if(data){

alert("Deleted Successfully");
      $scope.maintananceinit();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}
}]);