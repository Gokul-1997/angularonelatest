'use strict';

angular.module('adminuser', ['ngRoute'])


.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/adminuser', {
    templateUrl: 'adminuser/adminuser.html',
    controller: 'AdminUserCtrl'
  });
}])

.controller('AdminUserCtrl', ['$scope', '$http','$location','$window','$rootScope',function($scope, $http,$location,$window,$rootScope) {

 $scope.myLoader = true;
 //$scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  $scope.email = {
        text: 'me@example.com'
      };
$scope.tenant_id=localStorage.getItem("tenant_id");
$rootScope.tenant=$scope.tenant_id;

 $scope.userregistration = {id: null,first_name:"",last_name:"",email_id:"",password:"",phone_number:"", remarks: "",usertype_id: 2};
$scope.username=localStorage.getItem("username");
$scope.userForm= function(){  

        var userregistration = {first_name:$scope.userregistration.first_name,last_name:$scope.userregistration.last_name,email_id:$scope.userregistration.email_id,password:$scope.userregistration.password,phone_number:$scope.userregistration.phone_number, remarks: $scope.userregistration.remarks,usertype_id:$scope.userregistration.usertype_id,isactive:true};
  if ($scope.userregistration.id== null){
   // alert($scope.userregistration.role_id);
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'api/v1/users',
        data: userregistration  
      })
      
      .success(function(data) {
        
        if(data){
          //alert("hi");
$scope.userregistration="";
       // $state.go('/company_registration');
    alert("Registration completed");
    //$window.location.reload();
     $scope.userinit();
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
        url: $rootScope.api_url+'api/v1/users/'+$scope.userregistration.id,
        data: userregistration  
      })
      
      .success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Updated Successfully");
    $scope.userinit();
        }else{      
        alert('Updation Failed');   
        }
      });

    }

    }


$scope.userinit=function(){

$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/users/admin_user'
  })
  .then(function(response){
    $scope.myLoader = false;
   $rootScope.users = response.data; 
   
    })
}

  $scope.cleandata=function(){

$scope.cleardata= {id: null,first_name:"",last_name:"",email_id:"",password:"",phone_number:"", remarks: "",usertype_id: 2,isactive:true};
$scope.userregistration = angular.copy($scope.cleardata);
  }

// $scope.showdetails = function(id){

//          var i=0;
//     var len=$rootScope.count;
    
//     for (; i<len; i++) {
//       if ($rootScope.role_ids[i].id == id) {
      
//        return $rootScope.role_ids[i].role_name;
      
//       }
//     }
         
//      }


    $scope.edit = function(id) {
var i;
   for(i in $rootScope.users) {

            if($rootScope.users[i].id == id) {
               var user_id=$rootScope.users[i];
               $scope.userregistration = angular.copy(user_id);
            }
           
        }
    }

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'api/v1/users/'+id).success(function(data) {
        
        if(data){

        alert("Deleted Successfully");
      $scope.userinit();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}

               

}]);
