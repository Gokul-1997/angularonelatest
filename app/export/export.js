'use strict';

angular.module('export', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/export', {
    templateUrl: 'export/export.html',
    controller: 'ExportCtrl'
  });
}])

.controller('ExportCtrl',function($scope,$http,$location,$rootScope,$timeout,$window) {
  $scope.tenant_id=localStorage.getItem("tenant_id");


		$http({
	    method:'GET',
	    url:$rootScope.api_url+'api/v1/machines?tenant_id='+$scope.tenant_id})
	  .then(function(response){
	   $rootScope.allmachines = response.data;    
	    })

	  $scope.generate_export=function(){
	  		$http({
		    method:'GET',
		    url:$rootScope.api_url+'api/v1/machines/consolidate_data_export?machine_id='+$scope.MachineID+'&start_date='+$scope.from_date+'&end_date='+$scope.to_date
		    }).then(function(response){
		    $scope.myLoader = false;
		    $scope.itemexport = response.data;	
		    console.log($scope.itemexport);	    
		    $scope.isdisabled=false;
		    })
	  }

	  $scope.exportData = function (){
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
  };



})
