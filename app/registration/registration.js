'use strict';

angular.module('registrations', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/registration', {
    templateUrl: 'registration/registration.html',
    controller: 'RegistrationCtrl'
  });
}])

.controller('RegistrationCtrl', ['$scope', '$http', '$location', '$window', '$rootScope',
  function($scope,$http,$location,$window,$rootScope) {

$scope.registration = {first_name:'',last_name:'',email_id:'',password:'',phone_number:'',remarks:'', tenant_name: '', companytype_id: 1,address_line1: '',address_line2: '', city: '', state: '', country:'',pincode: '',usertype_id: 1,approval_id: 1,role_id: 1,isactive: true};

$scope.signup = function(){  
  $rootScope.logInfo=1;
  $scope.myLoader = true;
  console.log($scope.registration)
        var registration = {

          
            "first_name":$scope.registration.first_name,
            "last_name":$scope.registration.last_name,
            "email_id":$scope.registration.email_id,
            "password":$scope.registration.password,
            "phone_number":$scope.registration.phone_number,
            "remarks":$scope.registration.remarks, 
            "tenant_name": $scope.registration.tenant_name,
             "companytype_id": $scope.registration.companytype_id,
             "address_line1": $scope.registration.address_line1,
             "address_line2": $scope.registration.address_line2,
              "city": $scope.registration.city,
               "state": $scope.registration.state, 
               "country":$scope.registration.country,
               "pincode": $scope.registration.pincode,
               "usertype_id": $scope.registration.usertype_id,
               "approval_id": $scope.registration.approval_id,
               "role_id":$scope.registration.role_id,
               "isactive":$scope.registration.isactive
             };
      
      $http({
        method: 'post',
        url: $rootScope.api_url+'api/v1/tenants/tenant_user_creation',
        data: registration  
      })
      .success(function(response) {
        $scope.myLoader = false;
        if(response){
          console.log(response.data);

        alert("Thank you for registering with Yantra24X7");
        $window.location='/#!/login';
        }else{      
        alert('Registration Failed');   
        }
      });
    }

 $scope.emailvalidate=function(){
   //alert($scope.registration.email_id);
   $scope.errormsg="";
 $http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/users/email_validation?email_id='+$scope.registration.email_id
  })
  .then(function(response){
    
   if(response.data==true){
$scope.errormsg="Email already exist!"
   } 
   
    })
}   
}]);
