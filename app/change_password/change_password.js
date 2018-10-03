'use strict';

angular.module('changepassword', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/changepassword', {
    templateUrl: 'change_password/change_password.html',
    controller: 'ChangepasswordCtrl'
  });
}])

.controller('ChangepasswordCtrl',
  function($scope,$http,$location,$window,$rootScope) {

    $scope.password={email_id:'',password:'',confirm_password:''};

    $scope.passwordSubmit=function(){

        if($scope.password.password === $scope.password.confirm_password){
            console.log($scope.password);

            $http
            ({
              method: 'get',
              url: $rootScope.api_url + 'api/v1/sessions/change_pwd_web?email_id='+$scope.password.email_id +'&new_pwd='+$scope.password.password +'&confirm_pwd='+ $scope.password.confirm_password
            })
            .success(function (data) {
    
              if(data == true){
                alert('Updated Succesfully');
                $window.location='/#!/login';
              }else{
              alert('Invaild Email ID');
              }
    
            }).error(function (data){
    
            })
           
        }else{
            alert('Password Mismatch');
        }

    }
});
