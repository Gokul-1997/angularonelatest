'use strict';

angular.module('machine_reg', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/machine_registration', {
    templateUrl: 'machine_registration/machine_registration.html',
    controller: 'Machine_registrationCtrl'
  });
}])

.controller('Machine_registrationCtrl', ['$scope', '$http','$location','$rootScope','$window',
  function($scope, $http,$location,$rootScope,$window,DTOptionsBuilder) {
//$scope.myUrl = $location.absUrl();
$scope.myLoader = true;
$scope.tenant_id=localStorage.getItem("tenant_id");
$rootScope.tenant=$scope.tenant_id;
$scope.username=localStorage.getItem("username");
//$scope.ipaddr = /^\+?\d{3}[.]?\d{}[- ]?\d{}[-]?\d{}$/;
$scope.machineregistration = {id: null,machine_name:"",machine_model:"",machine_serial_no:"",machine_type:"",machine_ip:"",unit:"",device_id:"",tenant_id: null};


 $scope.newmachine = function(){  
  
        var machineregistration = {"machine_name":$scope.machineregistration.machine_name,"machine_model":$scope.machineregistration.machine_model,"machine_serial_no":$scope.machineregistration.machine_serial_no,"machine_type":$scope.machineregistration.machine_type,"machine_ip":$scope.machineregistration.machine_ip,"unit":$scope.machineregistration.unit,"device_id":$scope.machineregistration.device_id,"tenant_id": $scope.tenant_id};
     
      if ($scope.machineregistration.id== null){
       // alert(machineregistration.machine_ip);
      $http({
        method: 'post',
        url: $rootScope.api_url+'api/v1/machines',
        data: machineregistration  
      })
      
      .success(function(data) {    
        if(data){
       
      alert("Registration completed");
      //$window.location.reload();
      $scope.machineinit();
      $(document).ready(function () {
   $('#machine').modal('hide');
 });
        }else{      
        alert('Registration Failed');   
        }
      });
    }
    else
    {
     
$http({
        method: 'put',
        url: $rootScope.api_url+'api/v1/machines/'+$scope.machineregistration.id,
        data: machineregistration  
      })
      
      .success(function(data) {  
        if(data){    
        alert("Updated Successfully");
       // $window.location.reload();
       $scope.machineinit();
       $(document).ready(function () {
   $('#machine').modal('hide');
 });
        }else{      
        alert('Updation Failed');   
        }
      });
    }
    }


/*app.js end*/
$scope.machineinit=function(){
$http({
    method:'GET',
    url:$rootScope.api_url+'api/v1/machines?tenant_id='+$rootScope.tenant
  })
  .then(function(response){
    $scope.myLoader = false;
   $rootScope.machines = response.data; 
   
    })
}
$scope.cleandata= function(id) {
  $scope.machineregist = {id: null,machine_name:"",machine_model:"",machine_serial_no:"",machine_type:"",machine_ip:"",unit:"",device_id:"",tenant_id: null};
 $scope.machineregistration = angular.copy($scope.machineregist);

    }


  //tableedit 
    $scope.edit = function(id) {
   var i;
   for(i in $rootScope.machines) {

            if($rootScope.machines[i].id == id) {
               var machine_id=$rootScope.machines[i];
               $scope.machineregistration = angular.copy(machine_id);
            }
           
        }
    }//editend
/*$scope.newQuote=function(){


alert("hi");
}*/
//delete table
$scope.delete = function(id) {

$http.delete($rootScope.api_url+'api/v1/machines/'+id).success(function(data) {
        
        if(data){

      alert("Deleted Successfully");
      //$window.location.reload();
      $scope.machineinit();
        }else{      
        alert('Delete Failed');   
        }
      });
}//end

}]);






