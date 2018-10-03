'use strict';

angular.module('comp', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/company_registration', {
    templateUrl: 'company_registration/company_registration.html',
    controller: 'Company_registrationCtrl'
  });
}])

.controller('Company_registrationCtrl', ['$scope','$http','$location','$rootScope', function($scope,$http,$location,$rootScope) {

 
}]);


