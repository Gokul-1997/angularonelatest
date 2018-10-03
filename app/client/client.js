'use strict';

angular.module('client', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/client', {
    templateUrl: 'client/client.html',
    controller: 'ClientCtrl'
  });
}])

.controller('ClientCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

 $scope.myLoader = true;
 $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  $scope.email = {
        text: 'me@example.com'
      };
$scope.tenant_id=localStorage.getItem("tenant_id");
$rootScope.tenant=$scope.tenant_id;
$scope.clientregistration = {id: null,client_name:"",email_id:"",phone_number:"",tenant_id: $scope.tenant_id};
$scope.username=localStorage.getItem("username");
$scope.clientForm= function(){  
 
 
        var clientregistration = {"client_name":$scope.clientregistration.client_name,"email_id":$scope.clientregistration.email_id,"phone_number":$scope.clientregistration.phone_number,"tenant_id": $scope.clientregistration.tenant_id};
  if ($scope.clientregistration.id== null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'api/v1/cncclients',
        data: clientregistration  
      })
      
      .success(function(data) {
        
        if(data){
$scope.clientregistration="";
    alert("Registration completed");
$scope.clientinit();
 $(document).ready(function () {
   $('#client').modal('hide');
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
        url: $rootScope.api_url+'api/v1/cncclients/'+$scope.clientregistration.id,
        data: clientregistration  
      })
      
      .success(function(data) {
        
        if(data){

alert("Updated Successfully");
    $scope.clientinit();
     $(document).ready(function () {
   $('#client').modal('hide');
 });
        }else{      
        alert('Updation Failed');   
        }
      });

    }
    }

$scope.clientinit=function(){
$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/cncclients?tenant_id='+$rootScope.tenant
  })
  .then(function(response){
    $scope.myLoader = false;
   $rootScope.clients = response.data; 
   
    })
}

  $scope.cleandata=function(){

$scope.cleardata= {id: null,client_name:"",email_id:"",phone_number:"",tenant_id: $scope.tenant_id};
$scope.clientregistration = angular.copy($scope.cleardata);
  }

    $scope.edit = function(id) {
var i;
   for(i in $rootScope.clients) {

            if($rootScope.clients[i].id == id) {
               var client_id=$rootScope.clients[i];
               $scope.clientregistration = angular.copy(client_id);
            }
           
        }
    }

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'api/v1/cncclients/'+id).success(function(data) {
        
        if(data){

alert("Deleted Successfully");
      $scope.clientinit();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}
}]);