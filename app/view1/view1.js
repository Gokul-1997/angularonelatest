'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'view1Ctrl'
  });
}])

.controller('view1Ctrl', ['$scope','$http','$location','$rootScope','$timeout','$window', function($scope,$http,$location,$rootScope,$timeout,$window) {

}]);
