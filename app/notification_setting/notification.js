'use strict';

angular.module('notification', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notification', {
    templateUrl: 'notification_setting/notification.html',
    controller: 'NotificationCtrl'
  });
}])

.controller('NotificationCtrl', function($scope,$http,$rootScope) {

  
    $scope.tenant_id = localStorage.getItem("tenant_id");
    $http({
        method:'GET',
        url:$rootScope.api_url + 'api/v1/set_alarm_settings?tenant_id='+ $scope.tenant_id})
        .then(function(response){
          
             $scope.setalarmgetRes=response.data;
        })

                     $scope.setStatus=function(status,id,time){
                     
                          $http({
                              method: 'put',
                              url: $rootScope.api_url + 'api/v1/set_status',
                              data:  {"id":id,"active":status} 
                          })
   
                            .success(function(data) {
                             $scope.setshow=1;
                             $http({
                               method:'GET',
                               url:$rootScope.api_url + 'api/v1/set_alarm_settings?tenant_id='+ $scope.tenant_id})
                               .then(function(response){
                                 
                                    $scope.setalarmgetRes=response.data;                                
                                    alert("Updated successfully");
                               })
                              
                             
                            })
   
                     }
                       
                        $scope.setsave=function(data){
                        console.log(data);
                             
                       
                      
                        
                              var upadteData={"time_interval":data.time_interval}
   
                          $http({
                              method: 'put',
                              url: $rootScope.api_url + 'api/v1/set_alarm_settings/'+data.id,
                              data:upadteData  
                          })
                            .success(function(data) {
                                alert("Updated successfully");
                             
                            }) .error(function(data) {
   
                           });
   
                        }
   
   
                     
               $scope.times=[5,10,15,20,25,30,35,40,45,50,55,60];
                     
                   //setting end 

});