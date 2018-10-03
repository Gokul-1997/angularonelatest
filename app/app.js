'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'frontpage',
  'login',
  'registrations',
  'dashboard',
  'conventional',
  'alarms',
  'client',
  'machine_reg',
  'Maintanances',
  'ngPercentDisplay',
  'machines',
  'report',
  'export',
  'role',
  'jobpage',
  'job',
  'moment-picker',
  'shift',
  'breaktime',
  'operator',
  'operation',
  'comp',
  'machine_allocation',
  'operator_master',
  'operator_allocation_master',
  'rolesetting',
  'user',
  'alldetails',
  'alert',
  'register_tenant',
  'install_details',
  'tenantmachine',
  'tenantpayment_type',
  'notification',
  'adminuser',
  'device',
  'setting',
  'tenant',
  'device_registration',
  'changepassword',
  //'highcharts-ng',
  'myApp.version',
  'statuschart',
  'cyclestart',
  'conventionalreport'
]).
config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({
      redirectTo: '/login'
    });
  }])


  // run function for session handing

  .run(function ($rootScope, $location,$http) {
  //  var authcode=sessionStorage.getItem("authkey");
  //  if(authcode !=null){
  //   $http.defaults.headers.common['Authorization'] = authcode;    
  //  }else{
  //   $location.path('/login')
  //  }
    $rootScope.$on("$locationChangeStart", function (event, next, current) {
      // handle route changes  
      $rootScope.currentPath = $location.path();
      $rootScope.sidepath=$location.path().replace("/","");

      //console.log($rootScope.currentPath)
      if (localStorage.getItem("tenant_id") == null && $rootScope.currentPath != '/registration' && $rootScope.currentPath != '/alldetails' && $rootScope.currentPath != '/companydetails' && $rootScope.currentPath != '/frontpage' && $rootScope.currentPath != '/adminuser' && $rootScope.currentPath != '/device' && $rootScope.currentPath != '/setting'  && $rootScope.currentPath != '/tenant' && $rootScope.currentPath != '/device_registration' && $rootScope.currentPath != '/changepassword' && $rootScope.currentPath != '/tenantpayment_type' && $rootScope.currentPath != '/install_details'  && $rootScope.currentPath != '/register_tenant' && $rootScope.currentPath != '/tenantmachine' ) {
        
        $location.path('/login');
        return;
      }

      if ($rootScope.currentPath == '/machine_registration' || $rootScope.currentPath== '/shift_registration'  || $rootScope.currentPath == '/client' || $rootScope.currentPath == '/job_registration' || $rootScope.currentPath== '/usermanagement' || $rootScope.currentPath== '/operator_masters' || $rootScope.currentPath == '/operator_allocation_masters') {
      
        $rootScope.masterShow = true;
       
      }else{
        $rootScope.masterShow = false;
      }

    });
  })

 
   // common controller
  .controller('appctrl', ['$scope', '$http', '$location', '$rootScope', '$window', '$templateCache',
    function ($scope, $http, $location, $rootScope, $window, $templateCache) {

 $rootScope.masterShow = false;

      $scope.currentPath = $location.path();

    //   $rootScope.api_url='http://dp.yantra24x7.com/';
      //  $rootScope.api_url_report='http://dp.yantra24x7.com/';

     /* $rootScope.api_url = "http://182.72.104.66:3007/";
     $rootScope.api_url_report = "http://192.168.1.48:3007/";
*/


    $rootScope.api_url = "http://192.168.1.48:3007/";
    $rootScope.api_url_report = "http://192.168.1.48:3007/";





      //alarm slide function
      $rootScope.alarmClick = function () {
        $scope.myLoader = true;
        $http({
            method: 'GET',
            url: $rootScope.api_url + 'api/v1/machines/dashboard_status_1?tenant_id=' + $scope.tenant_id + '&type=Alarm'
          })
          .then(function (response) {
            $scope.AlarmDash = response.data;
            $scope.myLoader = false;
          })

      }

      $scope.const = function () {
       
        $scope.CurrentDate = new Date();
        $scope.tenant_id = localStorage.getItem("tenant_id");
        $scope.username = localStorage.getItem("username");
        $scope.roleforpage = localStorage.getItem("role_id");
        $scope.useridforedit = localStorage.getItem("userid");
        $rootScope.usertype_id=localStorage.getItem("usertype_id");
        
           if( $scope.useridforedit != null){ 
        $http({
            method: 'GET',
            url: $rootScope.api_url + 'api/v1/users/' + $scope.useridforedit
          })
          .then(function (response) {
            $rootScope.userbyid = response.data;
            $rootScope.tenant_nme = response.data.tenant;
             $rootScope.tents = $rootScope.tenant_nme.tenant_name;
          })
        }

   
      }

      if (localStorage.getItem("username") != null) {
      $scope.const(); 
      }
      //logout function
      $scope.signout = function () {
        $templateCache.removeAll();
        localStorage.clear();
        $window.location = "/#!/login"
      }

      //side bar path redirect
      $scope.pageverification1 = function (url) {
        $scope.urls = url.substring(3);

        $location.path($scope.urls);
      }

      $scope.pageverification = function (url) {
        $scope.urls = url.substring(3);
        $location.path($scope.urls);
      }



        //dashboard user edit
      $scope.useredit = function () {

        $scope.profile_edit = angular.copy($rootScope.userbyid);
      }
      $scope.profile_edit = {
        id: null,
        first_name: "",
        last_name: "",
        email_id: "",
        password: "",
        phone_number: "",
        remarks: "",
        usertype_id: 1,
        approval_id: 1,
        role_id: null,
        tenant_id: $scope.tenant_id
      };
      $scope.usrid = $scope.useridforedit;
      $scope.usereditForm = function () {


        var profile_edit = {
          first_name: $scope.profile_edit.first_name,
          last_name: $scope.profile_edit.last_name,
          email_id: $scope.profile_edit.email_id,
          password: $scope.profile_edit.password,
          phone_number: $scope.profile_edit.phone_number,
          remarks: $scope.profile_edit.remarks,
          usertype_id: $scope.profile_edit.usertype_id,
          approval_id: $scope.profile_edit.approval_id,
          role_id: $scope.profile_edit.role_id,
          tenant_id: $scope.tenant_id
        };


        $http
          ({
            method: 'put',
            url: $rootScope.api_url + 'api/v1/users/' + $scope.profile_edit.id,
            data: profile_edit
          })

          .success(function (data) {

            if (data) {
              localStorage.setItem("username", data.first_name);
              $scope.username = data.first_name;
              // $state.go('/company_registration');
              alert("Updated Successfully");
              $window.location.reload();
            } else {
              alert('Updation Failed');
            }

          });

      }

      


    }])

    

  .directive('ngConfirmClick', [
    function () {
      return {
        link: function (scope, element, attr) {
          var msg = attr.ngConfirmClick; // || "Are you sure?";
          var clickAction = attr.confirmedClick;
          element.bind('click', function (event) {
            if (window.confirm(msg)) {
              scope.$eval(clickAction)
            }
          });
        }
      };
    }
  ]);


  

 