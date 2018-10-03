'use strict';

angular.module('machine_allocation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/machine_allocation', {
    templateUrl: 'machine_allocation/machine_allocation.html',
    controller: 'MachineallocationCtrl'
  });
}])

.controller('MachineallocationCtrl', ['$scope', '$http','$location','$window','$rootScope','DTOptionsBuilder',
  function($scope, $http,$location,$window,$rootScope,DTOptionsBuilder) {

 $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(10)
        .withOption('bLengthChange', false);

$scope.tenant_id=localStorage.getItem("tenant_id");
$rootScope.tenant=$scope.tenant_id;

$scope.operationid=localStorage.getItem("operationid");

$scope.username=localStorage.getItem("username");



$scope.allocationregistration = {id: null,from_date:"",to_date:"",start_time:"",end_time:"",actual_quantity:null,total_down_time: "",produced_quantiy:"",machine_id: 1, cncoperation_id:"",tenant_id: $scope.tenant_id};

$scope.allocationForm= function(){  
 
 
        var allocationregistration = {"from_date":$scope.allocationregistration.from_date,"to_date":$scope.allocationregistration.to_date,"start_time":$scope.allocationregistration.start_time,"end_time":$scope.allocationregistration.end_time,"actual_quantity":$scope.allocationregistration.actual_quantity,
        "total_down_time":$scope.allocationregistration.total_down_time,"produced_quantiy":$scope.allocationregistration.produced_quantiy,"machine_id":$scope.allocationregistration.machine_id,"cncoperation_id":$scope.operationid,"tenant_id":$scope.tenant_id};
  if ($scope.allocationregistration.id== null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'api/v1/machineallocations',
        data: allocationregistration  
      })
      
      .success(function(data) {
        
        if(data){
$scope.allocationregistration="";
      
    alert("Registration completed");
     $window.location.reload();
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
      
 $http
      ({
        method: 'put',
        url: $rootScope.api_url+'api/v1/machineallocations/'+$scope.allocationregistration.id,
        data: allocationregistration
      })
      
      .success(function(data) {
        
        if(data){

alert("Updated Successfully");
      $window.location.reload();
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
   

   
$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/machineallocations?operation_id='+$scope.operationid
  })
  .then(function(response){
   $rootScope.allocations= response.data; 
  // console.log(response);
    })

$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/machines?tenant_id='+$scope.tenant
  })
  .then(function(response){
   $rootScope.machines= response.data; 
   // console.log(response);
    })

$scope.cleandata = function() {

$scope.allocationregist = {id: null,from_date:"",to_date:"",start_time:"",end_time:"",actual_quantity:null,total_down_time: "",produced_quantiy:"",machine_id: 1, cncoperation_id:"",tenant_id: $scope.tenant_id};

 $scope.allocationregistration = angular.copy($scope.allocationregist);
    }


    $scope.edit = function(id) {
var i;
   for(i in $rootScope.allocations) {

            if($rootScope.allocations[i].id == id) {
               var client_id=$rootScope.allocations[i];
               $scope.allocationregistration = angular.copy(client_id);
            }
           
        }
    }

$scope.delete = function(id) {

$http.delete($rootScope.api_url+'api/v1/cncclients/'+id).success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Deleted Successfully");
      $window.location.reload();
        }else{      
        alert('Delete Failed');   
        }
      });


}

	

}]);