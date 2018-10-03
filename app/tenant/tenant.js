'use strict';

angular.module('tenant', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tenant', {
    templateUrl: 'tenant/tenant.html',
    controller: 'TenantCtrl'
  });
}])

.controller('TenantCtrl',function($scope,$http,$location,$rootScope,$timeout,$window){

$http({

    method:'GET',
    url: $rootScope.api_url+'api/v1/tenants'
   
  })
  .then(function(response){	
   
   $scope.tenants = response.data; 
   console.log($scope.tenants)
})
} )
