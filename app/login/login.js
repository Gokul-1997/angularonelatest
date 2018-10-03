'use strict';

angular.module('login', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'login/login.html',
      controller: 'LoginCtrl'
    });
  }])

  .controller('LoginCtrl', ['$scope', '$http', '$location', '$window', '$rootScope',
    function ($scope, $http, $location, $window, $rootScope) {

      $scope.email = {
        text: 'me@example.com'
      };
      $scope.login = { email_id: "", password: "" };

      $scope.signin = function () {
        $scope.isdisabled = true;
        var login =
          {
            "email_id": $scope.login.email_id,
            "password": $scope.login.password
          }
        // $http
        //   ({
        //     method: 'post',
        //     url: $rootScope.api_url + 'api/v1/authenticate',
        //     data: { "email": $scope.login.email_id, "password": $scope.login.password }
        //   })

        //   .success(function (data) {

        //     sessionStorage.setItem("authkey", data.auth_token);
        //     $http.defaults.headers.common['Authorization'] = data.auth_token;


            $http
              ({
                method: 'post',
                url: $rootScope.api_url + 'api/v1/sessions',
                data: login
              })

              .success(function (data) {
                console.log(data)
                if (data.usertype_id == 1) {
                  $scope.isdisabled = false;
                  // alert('Welcome your login was successful'); 

                  // $state.go('/company_registration');
                  localStorage.setItem("tenant_id", data.tenant_id);
                  localStorage.setItem("userid", data.id)
                  localStorage.setItem("username", data.first_name);
                  localStorage.setItem("role_id", data.role_id);
                  localStorage.setItem("usertype_id", data.usertype_id);
                  //alert( localStorage.getItem("tenant_id"));
                  $scope.const();
                  $rootScope.logInfo = 2;
                  $window.location = '/#!/frontpage';
                } else if (data.usertype_id == 2) {
                  console.log(data);
                  localStorage.clear();
                  localStorage.setItem("usertype_id", data.usertype_id);
                  localStorage.setItem("username", data.first_name);
                  $scope.const();
                  $window.location = '/#!/companydetails';
                } else {
                  $scope.isdisabled = false;
                  alert('The username or password is incorrect');
                }
              })
         // })
      }
      /*start forgot*/

      $scope.forgot = { email_id: "", phone_number: "" };
      $scope.forgotSubmit=function(){

        $http
        ({
          method: 'get',
          url: $rootScope.api_url + 'api/v1/sessions/forgot_pwd?email_id='+ $scope.forgot.email_id+'&phone_number='+$scope.forgot.phone_number
        })
        .success(function (data) {

          if(data == true){

            alert('Check Your Mail and Reset Your Password');
            console.log($scope.forgot);
            $('#forgot').modal('hide');
          }else{
            alert('Please enter Correct Email or phone Number');
          }

        }).error(function (data){

        })

      
      }

      $scope.clearForgot=function(){
        $scope.forgot = { email_id: "", phone_number: "" };
      }



    }])

    .directive('autofocus', ['$timeout', function($timeout) {
      return {
        restrict: 'A',
        link : function($scope, $element) {
          $timeout(function() {
            $element[0].focus();
          });
        }
      }
    }]);
