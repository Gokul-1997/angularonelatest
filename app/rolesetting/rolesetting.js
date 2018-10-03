'use strict';

angular.module('rolesetting', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/rolesetting', {
    templateUrl: 'rolesetting/rolesetting.html',
    controller: 'RoleCtrl'
  });
}])

.controller('RoleCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {
 $rootScope.pageids=[];
$scope.roleid=localStorage.getItem("role_idforsetting");

  $scope.tenant_id=localStorage.getItem("tenant_id");
$scope.username=localStorage.getItem("username");
$scope.roleforpage=localStorage.getItem("role_id");
$scope.useridforedit=localStorage.getItem("userid");

$http({
    method:'GET',
    url:$rootScope.api_url+'api/v1/pages' 
  })
  .then(function(response){
    
   $rootScope.pages = response.data; 
   
    })

  $http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/pageauthorizations' 
  })
  .then(function(response){
   $rootScope.authorization = response.data; 
   
    })


$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/roles?tenant_id='+$scope.tenant_id 
  })
  .then(function(response){
   $rootScope.roles = response.data; 
   
    })
  $http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/menuconfigurations?tenant_id='+$scope.tenant_id+'&role_id='+$scope.roleid
      })
  .then(function(response){
   $rootScope.menudata= response.data; 
 $scope.rolesetting.pageauthorization_id=$rootScope.menudata[0].pageauthorization_id;
   var j;
   for(j in $rootScope.menudata) {
$rootScope.pageids.push($rootScope.menudata[j].page_id);

    }
    })


$scope.checkid=function(id){


  var indexvalue =  $rootScope.pageids.indexOf(id);
 
if (indexvalue>=0){
  return true
}
else{
  return false
}

}

$scope.toggleSelection = function toggleSelection($event,id) {
  
if ($event.target.checked==true){

 $rootScope.pageids.push(id);
}
else
{

 var index =  $rootScope.pageids.indexOf(id);
   $rootScope.pageids.splice(index, 1);  
}
   
console.log($rootScope.pageids);

        //$rootScope.pageids.push({page_id: id});
        }



$scope.rolesetting = {id: null,page_id:null,role_id:$scope.roleid,pageauthorization_id:null,tenant_id: $scope.tenant_id};

  $scope.cleandata=function(){
    
    if ($rootScope.pageids.length!=0){
      console.log($scope.rolesetting.pageauthorization_id);
      /*authorization checking if*/
if($scope.rolesetting.pageauthorization_id!=null){
   var rolesetting = {"page_id":$rootScope.pageids,"role_id":$scope.roleid,"pageauthorization_id":$scope.rolesetting.pageauthorization_id,"tenant_id": $scope.tenant_id};
  



  $http
      ({
        method: 'post',
        url: $rootScope.api_url+'api/v1/menuconfigurations',
        data: rolesetting  
      })
      
      .success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
    alert("Configuration completed");
      $window.location='/#!/rolecreation'
     $window.location.reload();
        }else{      
        alert('Configuration Failed');   
        }
      });
}
else
{
alert("Plese select Authorization");

}


}
else
{
  alert("Please select atleast one page to configure!");
}
  }

    $scope.edit = function(id) {

var i;
   for(i in $rootScope.clients) {

            if($rootScope.clients[i].id == id) {
               var client_id=$rootScope.clients[i];
               $scope.rolesetting = angular.copy(client_id);
            }
           
        }
    }

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'api/v1/cncclients/'+id).success(function(data) {
        
        if(data){

       // $state.go('/company_registration');.
alert("Deleted Successfully");
      $window.location.reload();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}

  

}]);