  'use strict';

angular.module('breaktime', ['ngRoute','ngSanitize','ui.bootstrap', 'mgcrea.ngStrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/breaktime', {
    templateUrl: 'breaktime/breaktime.html',
    controller: 'BreaktimeCtrl'
  });
}])

.controller('BreaktimeCtrl', ['$scope', '$http','$location','$window','$rootScope','$filter',
  function($scope, $http,$location,$window,$rootScope,$filter) {
$scope.myLoader = true;

$scope.breaktime_ids=localStorage.getItem("breaktime_id");
 
$scope.breakregistration = {id: null,reasion:"",start_time:"",end_time:"",total_minutes:"",start_time_dummy:"",end_time_dumy:"",shifttransaction_id:$scope.breaktime_ids,tenant_id: $scope.tenant_id};

$scope.breakForm= function(){  
 $scope.daystart = $filter('date')($scope.breakregistration.start_time_dummy, "hh:mma");
  $scope.dayend = $filter('date')($scope.breakregistration.end_time_dumy, "hh:mma");

        var breakregistration = {"reasion":$scope.breakregistration.reasion,"start_time":$scope.daystart,"end_time":$scope.dayend,"total_minutes":$scope.breakregistration.total_minutes,"start_time_dummy":$scope.breakregistration.start_time_dummy,"end_time_dumy":$scope.breakregistration.end_time_dumy,"shifttransaction_id":$scope.breaktime_ids,"tenant_id": $scope.breakregistration.tenant_id};
  if ($scope.breakregistration.id== null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'api/v1/break_times',
        data: breakregistration  
      })
      
      .success(function(data) {
        
        if(data){
$scope.breakregistration="";
    alert("Registration completed");
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
        url: $rootScope.api_url+'api/v1/break_times/'+$scope.breakregistration.id,
        data: breakregistration  
      })
      
      .success(function(data) {
        
        if(data){

alert("Updated Successfully");
     $scope.breaktimeinit();
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


$scope.breaktimeinit=function(){
$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/break_times?shifttransaction_id='+$scope.breaktime_ids
  })
  .then(function(response){
    $scope.myLoader = false;
   $rootScope.breaks = response.data; 
   
    })
}
  $scope.cleandata=function(){

$scope.cleardata= {id: null,reasion:"",start_time:"",end_time:"",total_minutes:"",start_time_dummy:"",end_time_dumy:"",shifttransaction_id:$scope.breaktime_id,tenant_id: $scope.tenant_id};
$scope.breakregistration = angular.copy($scope.cleardata);
  }

    $scope.edit = function(id) {
      var i;
   for(i in $rootScope.breaks) {

            if($rootScope.breaks[i].id == id) {
            
               var break_id=$rootScope.breaks[i];
               $scope.breakregistration = angular.copy(break_id);
            }
           
        }
    }

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'api/v1/break_times/'+id).success(function(data) {
        
        if(data){

alert("Deleted Successfully");
     $scope.breaktimeinit();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}

  

}]);