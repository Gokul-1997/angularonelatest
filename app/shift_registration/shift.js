'use strict';

angular.module('shift', ['ngRoute','ngSanitize','ui.bootstrap', 'mgcrea.ngStrap'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/shift_registration', {
    templateUrl: 'shift_registration/shift.html',
    controller: 'ShiftCtrl'
  });
}])

.controller('ShiftCtrl', ['$scope', '$http','$location','$rootScope','$window','$log','$timeout','$filter',
  function($scope, $http,$location,$rootScope,$window,$log,$timeout,$filter) {

//$scope.tenant_id=localStorage.getItem("tenant_id");

$scope.shiftregistration = {id: null,working_time:"",no_of_shift:"",day_start_time:"",working_time_dummy:"",day_start_time_dummy:"",tenant_id: $scope.tenant_id};
$scope.shiftform= function(){
// $scope.ntime="9:00 am"
$scope.working = $filter('date')($scope.shiftregistration.working_time_dummy, "HH:mm:ss");
$scope.day = $filter('date')($scope.shiftregistration.day_start_time_dummy, "hh:mma");
        var shiftregistration = {"working_time":$scope.working,"no_of_shift":$scope.shiftregistration.no_of_shift,"day_start_time":$scope.day,"working_time_dummy":$scope.shiftregistration.working_time_dummy,"day_start_time_dummy":$scope.shiftregistration.day_start_time_dummy,"tenant_id": $scope.shiftregistration.tenant_id};

if($scope.shiftregistration.id==null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'api/v1/shifts',
        data: shiftregistration
      })

      .success(function(data) {

        if(data){


        alert("Registration completed");
       /* $window.location.reload();*/

       $scope.shiftinit();
        }else{
        alert('Registration Failed');
        }
      });
}
else{

    $http
      ({
        method: 'put',
        url: $rootScope.api_url+'api/v1/shifts/'+$scope.shiftregistration.id,
        data: shiftregistration
      })

      .success(function(data) {

        if(data){
       alert("Updated Successfully");
/*        $window.location.reload();
*/    

$scope.shiftinit();

}else{
        alert('Updation Failed');
        }

});


}



    }





   $scope.shiftinit= function(){ 
$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/shifts?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
 $scope.shiftdetails= response.data;
  //console.log($rootScope.shiftdetails);
   //localStorage.setItem("sid",$scope.shiftdetails.id);
 //  localStorage.setItem("sno",$scope.shiftdetails.no_of_shift);







  $http({


    method:'GET',
    url:$rootScope.api_url+'api/v1/shifttransactions?shift_id='+$scope.shiftdetails.id

  })
  .then(function(response){
   $rootScope.shiftstrans = response.data;
    $scope.lenst= $rootScope.shiftstrans.length;
    if ($scope.lenst < $scope.shiftdetails.no_of_shift){

$scope.newshiftbutton='<button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalHorizontal1" title="New Registration" ng-click="cleandata1()"><span class="glyph-icon icon-plus"></span>  New</button>'

}
      })


 })
}





 $scope.cleandata= function() {
    $scope.shiftregistrat = {id: null,working_time:"",no_of_shift:"",day_start_time:"",tenant_id: $scope.tenant_id};
     $scope.shiftregistration = angular.copy($scope.shiftregistrat);
 }








 $scope.edit = function(id) {

     $scope.shiftregistration = angular.copy($scope.shiftdetails);
     console.log($scope.shiftregistration.working_time);
 }






$scope.delete = function(id) {

$http.delete($rootScope.api_url+'api/v1/shifts/'+id).success(function(data) {

        if(data){
      alert("Deleted Successfully");
     $window.location.reload();

       }else{
        alert('Delete Failed');
        }
      });
}










$scope.shifttransaction = {id:null,shift_start_time:"",shift_end_time:"",actual_working_hours:"",shift_id:null,shift_no:null,shift_start_time_dummy:"",shift_end_time_dummy:"",actual_working_hours_dummy:""};//,tenant_id: $scope.tenant_id};

