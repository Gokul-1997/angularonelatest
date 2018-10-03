'use strict';

angular.module('device', ['ngRoute'])


    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/device', {
            templateUrl: 'device/device.html',
            controller: 'DeviceCtrl'
        });
    }])

    .controller('DeviceCtrl', ['$scope', '$http', '$location', '$window', '$rootScope', function ($scope, $http, $location, $window, $rootScope) {

        $scope.myLoader = true;


        $scope.deviceregistration = {
            id: null,
            device_name: "",
            description: "",
            purchase_date: "",
            created_by: localStorage.getItem("username"),
            is_active: true
        };
        $scope.devicename = localStorage.getItem("devicename");
        $scope.deviceForm = function () {



            var deviceregistration = {

                device: {
                    device_name: $scope.deviceregistration.device_name,
                    description: $scope.deviceregistration.description,
                    purchase_date: $scope.deviceregistration.purchase_date,
                    created_by: $scope.deviceregistration.created_by,
                    is_active: true
                }
            };
            if ($scope.deviceregistration.id == null) {
                // alert($scope.deviceregistration.role_id);
                $http
                    ({
                        method: 'post',
                        url: $rootScope.api_url + 'api/v1/devices',
                        data: deviceregistration
                    })

                    .success(function (data) {

                        if (data) {

                            $scope.deviceregistration = "";

                            alert("Registration completed");
                            $scope.deviceinit();
                            $(document).ready(function () {
                                $('#exampleModalLabel').modal('hide');
                            });
                        } else {
                            alert('Registration Failed');
                        }
                    });
            } else {

                $http
                    ({
                        method: 'put',
                        url: $rootScope.api_url + 'api/v1/devices/' + $scope.deviceregistration.id,
                        data: deviceregistration
                    })

                    .success(function (data) {

                        if (data) {
                            alert("Updated Successfully");
                            $scope.deviceinit();
                        } else {
                            alert('Updation Failed');
                        }
                    });

            }

        }


        $scope.deviceinit = function () {

            $http({

                    method: 'GET',
                    url: $rootScope.api_url + 'api/v1/devices'
                })
                .then(function (response) {
                    $scope.myLoader = false;
                    $rootScope.devices = response.data;

                })
        }

        $scope.cleandata = function () {

            $scope.cleardata = {
                id: null,
                device_name: "",
                description: "",
                purchase_date: "",
                created_by: localStorage.getItem("username"),
                is_active: true
            };
            $scope.deviceregistration = angular.copy($scope.cleardata);
        }

        $scope.edit = function (id) {
            var i;
            for (i in $rootScope.devices) {

                if ($rootScope.devices[i].id == id) {
                    var device_id = $rootScope.devices[i];
                    $scope.deviceregistration = angular.copy(device_id);
                }

            }
        }

        $scope.delete = function (id) {
            if ($window.confirm("Please confirm?")) {
                $http.delete($rootScope.api_url + 'api/v1/devices/' + id).success(function (data) {

                    if (data) {

                        alert("Deleted Successfully");
                        $scope.deviceinit();
                    } else {
                        alert('Delete Failed');
                    }
                });
            }

        }





        ////Device mapping



        $scope.mappingdeviceregistration = {
            id: null,
            device_id: "",
            tenant_id: "",
            removing_date: "",
            installing_date: "",
            number_of_machine: "",
            reasons: "",
            created_by: localStorage.getItem("username"),
            is_active: true

        };


        $scope.mappingdeviceForm = function () {

            var mappingdeviceregistration = {

                device_mapping: {
                    id: null,
                    device_id: $scope.mappingdeviceregistration.device_id,
                    removing_date: $scope.mappingdeviceregistration.removing_date,
                    tenant_id: $scope.mappingdeviceregistration.tenant_id,
                    installing_date: $scope.mappingdeviceregistration.installing_date,
                    number_of_machine: $scope.mappingdeviceregistration.number_of_machine,
                    reasons: $scope.mappingdeviceregistration.reasons,
                    created_by: localStorage.getItem("username"),
                    is_active: true
                }
            };
            if ($scope.mappingdeviceregistration.id == null) {
                // alert($scope.deviceregistration.role_id);
                $http
                    ({
                        method: 'post',
                        url: $rootScope.api_url + 'api/v1/device_mappings',
                        data: mappingdeviceregistration
                    })

                    .success(function (data) {

                        if (data) {

                            $scope.mappingdeviceregistration = "";

                            alert("Registration completed");
                            $scope.mappingdeviceinit();
                            $(document).ready(function () {
                                $('#exampleModalLabel1').modal('hide');
                            });
                        } else {
                            alert('Registration Failed');
                        }
                    });
            } else {

                if( $scope.mappingdeviceregistration.removing_date == ""){
                   alert("Please Select Remove Date");
                   return;
                }

                $http
                    ({
                        method: 'put',
                        url: $rootScope.api_url + 'api/v1/device_mappings/' + $scope.mappingdeviceregistration.id,
                        data: mappingdeviceregistration
                    })

                    .success(function (data) {

                        if (data) {
                            alert("Updated Successfully");
                            $scope.mappingdeviceinit();
                            $(document).ready(function () {
                                $('#exampleModalLabel1').modal('hide');
                            });
                        } else {
                            alert('Updation Failed');
                        }
                    });

            }

        }


        $scope.mappingdeviceinit = function () {
            $scope.editval=0;
            $http({

                    method: 'GET',
                    url: $rootScope.api_url + 'api/v1/device_mappings'
                })
                .then(function (response) {
                    $scope.myLoader = false;
                    $rootScope.mappingdevice = response.data;

                })

            $http({

                    method: 'GET',
                    url: $rootScope.api_url + 'api/v1/active_tenant'
                })
                .then(function (response) {

                    $scope.tenantList = response.data;

                })

            $http({

                    method: 'GET',
                    url: $rootScope.api_url + 'api/v1/avialable_device'
                })
                .then(function (response) {
                    $scope.deviceList = response.data;

                })
        }

        $scope.mappingdeviceclear=function(){ 
        $scope.mappingdeviceregistration = {
            id: null,
            device_id: "",
            tenant_id: "",
            removing_date: "",
            installing_date: "",
            number_of_machine: "",
            reasons: "",
            created_by: localStorage.getItem("username"),
            is_active: true
        }
    }

        $scope.mappingdeviceedit = function (id) {
            $scope.editval=1;
            var i;
            for (i in $rootScope.mappingdevice) {

                if ($rootScope.mappingdevice[i].id == id) {
                    var device_id = $rootScope.mappingdevice[i];
                    $scope.mappingdeviceregistration = angular.copy(device_id);
                    $scope.mappingdeviceregistration.device_id = device_id.device.id
                    $scope.mappingdeviceregistration.tenant_id = device_id.tenant.id
                    console.log($scope.mappingdeviceregistration);
                }

            }
        }


    }]);