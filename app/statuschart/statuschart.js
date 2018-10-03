'use strict';

angular.module('statuschart', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/statuschart', {
            templateUrl: 'statuschart/statuschart.html',
            controller: 'StatuschartCtrl'
        });
    }])

    .controller('StatuschartCtrl', function ($scope, $http, $location, $window, $rootScope, $timeout, $interval, $filter) {

       
        $scope.MachineID;
        $scope.ShiftID;
        $scope.from_date;
        //$scope.tenant_id = localStorage.getItem("tenant_id");

        $scope.momentToday = moment(new Date()).format("YYYY-MM-DD");
        $scope.momentToday1 = moment().subtract(1, 'day').format("YYYY-MM-DD");


        $http({
            method: 'GET',
            url: $rootScope.api_url + 'api/v1/machines?tenant_id=' + $scope.tenant_id
        })
            .then(function (response) {
                $rootScope.allmachines = response.data;
            })


        $http({
            method: 'GET',
            url: $rootScope.api_url + 'api/v1/shifts?tenant_id=' + $scope.tenant_id
        })
            .then(function (response) {
                $scope.shiftdetailfordrop = response.data;

                $http({
                    method: 'GET',
                    url: $rootScope.api_url + 'api/v1/shifttransactions?shift_id=' + $scope.shiftdetailfordrop.id
                })
                    .then(function (response) {
                        $rootScope.shiftstransfordrop = response.data;

                    })
            })
//start to start

          
            $scope.imageshow=1;



            //start Endddd


        $scope.viewData = function () {
            $scope.myLoader = true;
            $scope.imageshow=2;

            //chart1

            $http({
                method: 'GET',
                url: $rootScope.api_url + 'api/v1/all_cycle_time_chart?machine_id=' + $scope.MachineID + '&shift_id=' + $scope.ShiftID + '&tenant_id=' + $scope.tenant_id + '&date=' + $scope.from_date
            })
                .then(function (response) {
                    $scope.myLoader = false;
                    $scope.allcycletime = response.data;
                    $scope.parts = [];
                    $scope.c_time = [];
                    $scope.pro_number = [];

                    for (var i in $scope.allcycletime) {
                        var part = i * 1 + 1;
                        $scope.parts.push(part);

                        var cycle1 = secondsToMinutes($scope.allcycletime[i].cycle_time);
                        var cycle = parseFloat(cycle1);
                       
                        var pro_number = $scope.allcycletime[i].program_number;
                        $scope.c_time.push(cycle);
                        $scope.pro_number.push(pro_number);


                    }
                    //  console.log($scope.parts);
                    console.log($scope.c_time);

                    var arr = $scope.pro_number
                    var uniqs = arr.reduce((acc, val) => {
                        //console.log(acc, val);
                        acc[val] = acc[val] === undefined ? 1 : acc[val] += 1;
                        return acc;
                    }, {});
                    //console.log(uniqs)
                    $scope.diffparts = uniqs;

                    Highcharts.chart('partcycle', {
                        chart: {
                            renderTo: 'container',
                            type: 'column',
                            options3d: {
                                enabled: true,
                                alpha: 15,
                                beta: 15,
                                depth: 50,
                                viewDistance: 25
                            }
                        },
                        title: {
                            text: 'Cycle Time Chart(Mins)'
                        },
                        subtitle: {
                            text: (Object.values($scope.diffparts)) + '(' + Object.keys($scope.diffparts) + ')',
                            style: {
                                color: "#f58632",
                                font: "14px"
                            }
                        },

                        xAxis: {

                            categories: ($scope.parts),
                            crosshair: true,
                            title: {
                                text: 'Parts Count'
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Time(min)'
                            },
                            stackLabels: {
                                enabled: true,
                                style: {
                                    fontWeight: 'bold',
                                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                                }
                            }
                        },
                        tooltip: {
                           // headerFormat: '',
                            // pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}:</td>' +
                            //     '<td style="padding:0"><b>{point.x},</b></td>'+'<td style="color:{series.color};padding:0">Time:</td>' +
                            //     '<td style="padding:0"><b>{point.y:.2f} Min</b></td></tr>',
                            // footerFormat: '</table>',
                            // shared: true,
                            // useHTML: true,
                                formatter: function() {
                                    return 'Parts count : <b>' + this.x + '</b>, Time <b>' + this.y + ' min </b>';
                
                            }
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            },
                            series: {
                                // pointWidth: 20
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        colors: ['#f58632'],
                        series: [{
                            name: 'Parts Count',
                            data: $scope.c_time,

                            dataLabels: {
                                enabled: true,
                                // rotation: -90,
                                color: '#292b2c',
                                align: 'center',
                                valueDecimals: 2,
                                format: '{point.y:.2f}', // one decimal
                                y: 0, // 10 pixels down from the top
                                style: {
                                    fontSize: '10px',
                                    fontWeight: 'normal',
                                    // fontFamily: 'Verdana, sans-serif'
                                }
                            },
                        }]
                    })
                })


            //chart2
            $http({
                method: 'GET',
                url: $rootScope.api_url + 'api/v1/hour_parts_count_chart?machine_id=' + $scope.MachineID + '&shift_id=' + $scope.ShiftID + '&tenant_id=' + $scope.tenant_id + '&date=' + $scope.from_date
            })
                .then(function (response) {
                    $scope.myLoader = false;
                    $scope.hour_parts = response.data;
                    // console.log( $scope.hour_parts);


                    Highcharts.chart('partwithhour', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Hour Wise Parts Count Chart(Nos)'
                        },
                        xAxis: {
                            categories: $scope.hour_parts.time,
                            title: {
                                text: 'Time(Hour)'
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Parts Count'
                            },
                            stackLabels: {
                                enabled: true,
                                style: {
                                    fontWeight: 'bold',
                                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                                }
                            }
                        },
                        legend: {
                            reversed: true
                        },
                        plotOptions: {
                            series: {
                                stacking: 'normal',
                                // dataLabels: {
                                //     enabled: true,
                                //     color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                                // }
                            }

                        },
                        credits: {
                            enabled: false
                        },
                        colors: ['#939496'],
                        series: [{
                            name: 'Parts Count',
                            data: $scope.hour_parts.parts_count

                        }]
                    });
                })




            //chart3
            $http({
                method: 'GET',
                url: $rootScope.api_url + 'api/v1/hour_machine_status_chart?machine_id=' + $scope.MachineID + '&shift_id=' + $scope.ShiftID + '&tenant_id=' + $scope.tenant_id + '&date=' + $scope.from_date
            })
                .then(function (response) {
                    $scope.myLoader = false;
                    $scope.hourwisemachine = response.data;
                    console.log($scope.hourwisemachine.run_time);
                    $scope.runarry = [];
                    $scope.idlearry = [];
                    $scope.stoparry = [];
                    $scope.noarry = [];

                    for (var data in $scope.hourwisemachine.run_time) {
                        var run = $scope.hourwisemachine.run_time[data] / 1;
                        //  var ss =parseFloat(secondsToMinutes(ss1));
                        $scope.runarry.push(run);
                        var idle = $scope.hourwisemachine.idle_time[data] / 1;
                        // var ss = parseFloat(secondsToMinutes(ss1));
                        $scope.idlearry.push(idle);
                        var stop = $scope.hourwisemachine.stop_time[data] / 1;
                        //  var ss = parseFloat(secondsToMinutes(ss1));
                        $scope.stoparry.push(stop);
                        var nodata = $scope.hourwisemachine.no_data[data] / 1;
                        //   var ss =  parseFloat(secondsToMinutes(ss1));
                        $scope.noarry.push(nodata);
                    }



                    for (var i in $scope.runarry) {
                        var num1 = $scope.runarry[i];
                        var num2 = $scope.idlearry[i];
                        var num3 = $scope.stoparry[i];

                        if (num1 >= num2 && num1 >= num3) {
                            $scope.runarry[i] += $scope.noarry[i];
                        } else if (num2 >= num1 && num2 >= num3) {
                            $scope.idlearry[i] += $scope.noarry[i];
                        } else if (num3 >= num1 && num3 >= num1) {
                            $scope.stoparry[i] += $scope.noarry[i];
                        }

                        if (num1 == 0 && num2 == 0 && num3 == 0) {
                            $scope.runarry[i] = 0;
                            $scope.idlearry[i] = 0;
                            $scope.stoparry[i] = 0;
                        }
                    }


                    $scope.runarry1 = [];
                    $scope.idlearry1 = [];
                    $scope.stoparry1 = [];
                    $scope.noarry = [];
                    for (var data in $scope.runarry) {
                        var run = parseFloat(secondsToMinutes($scope.runarry[data])) ;
                      //  var ss =parseFloat(secondsToMinutes(ss1));
                        $scope.runarry1.push(run);
                        var idle = parseFloat(secondsToMinutes($scope.idlearry[data]));
                       // var ss = parseFloat(secondsToMinutes(ss1));
                        $scope.idlearry1.push(idle);
                        var stop = parseFloat(secondsToMinutes($scope.stoparry[data]));
                      //  var ss = parseFloat(secondsToMinutes(ss1));
                        $scope.stoparry1.push(stop);
                      
                    }



                    Highcharts.chart('hourwise', {
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: 'Machine Status Chart'
                        },
                        xAxis: {
                            categories: $scope.hourwisemachine.time.reverse(),
                            title: {
                                text: 'Time(Hour)'
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Time(min)'
                            },
                            stackLabels: {
                                enabled: true,
                                style: {
                                    fontWeight: 'bold',
                                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                                },
                                formatter: function () {
                                    return Math.ceil(this.total) + 'm';
                                }
                            }
                        },
                        legend: {
                            reversed: true
                        },
                        plotOptions: {
                            series: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: true,
                                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                                    format: '{point.y:.0f}', // your label's value plus the percentage sign
                                    valueDecimals: 2
                                }
                            }

                        },
                        colors: ['#ec5550', '#e8a249', '#2cbe63'],
                        credits: {
                            enabled: false
                        },
                        series: [

                            {
                                name: 'Stop',
                                data: $scope.stoparry1.reverse()
                            }, {
                                name: 'Idle',
                                data: $scope.idlearry1.reverse()
                            }, {
                                name: 'Run',
                                data: $scope.runarry1.reverse()
                            },
                        ]
                    });


                })







            //chart4

            $http({
                method: 'GET',
                url: $rootScope.api_url + 'api/v1/hour_machine_utliz_chart?machine_id=' + $scope.MachineID + '&shift_id=' + $scope.ShiftID + '&tenant_id=' + $scope.tenant_id + '&date=' + $scope.from_date
            })
                .then(function (response) {
                    $scope.myLoader = false;
                    $scope.hourutilization = response.data;

                    // $scope.runarryul = [];
                    // for (var data in $scope.hourutilization.run_time) {
                    //     var ss1 = $scope.hourutilization.run_time[data];
                    //     var ss = Math.round(ss1);
                    //     $scope.runarryul.push(ss);
                    // }
                    // //console.log($scope.runarryul);    

                    // $scope.idlearryul = [];
                    // for (var data in $scope.hourutilization.idle_time) {
                    //     var ss1 = $scope.hourutilization.idle_time[data];
                    //     var ss = Math.round(ss1);
                    //     $scope.idlearryul.push(ss);
                    // }
                    // //console.log($scope.idlearryul);

                    // $scope.stoparryul = [];
                    // for (var data in $scope.hourutilization.stop_time) {
                    //     var ss1 = $scope.hourutilization.stop_time[data];
                    //     var ss = Math.round(ss1);
                    //     $scope.stoparryul.push(ss);
                    // }
                    // //console.log($scope.stoparryul);
                    // $scope.noarryul = [];
                    // for (var data in $scope.hourutilization.no_data) {
                    //     var ss1 = $scope.hourutilization.no_data[data];
                    //     var ss = Math.round(ss1);
                    //     $scope.noarryul.push(ss);
                    // }

                    // for (var i in $scope.runarryul) {
                    //     var num1 = $scope.runarryul[i];
                    //     var num2 = $scope.idlearryul[i];
                    //     var num3 = $scope.stoparryul[i];

                    //     if (num1 >= num2 && num1 >= num3) {
                    //         $scope.runarryul[i] += $scope.noarryul[i]
                    //     } else if (num2 >= num1 && num2 >= num3) {
                    //         $scope.idlearryul[i] += $scope.noarryul[i]
                    //     } else if (num3 >= num1 && num3 >= num1) {
                    //         $scope.stoparryul[i] += $scope.noarryul[i]

                    //     }

                    //     if (num1 == 0 && num2 == 0 && num3 == 0) {
                    //         $scope.runarryul[i] = 0;
                    //         $scope.idlearryul[i] = 0;
                    //         $scope.stoparryul[i] = 0;
                    //     }

                    // }


                    $scope.runarryul = [];
                    $scope.idlearryul = [];
                    $scope.stoparryul = [];
                    $scope.noarryul = [];

                    for (var data in $scope.hourutilization.run_time) {
                        var run = $scope.hourutilization.run_time[data] ;
                        //  var ss =parseFloat(secondsToMinutes(ss1));
                        $scope.runarryul.push(run);
                        var idle = $scope.hourutilization.idle_time[data] ;
                        // var ss = parseFloat(secondsToMinutes(ss1));
                        $scope.idlearryul.push(idle);
                        var stop = $scope.hourutilization.stop_time[data] ;
                        //  var ss = parseFloat(secondsToMinutes(ss1));
                        $scope.stoparryul.push(stop);
                        var nodata = $scope.hourutilization.no_data[data];
                        //   var ss =  parseFloat(secondsToMinutes(ss1));
                        $scope.noarryul.push(nodata);
                    }



                    for (var i in $scope.runarryul) {
                        var num1 = $scope.runarryul[i];
                        var num2 = $scope.idlearryul[i];
                        var num3 = $scope.stoparryul[i];

                        if (num1 >= num2 && num1 >= num3) {
                            $scope.runarryul[i] += $scope.noarryul[i];
                        } else if (num2 >= num1 && num2 >= num3) {
                            $scope.idlearryul[i] += $scope.noarryul[i];
                        } else if (num3 >= num1 && num3 >= num1) {
                            $scope.stoparryul[i] += $scope.noarryul[i];
                        }

                        if (num1 == 0 && num2 == 0 && num3 == 0) {
                            $scope.runarryul[i] = 0;
                            $scope.idlearryul[i] = 0;
                            $scope.stoparryul[i] = 0;
                        }
                    }


                    $scope.runarryul1 = [];
                    $scope.idlearryul1 = [];
                    $scope.stoparryul1 = [];
                    $scope.noarry = [];
                    for (var data in $scope.runarryul) {
                        var run = (secondsToMinutes($scope.runarryul[data])  * 100 / 60) ;
                      //  var ss =parseFloat(secondsToMinutes(ss1));
                        $scope.runarryul1.push(run);
                        var idle = (secondsToMinutes($scope.idlearryul[data])  * 100 / 60);
                       // var ss = parseFloat(secondsToMinutes(ss1));
                        $scope.idlearryul1.push(idle);
                        var stop = (secondsToMinutes($scope.stoparryul[data])  * 100/ 60);
                      //  var ss = parseFloat(secondsToMinutes(ss1));
                        $scope.stoparryul1.push(stop);
                      
                    }

                    Highcharts.chart('utilization', {
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: 'Machine Status With Utilization(%) Chart'
                        },
                        xAxis: {
                            categories: $scope.hourutilization.time.reverse(),
                            title: {
                                text: 'Time(Hour)'
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Percentage(%)'
                            },
                            stackLabels: {
                                enabled: true,
                                style: {
                                    fontWeight: 'bold',
                                    // color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                                },
                                formatter: function () {
                                  
                                    if(this.total >= 98 ){
                                        this.total = 100;                       
                                    } 
                                   
                                    return Math.ceil(this.total) + '%';
                                }
                            }

                        },
                        legend: {
                            reversed: true
                        },
                        plotOptions: {
                            series: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: true,
                                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                                    format: '{point.y:.0f} %', // your label's value plus the percentage sign
                                    valueDecimals: 2 // show your label's value up to two decimal places
                                }
                            }

                        },
                        colors: ['#ec5550', '#e8a249', '#2cbe63'],
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: 'Stop',
                            data: $scope.stoparryul1.reverse()
                        }, {
                            name: 'idle',
                            data: $scope.idlearryul1.reverse()
                        }, {
                            name: 'Run',
                            data: $scope.runarryul1.reverse()
                        }]
                    })

                })
               
        }

    });



function secondsToMinutes(time) {

    var min = Math.floor(time / 60);
    var sec = Math.floor(time % 60);

    if (sec.toString().length == 1) {
        // alert(sec);
        sec = '0' + sec;
    }
    return min + '.' + sec;
}

