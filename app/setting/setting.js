'use strict';

angular.module('setting', ['ngRoute'])


    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/setting', {
            templateUrl: 'setting/setting.html',
            controller: 'SettingCtrl'
        });
    }])

    .controller('SettingCtrl', function ($scope, $http, $location, $window, $rootScope) {


        $scope.settingReg = {
            'shift_wise': true,
            'operator_wise': true,
            'date_wise': null,
            'hour_wise': null,
            'month_wise': null,
            'program_wise': null,
            'email_notification': null,
            'notification': null,
            'sms': null,
            'tenant_id': null
        }

$scope.config;
        $scope.tanentChange = function (t_id) {
            $scope.tenid = t_id;
            $http({
                    method: 'GET',
                    url: $rootScope.api_url + 'api/v1/setting_detail?tenant_id=' + t_id
                })
                .then(function (response) {
                    $scope.getRes = response.data;
                    var getRes = response.data;
                    console.log(response);
                    $scope.settingReg = {
                        'shift_wise': getRes.shift_wise,
                        'operator_wise': getRes.operator_wise,
                        'date_wise': getRes.date_wise,
                        'hour_wise': getRes.hour_wise,
                        'month_wise': getRes.month_wise,
                        'program_wise': getRes.program_wise,
                        'email_notification': getRes.email_notification,
                        'notification': getRes.notification,
                        'sms': getRes.sms,
                        'tenant_id': t_id
                    }
                }).catch(function (data) {
                    $scope.getRes=null;
                    $scope.settingReg = {
                        'shift_wise': true,
                        'operator_wise': true,
                        'date_wise': null,
                        'hour_wise': null,
                        'month_wise': null,
                        'program_wise': null,
                        'email_notification': null,
                        'notification': null,
                        'sms': null,
                        'tenant_id': null
                    }
                });
        }
        $scope.settingInit = function () {

            $http({

                    method: 'GET',
                    url: $rootScope.api_url + 'api/v1/active_tenant'
                })
                .then(function (response) {

                    $scope.tenantList = response.data;

                })

                $http({

                    method: 'GET',
                    url: $rootScope.api_url + 'api/v1/settings'
                })
                .then(function (response) {

                    $scope.settingslist = response.data;

                })

        }
        $scope.settingForm = function (postData) {

            var settingjson = {
                'setting': {
                    'shift_wise': postData.shift_wise,
                    'operator_wise': postData.operator_wise,
                    'date_wise': postData.date_wise,
                    'hour_wise': postData.hour_wise,
                    'month_wise': postData.month_wise,
                    'program_wise': postData.program_wise,
                    'email_notification': postData.email_notification,
                    'notification': postData.notification,
                    'sms': postData.sms,
                    'tenant_id': $scope.tenid
                }
            }

            // console.log($scope.getRes.id);
            if ($scope.getRes == null) {
                $http
                    ({
                        method: 'post',
                        url: $rootScope.api_url + 'api/v1/settings',
                        data: settingjson
                    })

                    .success(function (data) {
                       
                            alert("Updated Successfully ");
                            $scope.config=2;
                            $scope.settingInit();
                    }).error(function (error) {

                    });
            } else {

                $http
                    ({
                        method: 'put',
                        url: $rootScope.api_url + 'api/v1/settings/' + $scope.getRes.id,
                        data: settingjson
                    })

                    .success(function (data) {
                        if (data) {
                            alert("Updated Successfully ");
                        }
                        $scope.config=2;
                        $scope.settingInit();

                    }).error(function (error) {

                    });
            }
        }

    })