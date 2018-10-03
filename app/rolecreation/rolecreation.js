'use strict';

angular.module('role', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/rolecreation', {
    templateUrl: 'rolecreation/rolecreation.html',
    controller: 'RolecreationCtrl'
  });
}])

.controller('RolecreationCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

$scope.roleregistration = {id: null,role_name:"",tenant_id: $scope.tenant_id};

$scope.roleForm= function(){


        var roleregistration = {"role_name":$scope.roleregistration.role_name,"tenant_id": $scope.roleregistration.tenant_id};
  if ($scope.roleregistration.id== null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'api/v1/roles',
        data: roleregistration
      })

      .success(function(data) {

        if(data){
$scope.roleregistration="";
       // $state.go('/company_registration');
    alert("Registration completed");
     $window.location.reload();
     $scope.rolecreationinit();
        }else{
        alert('Registration Failed');
        }
      });
    }else
    {

 $http
      ({
        method: 'put',
        url: $rootScope.api_url+'api/v1/roles/'+$scope.roleregistration.id,
        data: roleregistration
      })

      .success(function(data) {

        if(data){

       // $state.go('/company_registration');
alert("Updated Successfully");
 $scope.rolecreationinit();
        }else{
        alert('Updation Failed');
        $scope.rolecreationinit();
        }
      });
    }
    }

/*app.js end*/
$scope.rolecreationinit=function(){
$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/roles?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
   $rootScope.roles = response.data;

    })
}
  $scope.cleandata=function(){

$scope.cleardata= {id: null,role_name:"",tenant_id: $scope.tenant_id};
$scope.roleregistration = angular.copy($scope.cleardata);
  }

    $scope.edit = function(id) {



var i;
   for(i in $rootScope.roles) {

            if($rootScope.roles[i].id == id) {
               var role_id=$rootScope.roles[i];
               $scope.roleregistration = angular.copy(role_id);
            }

        }

    }


$scope.roleset=function(id){
localStorage.setItem("role_idforsetting",id);
$location.path("/rolesetting");

}

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'api/v1/roles/'+id).success(function(data) {

        if(data){

       // $state.go('/company_registration');
alert("Deleted Successfully");
 // $window.location.reload();
     $scope.rolecreationinit();
        }else{
        alert('Delete Failed');
        }
      });
}

}

}]);
