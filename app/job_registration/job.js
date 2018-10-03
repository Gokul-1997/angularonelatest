'use strict';

angular.module('job', ['ngRoute','ngSanitize','ui.bootstrap', 'mgcrea.ngStrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/job_registration', {
    templateUrl: 'job_registration/job.html',
    controller: 'JobCtrl'
  });
}])

.controller('JobCtrl', ['$scope', '$http','$location','$rootScope','$window','$filter',
  function($scope, $http,$location,$rootScope,$window,$filter) {

  $scope.myLoader = true;


  $http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/job_lists'
  })
  .then(function(response){
    $scope.myLoader = false;
   $rootScope.delayjobs = response.data; 
  
    })


$scope.jobregistration = {id: null,description:"",job_start_date: "",job_due_date:"",order_quantity:"",cncclient_id: "",job_id:"",cycle_time:"", idle_cycle_time:"",tenant_id: $scope.tenant_id};

$scope.jobForm= function(){  
  var jobregistration = {"description":$scope.jobregistration.description,"job_start_date":$scope.jobregistration.job_start_date,"job_due_date":$scope.jobregistration.job_due_date,"order_quantity":$scope.jobregistration.order_quantity,"cncclient_id":$scope.jobregistration.cncclient_id,"job_id":$scope.jobregistration.job_id ,"cycle_time":$scope.cycle,"idle_cycle_time":$scope.idle,"tenant_id": $scope.jobregistration.tenant_id};
      if ($scope.jobregistration.id==null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'api/v1/cncjobs',
        data: jobregistration  
       

      })
      
      .success(function(data) {
        if(data){



alert("Registration completed");
      $scope.cncjobinit();
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
        url: $rootScope.api_url+'api/v1/cncjobs/'+$scope.jobregistration.id,
        data: jobregistration  
      })
      
      .success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Updated Successfully");
        $scope.cncjobinit();
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


$scope.cncjobinit=function(){
  
$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/cncjobs?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
    $scope.myLoader = false;
   $rootScope.jobs = response.data; 
  
    })

    
}

$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/cncclients?tenant_id='+$scope.tenant_id
      })
  .then(function(response){
   $rootScope.clients = response.data; 
    $rootScope.count=$rootScope.clients.length;
  
    })

 $scope.showdetails = function(id){

         var i=0;
    var len=$rootScope.count;
    for (; i<len; i++) {
      if ($rootScope.clients[i].id == id) {
      
       return $rootScope.clients[i].client_name;
      }
    }
     }


     $scope.cleandata = function(id){

       $scope.jobregistr = {id: null,description:"",job_start_date: "",job_due_date:"",order_quantity:"",cncclient_id: "",job_id:"",cycle_time:"", idle_cycle_time:"",tenant_id: $scope.tenant_id};
            $scope.jobregistration = angular.copy($scope.jobregistr);
            

     }

$scope.cncoperation=function(id){
localStorage.setItem("jobregid",id);
         $location.path('/cnc_operation')
}


    $scope.edit = function(id) {


var i;
   for(i in $rootScope.jobs) {

            if($rootScope.jobs[i].id == id) {
               var job_id=$rootScope.jobs[i];
               $scope.jobregistration = angular.copy(job_id);
             
            }
           
        }
    }

$scope.delete = function(id) {

$http.delete($rootScope.api_url+'api/v1/cncjobs/'+id).success(function(data) {
        
        if(data){

alert("Deleted Successfully");
      $scope.cncjobinit();
        }else{      
        alert('Delete Failed');   
        }
      });

}

$scope.handler = function(val){
  var ss = val.split(':');
  var ll = ss[7].split("'");
  //console.log(ll);
  return ll[1];
}
}]);