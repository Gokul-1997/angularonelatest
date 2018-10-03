'use strict';

angular.module('install_details', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/install_details', {
            templateUrl: 'install_details/install_details.html',
            controller: 'install_detailsCtrl'
        });
    }])

    .controller('install_detailsCtrl', function ($scope, $http, $location, $window, $rootScope) {

       

        $scope.savedetails = { id: null, machines_installed: "", removed: "", installed_date: "", remarks: "", customer_feedback: "" };

        /*$scope.tenant=[];*/
        $scope.save = function () {



            if ($scope.savedetails.id == null) {
                // alert($scope.deviceregistration.role_id);
                $http
                    ({
                        method: 'post',
                        url: $rootScope.api_url + 'api/v1/installed_detail',
                        data: savedetails
                    })

                    .success(function (data) {
                        if (data) {
                            alert("Registration completed");
                            $scope.tenantinit();
                            $(document).ready(function () {
                                $('#exampleModalLabel').modal('hide');
                            });
                        } else {
                            alert('Registration Failed');
                        }
                    });
            } else {

                var putsavedetails = {
                    "machines_installed": $scope.savedetails.machines_installed, "removed": $scope.savedetails.removed, "installed_date": $scope.savedetails.installed_date, "customer_feedback": $scope.savedetails.customer_feedback,
                    "remarks": $scope.savedetails.remarks

                }

                $http
                    ({
                        method: 'put',
                        url: $rootScope.api_url + 'api/v1/installed_detail_update?id=' + $scope.savedetails.id,
                        data: putsavedetails
                    })

                    .success(function (data) {

                        if (data) {
                            alert("Updated Successfully");
                            $scope.tenantinit();
                        } else {
                            alert('Updation Failed');
                        }
                    });

            }


        }



        $scope.edit = function (id) {
            //alert(id);
          //  console.log($scope.tenant);
            var i;
            for (i in $scope.tenant) {

                if ($scope.tenant[i].id == id) {
                    var tenant_id = $scope.tenant[i];

                    $scope.savedetails = angular.copy(tenant_id);
                 //   console.log($scope.savedetails);
                }


            }
        }

        $scope.tenantinit = function () {
            $http({

                method: 'GET',
                url: $rootScope.api_url + 'api/v1/installed_detail'

            })
                .then(function (response) {

                    $scope.tenant = response.data;
                  //  console.log($scope.tenant);

                })

        }


$scope.tenantid = function(id,name){
    

$rootScope.paymenttype_id = id; 

localStorage.setItem("paymenttype_name",name);

//$rootScope.paymenttype_name = name;

$window.location = "/#!/tenantpayment_type"


}






    })