'use strict';

angular.module('jobpage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/jobpage', {
    templateUrl: 'job_page/job_page.html',
    controller: 'JobpageCtrl'
  });
}])

.controller('JobpageCtrl', ['$scope','$http','$location','$rootScope','$timeout','$window', function($scope,$http,$location,$rootScope,$timeout,$window) {

$scope.JoBID=localStorage.getItem("cncjob_id");
$scope.Filter_job=localStorage.getItem("Filterid");
 
$http({
    method:'GET',
    url:$rootScope.api_url+'api/v1/cncjobs/job_filter?tenant_id='+$scope.tenant_id+'&completed_status='+$scope.Filter_job
  }).then(function(response){
   $rootScope.alljobs = response.data; 
        })

$http({
       method:'GET',
       url:$rootScope.api_url+'api/v1/cncjobs/job_page_details?job_id='+$scope.JoBID
   }).then(function(response){
        if(response.data=="" ){
          alert("There is no ID..!");
           }else{
             $scope.jobdetails = response.data
}
      
 $scope.myJson =     {
      "type": "bar",
      "plot": {
        "background-color": "#F7941D"
      },
      "scale-x": {
        "labels": ["OQ", "PP", "PR","PD","Rework","Rejects","FIQ"]
      },
      "scale-y": {
        "values": "0:"+$scope.jobdetails.job_detail.order_quantity+":"+$scope.jobdetails.job_detail.order_quantity/10
      },
      "series": [{
        "values":[$scope.jobdetails.job_detail.order_quantity,$scope.jobdetails.parts_produced,$scope.jobdetails.parts_remaining,$scope.jobdetails.parts_deliverd,$scope.jobdetails.parts_rework,$scope.jobdetails.parts_reject,$scope.jobdetails.fiq]
      }]
    }
})

$http({
    method:'GET',
    url:$rootScope.api_url+'api/v1/cncjobs/job_page_operation?job_id='+$scope.JoBID
  })
  .then(function(response){
   $rootScope.operationdetails= response.data; 
  })

$scope.checkingjobID=function(machine){
 
    localStorage.setItem("cncjob_id", $scope.JobID);
    $window.location.reload();
}

$scope.FilteringjobID=function(machine){
 localStorage.setItem("Filterid",$scope.Filter_job);
    $window.location.reload();
}
}]);
