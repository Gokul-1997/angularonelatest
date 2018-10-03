'use strict';

angular.module('device_registration', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/device_registration', {
    templateUrl: 'device_registration/device_registration.html',
    controller: 'device_registrationCtrl'
  });
}])

.controller('device_registrationCtrl',function($scope, $http,$location,$window,$rootScope) {

$scope.deviceregister = {id: null,name:"",per_pic_price:"",purchase_date:"",count:"",total_price:"",created_by: ""};

// for(var i=0;i<=10;i++){
// console.log(i);
// }




$scope.deviceinit=function(){

$http({

    method:'GET',
    url: $rootScope.api_url+'api/v1/device_types'
   
  })
  .then(function(response){	
   
   $scope.deviceres = response.data; 
   
})

}


$scope.cleandata = function () {

	$scope.cleardata={id: null,name:"",per_pic_price:"",purchase_date:"",count:"",total_price:"",created_by: ""};
           $scope.deviceregister = angular.copy($scope.cleardata);
      
}


$scope.submitdevice= function(){  
 
 
        var devicename = {"per_pic_price":$scope.deviceregister.per_pic_price,
        "purchase_date":$scope.deviceregister.purchase_date,
        "name":$scope.deviceregister.name,
        "count":$scope.deviceregister.count,
        "total_price":$scope.deviceregister.total_price,
        "created_by":$scope.deviceregister.created_by};
//return;

  if ($scope.deviceregister.id== null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'api/v1/device_types',
        data: devicename  

                
      })
      
      .success(function(data) {
        $scope.deviceinit();
        
    alert("Registration completed");
    
         $('#machine').modal('hide');
      });
    }else
    {
      
 $http
      ({
        method: 'put',
        url: $rootScope.api_url+'api/v1/device_types/'+$scope.deviceregister.id,
        data: devicename
      })
      
      .success(function(data) {
        $scope.deviceinit();
      alert("Updated Successfully");
        $('#machine').modal('hide');
        $scope.cleandata();
        
      });

    }

    }
$scope.edit = function (id) {
	//alert(id);
            var i;
            for (i in $scope.deviceres) {

                if ($scope.deviceres[i].id == id) {

                    var deviceres_id = $scope.deviceres[i];
                    $scope.deviceregister = angular.copy(deviceres_id);
                }

            }
        }


    $scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'api/v1/device_types/'+id).success(function(data) {
         $scope.deviceinit();
       
alert("Deleted Successfully");
      
      });
}

}









  
})