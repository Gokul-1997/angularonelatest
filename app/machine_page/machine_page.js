'use strict';

angular.module('machines', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/machine', {
    templateUrl: 'machine_page/machine_page.html',
    controller: 'MachineCtrl'
  });
}])

.controller('MachineCtrl', function($scope,$http,$location,$rootScope,$timeout,$window,$filter) {

   $scope.date = new Date();
   $scope.momentYesterday=moment().subtract(1, 'day').format("YYYY-MM-DD");
   $scope.momentToday= moment(new Date()).format("YYYY-MM-DD");

                  $scope.myLoader = true;
                  $scope.percentageValue = 39;
                  $scope.MachineID=parseInt(localStorage.getItem("machine_id"));

                  $scope.tenant_id=localStorage.getItem("tenant_id");
                  $scope.username=localStorage.getItem("username");
                  $scope.roleforpage=localStorage.getItem("role_id");
                  $scope.useridforedit=localStorage.getItem("userid");
                 // $scope.Dateforreport=localStorage.getItem("datetoreport")
                  $scope.JobID;
                  $scope.xscale=[];
                  $scope.value=[];
                  $scope.pscale=[];
                  $scope.pvalue=[];



      $rootScope.mychartlable =["running","idle","stoped"];


      $scope.Timevalues="";
      $scope.timeMethod=function(time){        
           $scope.Timevalues=time;
           if(!angular.isUndefined(time)){
             var hms = $scope.Timevalues;
             var a = hms.split(':');
             var minutes = (+a[0]) * 60 + (+a[1]);
             return minutes;
           }                            
       }

      $rootScope.chartdestory=1;

      $http({
        method:'GET',
        url:$rootScope.api_url+'api/v1/machines/machine_details?machine_id='+$scope.MachineID})
        .then(function(response){ 
        $scope.machinenames = response.data;
        $scope.shiftsList=response.data.shifts;
        $scope.shiftside=$scope.shiftsList ;  
          $scope.shift = function(objs)
            {
                 $rootScope.shiftstype=objs.name; 
                 $rootScope.ShitfID=objs.id;  
                 console.log($rootScope.ShitfID);

            }
        })


        $scope.timeconvert=function(run){
            $scope.run = {minutes: run};
              if($scope.run.minutes < 60){
                  return ($scope.run.minutes) + 'm';        
              }
              else if($scope.run.minutes%60==0){
                  return ($scope.run.minutes-$scope.run.minutes%60)/60 + 'h';        
              }
              else{
                   return (($scope.run.minutes-$scope.run.minutes%60)/60 + 'h' + ' ' + $scope.run.minutes%60 + 'm');
              }
         }



   $scope.export = function() {
       html2canvas(document.getElementById('exportthis'), {
         onrendered: function(canvas) {
           var data = canvas.toDataURL();
           var docDefinition = {
             content: [{
               image: data,               
             }]
           };
           pdfMake.createPdf(docDefinition).download("test.pdf");
         }
       });
     }


 $scope.myJson =     {
      "type": "bar",
      "plot": {
        "background-color": "#F7941D"
      },
      "scale-x": {
        "labels": ["Availability", "Perform", "Quanlity"]
      },
      "scale-y": {
        "values": "0:100:10"
      },
      "series": [{
        "values": [55,65,60]
      }]
    }



   $scope.Hourstatus=2;
  // $scope.myLoader = true;
                 $http({
                 method:'GET',
                 url:$rootScope.api_url+'api/v1/shifttransactions/find_shift?tenant_id='+$scope.tenant_id})
                 .then(function(response){  
                  $rootScope.ShitfID=response.data.id; 
                  $scope.shiftdiff=response.data;

                    $scope.date = new Date();
        console.log( $scope.shiftdiff.start_noon);
        $scope.ss = $filter('date')($scope.date, "a");
        if($scope.shiftdiff.start_noon =='AM' && $scope.shiftdiff.end_noon == 'AM' &&  $scope.ss=='AM'){
       var yesterday = new Date( $scope.date.getTime() - (24*60*60*1000));
       $scope.date=yesterday;
       $rootScope.selectdate=moment().subtract(1, 'day').format("YYYY-MM-DD");;
        }

                         $http({
                         method:'GET',
      url:$rootScope.api_url+'api/v1/machines/machine_log_status?machine_id='+$scope.MachineID+'&shifttransaction_id='+$rootScope.ShitfID + '&date=' + $rootScope.selectdate})
                        .then(function(response){                     
                              $scope.MachineReport = response.data;
                           //   $scope.myLoader = false;
                              $scope.Status =$scope.MachineReport.machine_status_report; 
                              $scope.downchart=$scope.MachineReport.downtime;
                              $scope.productionchart=$scope.MachineReport.production;  
                              $scope.jobdesc=$scope.MachineReport.job_details;

                              $scope.DataReport=$scope.MachineReport.data_status;
                              $scope.ShiftTime=$scope.MachineReport.start_time+"-"+$scope.MachineReport.end_time;
                              if($scope.DataReport==true){   
                                $scope.hourStatus=2;                            
                                $scope.Piechart($scope.MachineID,$scope.MachineReport);
                              }else{
                                $scope.hourStatus=1;
                                 $scope.Piechart($scope.MachineID,$scope.MachineReport);
                              }

                 
                                //Line chart Get Values
                                  $rootScope.linechart_time=[];
                                  $rootScope.linechart_downtime=[];
                                  $rootScope.linechart_partscount=[];
                                  $rootScope.linechart_runtime=[];
                                  $rootScope.linechart_stoptime=[];
                             
                                 $rootScope.machine_status = response.data;
                                 for( i in $rootScope.machine_status.downtime){
                                  $rootScope.linechart_time.push($rootScope.machine_status.downtime[i].time);
                                  $rootScope.linechart_downtime.push($rootScope.machine_status.downtime[i].downtime);

                                 }
                                  for( i in $rootScope.machine_status.production){
                                  $rootScope.linechart_partscount.push($rootScope.machine_status.production[i].parts_count);

                                 }
                                  for( i in $rootScope.machine_status.runtime){
                                  $rootScope.linechart_runtime.push($rootScope.machine_status.runtime[i].runtime);

                                 }
                                  for( i in $rootScope.machine_status.stoptime){

                                  $rootScope.linechart_stoptime.push($rootScope.machine_status.stoptime[i].stoptime);

                                 }
                                 
                                 $rootScope.time_split=$rootScope.machine_status.time_split;                                              


                             $scope.hoursplit=$scope.MachineReport.time_split;
                             $scope.hoursplitList=$scope.MachineReport.time_split;
                             $scope.hoursplitside=$scope.hoursplitList ;  
                                $scope.hoursplit = function(obj)
                                  {
                                      $scope.Hourstatus=1;
                                    
                                    if(obj!=null){
                                       if($rootScope.chartdestory==2){
                                              $rootScope.pieChartExample.destroy();
                                              $rootScope.lineChartExample.destroy();
                                           }
                                      
                                       $rootScope.hoursplittype=obj.time_details; 
                                         $scope.hourscal();
                                       }
                                  }

                                  $scope.Linechart();
                                  $scope.bar();
                              }) 
                })
                          

                        



                 $scope.GO=function(selectdates){
                  $scope.myLoader = true;
                  $scope.showdrop=1;
                  $scope.Hourstatus=2;


                            $rootScope.selectdate=selectdates;
                              $scope.date = new Date();
       				 console.log( $scope.shiftdiff.start_noon);
			       	 $scope.ss = $filter('date')($scope.date, "a");
			       	 if($scope.shiftdiff.start_noon =='AM' && $scope.shiftdiff.end_noon == 'AM' &&  $scope.ss=='AM'){
			       	var yesterday = new Date( $scope.date.getTime() - (24*60*60*1000));
			      	 $scope.date=yesterday;
			    	   $rootScope.selectdate=moment().subtract(1, 'day').format("YYYY-MM-DD");;
			            }
                            var MachineID=localStorage.getItem("MachineID");                      

                            if($rootScope.shiftstype==""){
                                var alertPopup2 =$ionicPopup.alert({
                                  title: "Error",
                                  content: "Please enter your Shift"
                                })                         
                            }else{

                                      if($rootScope.chartdestory==2){
                                          $rootScope.pieChartExample.destroy();
                                           $rootScope.lineChartExample.destroy(); 
                                       }                                   
                                        
                                    $http({
                                    method:'GET',
                                    url:$rootScope.api_url+'api/v1/machines/machine_log_status?machine_id='+$scope.MachineID+'&shifttransaction_id='+$rootScope.ShitfID+'&date='+$rootScope.selectdate})
                                    .then(function(response){                                              
                                          $scope.myLoader = false;
                                          $scope.MachineReport = response.data; 
                                          console.log($scope.MachineReport.time_split);   

                                          $scope.Status =$scope.MachineReport.machine_status_report; 
                                          $scope.downchart=$scope.MachineReport.downtime;
                                          $scope.productionchart=$scope.MachineReport.production;  
                                          $scope.jobdesc=$scope.MachineReport.job_details;

                                          $scope.DataReport=$scope.MachineReport.data_status;
                                          $scope.ShiftTime=$scope.MachineReport.start_time+"-"+$scope.MachineReport.end_time;
                                          if($scope.DataReport==true){      
                                              $scope.hourStatus=2;                                          
                                            $scope.Piechart($scope.MachineID,$scope.MachineReport);
                                          }else{
                                              $scope.hourStatus=1;
                                            $scope.Piechart($scope.MachineID,$scope.MachineReport);
                                          }


                                           $rootScope.linechart_time=[];
                                            $rootScope.linechart_downtime=[];
                                            $rootScope.linechart_partscount=[];
                                            $rootScope.linechart_runtime=[];
                                            $rootScope.linechart_stoptime=[];
                                       
                                           $rootScope.machine_status = response.data;
                                           for( i in $rootScope.machine_status.downtime){
                                            $rootScope.linechart_time.push($rootScope.machine_status.downtime[i].time);
                                            $rootScope.linechart_downtime.push($rootScope.machine_status.downtime[i].downtime);

                                           }
                                           for( i in $rootScope.machine_status.production){
                                            $rootScope.linechart_partscount.push($rootScope.machine_status.production[i].parts_count);

                                           }                                           
					 for( i in $rootScope.machine_status.runtime){
                                             $rootScope.linechart_runtime.push($rootScope.machine_status.runtime[i].runtime);
                                           }
                                         for( i in $rootScope.machine_status.stoptime){
                                             $rootScope.linechart_stoptime.push($rootScope.machine_status.stoptime[i].stoptime);
                                          }
                                           $rootScope.time_split=$rootScope.machine_status.time_split;     
                                              $scope.hoursplit=$scope.MachineReport.time_split;
                                               $scope.hoursplitList=$scope.MachineReport.time_split;
                                               $scope.hoursplitside=$scope.hoursplitList ;  
                                                  $scope.hoursplit = function(obj)
                                                    {
                                                        $scope.Hourstatus=1;
                                                      if(obj!=null){
                                                         if($rootScope.chartdestory==2){
                                                                $rootScope.pieChartExample.destroy(); 
                                                                  $rootScope.lineChartExample.destroy(); 
                                                             }
                                                         
                                                         $rootScope.hoursplittype=obj.time_details; 
                                                           $scope.hourscal();
                                                          
                                                         }
                                                    }
                                                    $scope.Linechart();
                                                   $scope.bar();                        

                                  })
                                  
                                }
                               
                             }


                             $scope.hourscal=function(){

                               if($rootScope.hoursplittype!=undefined){

                                  $http({
                                     method:'GET',
                                     url:$rootScope.api_url+'api/v1/machines/hour_status?machine_id='+$scope.MachineID+'&shifttransaction_id='+$rootScope.ShitfID+'&time='+$rootScope.hoursplittype+'&date='+$rootScope.selectdate})
                                    .then(function(response){
                                      $scope.MachineReport=response.data[5];
                                       $rootScope.MachineReportTimes=response.data;
                                       $rootScope.NoDatas=response.data;
                                      console.log(response.data);  

                                      if(response.data!=false){
                                        $scope.hourStatus=2;
                                      $scope.Piechart($scope.MachineID,$scope.MachineReport);   
                                      }else{
                                        $scope.hourStatus=1;
                                      }
                                   })

                                     $scope.Linechart();
                                     $scope.bar(); 
                                }                         

                        } 



  

               $http({
            method:'GET',
            url:$rootScope.api_url+'api/v1/machines/'+$scope.MachineID
            })
            .then(function(response){
             // $scope.myLoader = false;
            $rootScope.singlemachines = response.data;
            })


            var i;
            for (i in $scope.downchart) {
              $rootScope.xscale.push($scope.downchart[i].time);
              $rootScope.value.push($scope.downchart[i].downtime);
            }

             var j;
            for (j in $scope.productionchart) {
              $rootScope.pscale.push($scope.productionchart[j].time);
              $rootScope.pvalue.push($scope.productionchart[j].parts_count);
            }

        
            /* chart*/


            $scope.Piechart=function(MachineID,MachineReport){

                  
                                var run=$scope.timeMethod(MachineReport.total_run_time);
                                var idle=$scope.timeMethod(MachineReport.total_ideal_time);
                                var stop=$scope.timeMethod(MachineReport.total_stop_time);
                                var remaing=$scope.timeMethod(MachineReport.remaining_time);
                              

                                $scope.remaning = {minutes: remaing};
                                    
                                if($scope.remaning.minutes < 60){
                                    $scope.remaning.result = ($scope.remaning.minutes) + 'm';        
                                }
                                else if($scope.remaning.minutes%60==0){
                                    $scope.remaning.result = ($scope.remaning.minutes-$scope.remaning.minutes%60)/60 + 'h';        
                                }
                                else{
                                     $scope.remaning.result = (($scope.remaning.minutes-$scope.remaning.minutes%60)/60 + 'h' + ' ' + $scope.remaning.minutes%60 + 'm');
                                }                          

                                  $rootScope.RemainigResults=$scope.remaning.result;

                      var brandPrimary = '#f7941e';
                      var machineRunning = '#2cbe63';

                              var data = {
                            labels: [
                              "Running",
                              "Idle",
                              "Stopped",
                              "Remaining"
                            ],
                            datasets: [
                              {
                                data: [run,
                                       idle,
                                       stop,
                                       remaing],
                                backgroundColor: [
                                  "#6bd191",
                                  "#eaab5b",
                                  "#ed6661",
                                  "#757575"
                                ],
                                hoverBackgroundColor: [
                                  "#6bd191",
                                  "#eaab5b",
                                  "#ed6661",
                                  "#757575"
                                ]
                              }]
                          };
               $rootScope.chartdestory=2;
                      var PIECHARTEXMPLE    = $('#pieChartExample');
                      $rootScope.pieChartExample = new Chart(PIECHARTEXMPLE, {
                          type: 'doughnut',
                          data: data,
                          options: {
                          responsive: true,                                  
                           
                            tooltips:{
                              enabled:false
                            }
                          }
                      });

                                $rootScope.IDStatus=3;
                                $scope.myLoader = true;
                                $http({
                                method:'GET',
                                url:$rootScope.api_url+'api/v1/machines/hour_wise_detail?shifttransaction_id='+$rootScope.ShitfID+'&date='+$rootScope.selectdate+'&machine_id='+$scope.MachineID+'&machine_status='+$rootScope.IDStatus})
                                .then(function(response){
                                  $scope.myLoader = false;
                                $scope.MachineTimeDetails=response.data;
                                })

                      }


                      $rootScope.IDStatus=3;
                           $scope.openModal = function(id) {                          
                           $scope.myLoader = true;
                             if($scope.Hourstatus!=1){
                               $rootScope.IDStatus=id; 
                               $http({
                                method:'GET',
                                url:$rootScope.api_url+'api/v1/machines/hour_wise_detail?shifttransaction_id='+$rootScope.ShitfID+'&date='+$rootScope.selectdate+'&machine_id='+$scope.MachineID+'&machine_status='+$rootScope.IDStatus})
                                .then(function(response){
                                $scope.myLoader = false;
                                $scope.MachineTimeDetails=response.data;
                                })  
                              }
                         if($scope.Hourstatus==1){
                               if($rootScope.hoursplittype!=undefined){

                                  $http({
                                     method:'GET',
                                     url:$rootScope.api_url+'api/v1/machines/hour_status?machine_id='+$scope.MachineID+'&shifttransaction_id='+$rootScope.ShitfID+'&time='+$rootScope.hoursplittype+'&date='+$rootScope.selectdate})
                                    .then(function(response){
                                      $rootScope.IDStatus=id; 
                                      $rootScope.MachineReport=response.data[5];
                                       $rootScope.MachineReportTimes=response.data;
                                       $rootScope.NoDatas=response.data;
                          

                                      if(response.data!=false){
                                        $scope.hourStatus=2;
                                      }else{
                                        $scope.hourStatus=1;
                                      }
                                   }) 
                                }

                            }    

                            }
                        




            $scope.Linechart=function(){
console.log($rootScope.linechart_stoptime);
                         var LINECHARTEXMPLE   = $('#lineChartExample'),
                              BARCHARTEXMPLE    = $('#barChartExample');
                        
                         $rootScope.lineChartExample = new Chart(LINECHARTEXMPLE, {
                              type: 'line',
                              data: {
                                  labels:  $rootScope.linechart_time,
                                  datasets: [
                                      {
                                  label: "Parts produced",
                                   fill: false,
                                  lineTension: 0.1,
                                  backgroundColor: "rgba(75,192,192,0.5)",
                                  borderColor: "rgba(75,192,192,1)",
                                  borderCapStyle: 'butt',
                                  borderDash: [],
                                  borderDashOffset: 0.0,
                                  borderJoinStyle: 'miter',
                                  pointBorderColor: "rgba(75,192,192,1)",
                                  pointBackgroundColor: "#fff",
                                  pointBorderWidth: 1,
                                  pointHoverRadius: 5,
                                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                  pointHoverBorderColor: "rgba(220,220,220,1)",
                                  pointHoverBorderWidth: 2,
                                  pointRadius: 5,
                                  pointHitRadius: 10,
                                  data: $rootScope.linechart_partscount,
                                  spanGaps: false
                              },
                              {
                                  label: "Idle",               
                                  fill: true,
                                  lineTension: 0.1,
                                  backgroundColor: "rgba(255,140,0,0.2)",
                                  borderColor: "#EAAB5B",
                                  borderCapStyle: 'butt',
                                  borderDash: [],
                                  borderDashOffset: 0.0,
                                  borderJoinStyle: 'miter',
                                  pointBorderColor: "#EAAB5B",
                                  pointBackgroundColor: "#fff",
                                  pointBorderWidth: 1,
                                  pointHoverRadius: 5,
                                  pointHoverBackgroundColor: "#EAAB5B",
                                  pointHoverBorderColor: "#EAAB5B",
                                  pointHoverBorderWidth: 2,
                                  pointRadius: 5,
                                  pointHitRadius: 10,
                                  data: $rootScope.linechart_downtime,
                                  spanGaps: false
                              },
                              {
                                  label: "Runtime",  
                                  fill: true,             
                                  lineTension: 0.1,
                                  backgroundColor: "rgba(0,255,0,0.3)",
                                  borderColor: "#6BD191",
                                  borderCapStyle: 'butt',
                                  borderDash: [],
                                  borderDashOffset: 0.0,
                                  borderJoinStyle: 'miter',
                                  pointBorderColor: "#6BD191",
                                  pointBackgroundColor: "#fff",
                                  pointBorderWidth: 1,
                                  pointHoverRadius: 5,
                                  pointHoverBackgroundColor: "#6BD191",
                                  pointHoverBorderColor: "#6BD191",
                                  pointHoverBorderWidth: 2,
                                  pointRadius: 5,
                                  pointHitRadius: 10,
                                  data: $rootScope.linechart_runtime,
                                  spanGaps: false
                              },
                              {
                                  label: "Stoptime",               
                                  fill: true,
                                   lineTension: 0.1,
                                  backgroundColor: "rgba(255,0,0,0.3)",
                                  borderColor: "#ED6661",
                                  borderCapStyle: 'butt',
                                  borderDash: [],
                                  borderDashOffset: 0.0,
                                  borderJoinStyle: 'miter',
                                  pointBorderColor: "#ED6661",
                                  pointBackgroundColor: "#fff",
                                  pointBorderWidth: 1,
                                  pointHoverRadius: 5,
                                  pointHoverBackgroundColor: "#ED6661",
                                  pointHoverBorderColor: "#ED6661",
                                  pointHoverBorderWidth: 2,
                                  pointRadius: 5,
                                  pointHitRadius: 10,
                                  data: $rootScope.linechart_stoptime,
                                  spanGaps: false
                              }
                          ]
                      }
                  })
          }



          $scope.bar=function(){

                var  BARCHARTEXMPLE    = $('#barChartExample');

                 var barChartExample = new Chart(BARCHARTEXMPLE, {
                        type: 'bar',
                        data: {
                            labels: ["OEE", "Availability", "Performance", "Quanlity"],
                            datasets: [
                                {
                             label: "Machine Status",
                             backgroundColor: [
                                'rgb(44,190,99)',
                                'rgba(247, 148, 30, 0.6)',
                                'rgb(236,85,80)',
                                'rgb(48,184,234)'
                            ],
                            borderColor: [
                                'rgb(44,190,99)',
                                'rgba(247, 148, 30, 1)',
                                'rgb(236,85,80)',
                                'rgb(48,184,234)'
                            ],
                            borderWidth: 1,
                            data: [65, 59, 80, 81],
                        },                       
                      ]
                    }
                  })

      
            $scope.myJson2 =     {
                  "type": "bar",
                  "plot": {
                    "background-color": "#555555"
                  },
                  "scale-x": {
                    "labels":$rootScope.xscale,
                    "max-items": 24,
                    "item":{
                  "font-size":10,
                  "font-family":"Georgia",
                  "font-color":"red",
                  "border-width":0,
                  "border-color":"red",
                  "background-color":"#ffe6e6",
                  "padding":"5%",
                  "angle":-90
                }
                  },
                
                  "series": [{
                    "values":$rootScope.value
                  }]
                }


            $scope.myJson3   =     {
                  "type": "bar",
                  "plot": {
                    "background-color": "#F7941D"
                  },
                  "scale-x": {
                    "labels": $rootScope.pscale,
                     "max-items": 24,
                    "item":{
                  "font-size":10,
                  "font-family":"Georgia",
                  "font-color":"red",
                  "border-width":0,
                  "border-color":"red",
                  "background-color":"#ffe6e6",
                  "padding":"5%",
                  "angle":-90
                }
                  },
                
                  "series": [{
                    "values": $rootScope.pvalue
                  }]
                }   

}

              
             
            $http({
                method:'GET',
                url:$rootScope.api_url+'api/v1/machines?tenant_id='+$scope.tenant_id
              })
              .then(function(response){
               // $scope.myLoader = false;
               $rootScope.allmachines = response.data;
                })
               

            $scope.goToSlide=function(status,start_time,end_time,color){
                    $scope.xstatus=status;
                    $scope.xstart_time=start_time;
                    $scope.xend_time=end_time;
                    $scope.xcolor=color;

                    if($scope.xstatus=="3"){
                        
                    $scope.imagerun="true";
                    $scope.imageidle="";
                    $scope.imagestop="";
                    $scope.imageunknown="";
                    }
                    else if($scope.xstatus==0){
                    $scope.imagerun="";
                    $scope.imageidle="true";
                    $scope.imagestop="";
                    $scope.imageunknown="";
                    }
                    else if($scope.xstatus==100){
                    $scope.imagerun="";
                    $scope.imageidle="";
                    $scope.imagestop="true";
                    $scope.imageunknown="";}
                    else
                    {
                        
                    $scope.imagerun="";
                    $scope.imageidle="";
                    $scope.imagestop="";
                    $scope.imageunknown="true";
                    }

            }

            $scope.jobwise={"parts_produced":"100","parts_remaining":"150"};

             
            $http({

                method:'GET',
                url:$rootScope.api_url+'api/v1/cncjobs?tenant_id='+$scope.tenant_id
              })
              .then(function(response){
               $rootScope.alljobs = response.data; 
                    })

            $http({

                method:'GET',
                url:$rootScope.api_url+'api/v1/shifts?tenant_id='+$scope.tenant_id
              })
              .then(function(response){
             $scope.shiftdetailfordrop= response.data; 

             $http({
                method:'GET',
                url:$rootScope.api_url+'api/v1/shifttransactions?shift_id='+ $scope.shiftdetailfordrop.id
              })
              .then(function(response){
               $rootScope.shiftstransfordrop = response.data; 
                
                  })
             })


            $scope.checkingmachineid=function(machine){
                $scope.MachineID=localStorage.setItem("machine_id", $scope.MachineID);
               $window.location.reload();
            }

            /*$scope.checkingshiftid=function(machine){
             
                $scope.ShiftID=localStorage.setItem("shift_idformp", $scope.ShiftID);
                $window.location.reload();
            }*/

           /* $scope.checkingdate=function(Dateforreport){
                $scope.Dateforreport=localStorage.setItem("datetoreport", $scope.Dateforreport)
                    $window.location.reload();
            }*/


            $scope.checkingjobid=function(machine){

             $http({
                   method:'GET',
                   url:$rootScope.api_url+'api/v1/machines/machine_log_status?machine_id='+$scope.MachineID+'$&shifttransaction_id='+$scope.ShiftID+'&&cncjob_id='+$scope.JobID
               })
                  .then(function(response){
                    if(response.data=="" ){
                      alert("There is no ID..!");
                       }else{
                  
            $scope.jobdesc=response.data.job_details;

                 }
                  })   
            }
        });
