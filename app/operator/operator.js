'use strict';

angular.module('operator', ['ngRoute','ngSanitize','ui.bootstrap', 'mgcrea.ngStrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/operator', {
    templateUrl: 'operator/operator.html',
    controller: 'OperatorCtrl'
  });
}])

.controller('OperatorCtrl',  ['$scope', '$http','$location','$rootScope','$window','$filter','$interval',
  function($scope, $http,$location,$rootScope,$window,$filter,$interval) {

$scope.tenant_id=localStorage.getItem("tenant_id");
$scope.username=localStorage.getItem("username");
$scope.roleforpage=localStorage.getItem("role_id");
$scope.useridforedit=localStorage.getItem("userid");
$scope.operatorentry = {
        working_date:"",
        from_time:"",
        to_time:"",
        user_id:$scope.useridforedit,
        shifttransaction_id:null,
        machine_id:null,
        tenant_id:$scope.tenant_id,
        no_of_rejects:"",
        no_of_parts_produced:"",
        parts_moved_to_next_operation:"",
        total_down_time:"",
        reason_for_down_time:"",
        last_machine_reset_time:"",
        remarks:""
    }

$(document).ready(function () {

    'use strict';

    var brandPrimary = '#f7941e';
    var machineRunning = '#2cbe63';

    var PIECHARTEXMPLE    = $('#pieChartExample');


    

    var pieChartExample = new Chart(PIECHARTEXMPLE, {
        type: 'doughnut',
        data: {
            labels: [
                "Hours Worked",
                "Down Time",
                "Remaining"
            ],
            datasets: [
                {
                    data: [100, 100, 100],
                    borderWidth: [1, 1, 1],
                    backgroundColor: [
                        brandPrimary,
                        "#ffbc6c",
                        "#e0e0e0"
                    ],
                    hoverBackgroundColor: [
                        brandPrimary,
                        "#ffbc6c",
                        "#e0e0e0"
                    ]
                }]
            }
    });

    var pieChartExample = {
        responsive: true
    };

    


});



$scope.operatorForm= function(){  
 
 

 $scope.from = $filter('date')($scope.operatorentry.from_time, "hh:mma"); 
  $scope.to = $filter('date')($scope.operatorentry.to_time, "hh:mma"); 
  $scope.total_down = $filter('date')($scope.operatorentry.total_down_time, "HH:mm:ss");
  $scope.resettime = $filter('date')($scope.operatorentry.last_machine_reset_time, "HH:mma");


        var operatorentry= {
    "operatorworkingdetail":{
        "working_date":$scope.operatorentry.working_date,
        "from_time":$scope.from,
        "to_time": $scope.to,
        "user_id":$scope.operatorentry.user_id,
        "shifttransaction_id":$scope.operatorentry.shifttransaction_id,
        "machine_id":$scope.operatorentry.machine_id,
        "tenant_id":$scope.operatorentry.tenant_id,
        "no_of_rejects":$scope.operatorentry.no_of_rejects,
        "no_of_parts_produced":$scope.operatorentry.no_of_parts_produced,
        "parts_moved_to_next_operation":$scope.operatorentry.parts_moved_to_next_operation,
        "total_down_time":$scope.total_down,
        "reason_for_down_time":$scope.operatorentry.reason_for_down_time,
        "last_machine_reset_time":$scope.resettime,
        "remarks":$scope.operatorentry.remarks
    }
}
  if ($scope.operatorentry.id== null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'api/v1/operatorworkingdetails',
        data: operatorentry 
      })
      
      .success(function(data) {
        
        if(data){
$scope.operatorentry="";
       // $state.go('/company_registration');
    alert("Registration completed");
     $window.location.reload();
        }else{      
        alert('Registration Failed');   
        }
      });
    }else
    {
      
 $http
      ({
        method: 'put',
        url: $rootScope.api_url+'api/v1/cncclients/'+$scope.operatorentry.id,
        data: operatorentry 
      })
      
      .success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Updated Successfully");
      $window.location.reload();
        }else{      
        alert('Updation Failed');   
        }
      });


    }




    }

 
$http({
    method:'GET',
    url:$rootScope.api_url+'api/v1/machines?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
   $rootScope.operatormachines = response.data; 

   
    })
  $http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/shifts?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
 $scope.shiftdetailfordrop1= response.data; 
//console.log(  $scope.shiftdetailfordrop);

 $http({


    method:'GET',
    url:$rootScope.api_url+'api/v1/shifttransactions?shift_id='+ $scope.shiftdetailfordrop1.id

  })
  .then(function(response){
   $rootScope.shiftstransfordrop1 = response.data; 
    
      })
 })
	

}]);