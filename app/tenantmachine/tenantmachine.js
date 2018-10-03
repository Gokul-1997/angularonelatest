'use strict';

angular.module('tenantmachine', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/tenantmachine', {
      templateUrl: 'tenantmachine/tenantmachine.html',
      controller: 'tenantmachineCtrl'
    });
  }])

  .controller('tenantmachineCtrl', function ($scope, $http, $location, $window, $rootScope) {




  	$scope.registerpayment = {
      id:null,device_ip:"",system_ip:"",vnc_id:"",installation_engineer:"",status:""
    };

  	

    $scope.registerpay = function () {


    	 var tenantsave = {tenant_id: $scope.id, device_ip:$scope.registerpayment.device_ip,system_ip:$scope.registerpayment.system_ip,
      	vnc_id:$scope.registerpayment.vnc_id,
      	installation_engineer:$scope.registerpayment.installation_engineer,status:$scope.registerpayment.status}


if ($scope.registerpayment.id == null){
                $http
                    ({
                        method: 'post',
                        url: $rootScope.api_url + 'api/v1/tenant_machine_details',
                        data: tenantsave
                    })

                    .success(function (data) {
                        if (data) {
                            alert("Registration completed");
                            $scope.payinit();
                            $(document).ready(function () {
                                $('#exampleModalLabel').modal('hide');
                            });
                        } else {
                            alert('Registration Failed');
                        }
                    });
}

else
    {
     
$http({
        method: 'put',
        url: $rootScope.api_url+'api/v1/tenant_machine_details/'+$scope.registerpayment.id,
        data: tenantsave  
      })
      
      .success(function(data) {  
        if(data){    
        alert("Updated Successfully");
       // $window.location.reload();
       $scope.payinit();
       $(document).ready(function () {
   $('#machine').modal('hide');
 });
        }else{      
        alert('Updation Failed');   
        }
      });
    }


         
            }






	$http({
        method: 'GET',
        url: $rootScope.api_url + 'api/v1/tentat_without_machine_detail'
      })
        .then(function (response) {
          $scope.tenantname = response.data;

          //console.log($scope.tenantname);
        })
        

$scope.tenantchanged = function(details){

	 //console.log(details);
      $scope.id = details.id;
      $scope.tenant_name = details.tenant_name;



}



 $scope.edit = function(id) {
  //alert(id);
var i;
   for(i in $scope.payment) {

            if($scope.payment[i].id == id) {
               var details_id=$scope.payment[i];
               $scope.registerpayment = angular.copy(details_id);
/*               console.log($scope.registerpayment);
*/            }
           
        }
        for (var k in $scope.tenantname) {
          if ($scope.tenantname[k].id == id.tenant_name) {
            $scope.selectedOption = $scope.tenantname[k];
          }

        }

        

    }


$scope.payinit=function(){

$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/tenant_machine_details'
  })
  .then(function(response){
    $scope.myLoader = false;
   $scope.payment = response.data; 
   
    })


//  console.log($scope.payment);
}


 $scope.cleandata=function(){

$scope.cleardata= { id:null,device_ip:"",system_ip:"",vnc_id:"",installation_engineer:"",status:""
  }

}



  })


