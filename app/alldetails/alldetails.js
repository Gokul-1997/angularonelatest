'use strict';

angular.module('alldetails', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/alldetails', {
    templateUrl: 'alldetails/alldetails.html',
    controller: 'AlldetailsCtrl'
  });
}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/companydetails', {
    templateUrl: 'alldetails/companydetails.html',
    controller: 'AlldetailsCtrl'
  });
}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/adminuser', {
    templateUrl: 'alldetails/adminuser.html',
    controller: 'AlldetailsCtrl'
  });
}])

.controller('AlldetailsCtrl', ['$scope', '$http','$location','$window','$rootScope',function($scope, $http,$location,$window,$rootScope) {


var usertypeid=localStorage.getItem("usertype_id")
if(usertypeid != 2){
 $location.path('/login')
    return;
}
          $scope.statusinit=function(){ 
               $http({
               method:'GET',
               url:$rootScope.api_url+'api/v1/machines/status'})
              .then(function(response){               
                      $scope.companystatus = response.data;
                      console.log($scope.companystatus);
               })
}


             // http://182.72.104.66:3007/api/v1/pending_approvals
$scope.approveInit=function(){ 
                $http({
               method:'GET',
               url:$rootScope.api_url+'api/v1/pending_approvals'})
              .then(function(response){               
                      $scope.companyapproval = response.data.reverse();
                      console.log($scope.companystatus);
               })
              }


              $scope.userUpdate=function(detail){
                console.log(detail);
               
                 $http
                    ({
                      method: 'put',
                      url: $rootScope.api_url+'api/v1/users/'+detail.id,
                      data: {"isactive":true , "email_id":detail.email_id}  
                    })
                    
                    .success(function(data) {
                      
                      if(data){

                     // $state.go('/company_registration');
                   alert("Updated Successfully");
                 $scope.approveInit();
                      }else{      
                      alert('Updation Failed');   
                      }
                    });
              }


              $scope.userDeny=function(detail){
                console.log(detail);
               
                 $http
                    ({
                      method: 'put',
                      url: $rootScope.api_url+'api/v1/users/'+detail.id,
                      data: {"isactive":false, "email_id":detail.email_id}  
                    })
                    
                    .success(function(data) {
                      
                      if(data){

                     // $state.go('/company_registration');
                     alert("Updated Successfully");
                  $scope.approveInit();
                      }else{      
                      alert('Updation Failed');   
                      }
                    });
              }


 
               

}]);
