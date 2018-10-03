'use strict';

angular.module('tenantpayment_type', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/tenantpayment_type', {
      templateUrl: 'tenantpayment_type/tenantpayment_type.html',
      controller: 'tenantpayment_typeCtrl'
    });
  }])

  .controller('tenantpayment_typeCtrl', function ($scope, $http, $location, $window, $rootScope) {






$scope.payid=$rootScope.paymenttype_id;
/*$scope.payname=$rootScope.paymenttype_name;
*/
$scope.payname= localStorage.getItem("paymenttype_name");


//console.log($scope.ss)


$scope.paymentfile = {id:null,per_machine_cost:""
    };

$scope.paymentsave = function(){
	var savepayment = {tenant_id: $scope.payid, payment_type_id:$scope.payment_id,next_pay_date:$scope.paymentfile.next_pay_date,
    per_machine_cost:$scope.paymentfile.per_machine_cost}

//console.log(savepayment);


 $http
                    ({
                        method: 'post',
                        url: $rootScope.api_url + 'api/v1/tenant_payment',
                        data: savepayment
                    })

                    .success(function (data) {
                        if (data) {
                            alert("Registration completed");
                      

$http({
        method: 'GET',
        url: $rootScope.api_url + 'api/v1/tenant_payments?id=' + $scope.payid 
      })
        .then(function (response) {
          $scope.details= response.data;

         // console.log($scope.details);
        })
                            $(document).ready(function () {
                                $('#exampleModalLabel').modal('hide');
                            });
                        } else {
                            alert('Registration Failed');
                        }
                    });

}




$scope.paymentinit = function(){
$http({
        method: 'GET',
        url: $rootScope.api_url + 'api/v1/tentat_without_machine_detail'
      })
        .then(function (response) {
          $scope.paymenttype = response.data;

          //console.log($scope.paymenttype);
        })
    



$http({
        method: 'GET',
        url: $rootScope.api_url + 'api/v1/payment_type'
      })
        .then(function (response) {
          $scope.paymentmodel = response.data;

          //console.log($scope.paymentmodel);
        })


$http({
        method: 'GET',
        url: $rootScope.api_url + 'api/v1/tenant_payments?id=' +$scope.payid
      })
        .then(function (response) {
          $scope.details= response.data;

         // console.log($scope.details);
        })

}


$scope.paymentchange = function(details){
	// console.log(details.id);
	$scope.tenant_id = details.id;
      $scope.tenant_name = details.tenant_name;
}


    

    $scope.payment = function (type){

$scope.payment_id = type.id;
$scope.payment_type = type.payment_type;





    }



    




  })