$scope.newshifttrans= function(){

 $scope.daystart = $filter('date')($scope.shifttransaction.shift_start_time_dummy, "hh:mma");
  $scope.dayend = $filter('date')($scope.shifttransaction.shift_end_time_dummy, "hh:mma");
   $scope.work = $filter('date')($scope.shifttransaction.actual_working_hours_dummy, "HH:mm:ss");


if ($scope.lenst>0){
$scope.lshiftno=parseInt($scope.lenst)+1;
}else{

  $scope.lshiftno=1;
}


        var shifttransaction = {"shift_start_time":$scope.daystart,"shift_end_time": $scope.dayend,"actual_working_hours":$scope.work,
        "shift_id": $scope.shiftdetails.id, "shift_no": $scope.shifttransaction.shift_no,"shift_start_time_dummy":$scope.shifttransaction.shift_start_time_dummy,
        "shift_end_time_dummy":$scope.shifttransaction.shift_end_time_dummy,"actual_working_hours_dummy":$scope.shifttransaction.actual_working_hours_dummy};//,"tenant_id": $scope.shifttransaction.tenant_id};

if ($scope.shifttransaction.id==null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'api/v1/shifttransactions',
        data: shifttransaction
      })

      .success(function(data) {

        if(data){
        /*$window.location.reload();*/
       // $state.go('/company_registration');
        alert("Registration completed");
      /*$window.location.reload();*/
       $('#exampleModalLabel1').modal('hide');
      $scope.shiftinit(); 

        }else{
        alert('Registration Failed');
        }
      });
}else
{
    $http
      ({
        method: 'put',
        url: $rootScope.api_url+'api/v1/shifttransactions/'+$scope.shifttransaction.id,
        //$scope.shifttransaction.id,
        data: shifttransaction
      })

      .success(function(data) {

        if(data){

       // $state.go('/company_registration');
        alert("Updated Successfully");
         $('#exampleModalLabel1').modal('hide');
     /*$window.location.reload(); */ 
     $scope.shiftinit();      }else{
        alert('Updation Failed');
        }
      });
}
    }







$scope.breaktime=function(id){

localStorage.setItem("breaktime_id",id);
         $location.path('/breaktime');

}


$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/shifts?tenant_id='+$scope.tenant_id,
     })
  .then(function(response){
   $scope.shift_id_id = response.data;
   $scope.shiftid=  $scope.shift_id_id.id
    })











    $scope.cleandata1= function() {

$scope.shifttransact = {id:null,shift_start_time:"",shift_end_time:"",shift_id: $scope.shiftid,shift_no:null,tenant_id: $scope.tenant_id};


 $scope.shifttransaction = angular.copy($scope.shifttransact);
 }














    $scope.edit1 = function(id) {
var i;

   for(i in $rootScope.shiftstrans) {

            if($rootScope.shiftstrans[i].id == id) {
               var shifttrans_id=$rootScope.shiftstrans[i];
               $scope.shifttransaction = angular.copy(shifttrans_id);

               console.log($scope.shifttransaction);
            }

        }
    }

$scope.delete1 = function(id) {

$http.delete($rootScope.api_url+'api/v1/shifttransactions/'+id).success(function(data) {

        if(data){

       // $state.go('/company_registration');
alert("Deleted Successfully");
     /* $window.location.reload();*/
     $scope.shiftinit();
        }else{
        alert('Delete Failed');
        }
      });


}


}]).directive('bindHtmlCompile', function($compile) {
    return {
      restrict: "A",
      scope: {
        bindHtmlCompile: "="
      },
      link: function(scope, elem) {
        scope.$watch("bindHtmlCompile", function(newVal) {
          elem.html('');
          var newElem = angular.element(newVal);
          var compileNewElem = $compile(newElem)(scope.$parent);
          elem.append(compileNewElem);
        });
      }
    };
  });