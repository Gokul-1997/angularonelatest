'use strict';

angular.module('register_tenant', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/register_tenant', {
      templateUrl: 'register_tenant/register_tenant.html',
      controller: 'register_tenantCtrl'
    });
  }])

  .controller('register_tenantCtrl', function ($scope, $http, $location, $window, $rootScope) {

   

    $scope.myLoader = true;

    $scope.tenant_id = localStorage.getItem("tenant_id");
    $rootScope.tenant = $scope.tenant_id;
    $scope.savemachine = [];

    $scope.newregister = {
      id: "", tenant_name: "", first_name: "", last_name: "", email: "",password:"", phone_number: "", city: "", state: "", country: "", address_line1: "", pincode: "", remarks: "",
      rs_total: "", rj_total: "", total_machine: ""
    };




    $scope.deviceinit = function () {

      $http({

        method: 'GET',
        url: $rootScope.api_url + 'api/v1/companies'

      })
        .then(function (response) {

          $scope.deviceres = response.data;

        })

    }





    $scope.savepayment = function () {


      var newtenant = {
        "company": {
          "tenant_name": $scope.newregister.tenant_name, "first_name": $scope.newregister.first_name,
          "last_name": $scope.newregister.last_name,
          "email": $scope.newregister.email,"password":$scope.newregister.password,
           "phone_number": $scope.newregister.phone_number, "city": $scope.newregister.city, "state": $scope.newregister.state, "country": $scope.newregister.country, "address_line1": $scope.newregister.address_line1, "pincode": $scope.newregister.pincode, "remarks": $scope.newregister.remarks, "rs_total": $scope.rs_count1, "rj_total": $scope.rj_count1, "total_machine": $scope.total1,
          "cnc_machine_types_attributes": $scope.savemachine
        }
      }


      //console.log(newtenant);

      if ($scope.newregister.id == null) {
        $http
          ({
            method: 'post',
            url: $rootScope.api_url + 'api/v1/companies',
            data: newtenant


          })

          .success(function (data) {
            $scope.deviceinit();

            alert("Registration completed");

          });
      } else {
        $http
          ({
            method: 'put',
            url: $rootScope.api_url + 'api/v1/companies/' + $scope.newregister.id,
            data: newtenant
          })

          .success(function (data) {
            $scope.deviceinit();
            alert("Updated Successfully");
            $scope.cleandata();

          });
      }


    }




    $scope.edit = function (id) {
     // alert(id);

      $scope.selectedOption = "";
      $scope.rj_count = "";
      $scope.rs_count = "";
      var i;
      for (i in $scope.deviceres) {

        if ($scope.deviceres[i].id == id.id) {
          //alert(id);
          var deviceres_id = $scope.deviceres[i];
          $scope.newregister = angular.copy(deviceres_id);
        }

      }
      $scope.savemachine = [];
      for (var l in $scope.newregister.cnc_machine_types) {

        var data = {"cnc_controler_id": $scope.newregister.cnc_machine_types[l].cnc_controler_id,
         "controller_name": "", "rj_count": $scope.newregister.cnc_machine_types[l].rj_count,
          "rs_count": $scope.newregister.cnc_machine_types[l].rs_count }
        $scope.savemachine.push(data);
      }


    } 


 $scope.remove = function (data,index) {
      alert(index);
      $scope.savemachine.splice(index, 1);
    };




/*
        $scope.delete = function(id) {
     if ($window.confirm("Please confirm?")) {
    $http.delete($rootScope.api_url+'api/v1/companies/'+id).success(function(data) {
     // console.log(data);
             $scope.deviceinit();

    alert("Deleted Successfully");

          });
    }




            }
*/


    $scope.controllerinit = function () {
      $http({
        method: 'GET',
        url: $rootScope.api_url + 'api/v1/machine_controllers'
      })
        .then(function (response) {
          $scope.controller = response.data;
        })

    }

    $scope.changed = function (details) {
      //console.log(details);
      $scope.id = details.id;
      $scope.controller_name = details.controller_name;

    }






    $scope.machinetotal = function () {
    

console.log($scope.cnc_id);




      var machine = { "cnc_controler_id": $scope.id, "controller_name": $scope.controller_name, 
      "rj_count": $scope.rj_count, "rs_count": $scope.rs_count }
      $scope.controller_name = $scope.rj_count + $scope.rj_count;

     // console.log(machine);



      $scope.rj_count1 = 0;
      $scope.rs_count1 = 0;
      $scope.total = 0;
      $scope.savemachine.push(machine);
      for (var n in $scope.savemachine) {
        $scope.rj_count1 += $scope.savemachine[n].rj_count;
        $scope.rs_count1 += $scope.savemachine[n].rs_count;

      }

      //console.log($scope.savemachine);
      $scope.total1 = $scope.rj_count1 + $scope.rs_count1;

      /*  console.log(machine);
      */
      $scope.rj_count = "";
      $scope.rs_count = "";

            


    }


    $scope.machineedit = function (c_name) {


      $scope.selectedOption = "";
      $scope.rj_count = "";
      $scope.rs_count = "";
     $scope.rj_count1 = "";
     $scope.rs_count1 = "";



      for (var j in $scope.savemachine) {

        if ($scope.savemachine[j].id == c_name.id) {
          $scope.cnc_id = $scope.savemachine[j].cnc_controler_id;

          $scope.rj_count = $scope.savemachine[j].rj_count;
          $scope.rs_count = $scope.savemachine[j].rs_count;
          //$scope.c_id=$scope.savemachine[j].cnc_machine_types[0].
                 }
        for (var k in $scope.controller) {
          if ($scope.controller[k].id == c_name.cnc_controler_id) {
            $scope.selectedOption = $scope.controller[k];
          }

        }


      }





    }

  

    $scope.cleandata = function () {
      $scope.savemachine = [];
      $scope.cleardata = {id:null,company_name: "", email: "", phone_number: "", address_line1: "", address_line2: "", 
      status: "", remarks: "",is_tenant: ""};
      $scope.newregister = angular.copy($scope.cleardata);
    }





$scope.create_tenant = function(tenant){
  

$http({

    method:'GET',
    url: $rootScope.api_url+'api/v1/tenant_company?id='+tenant
   
  })
  .then(function(response){ 
   
   $scope.tenants = response.data; 
   $scope.deviceinit();
   
})


}




    


  })