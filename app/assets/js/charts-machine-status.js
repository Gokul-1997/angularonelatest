/*global $, document, LINECHARTEXMPLE*/
$(document).ready(function () {

    'use strict';

    var brandPrimary = '#f7941e';
    var machineRunning = '#2cbe63';

    var LINECHARTEXMPLE   = $('#lineChartExample'),
        STATUSCHART       = $('#statuschart'),
        BARCHARTEXMPLE    = $('#barChartExample');


    var lineChartExample = new Chart(LINECHARTEXMPLE, {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "Production",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(247, 148, 30, 0.38)",
                    borderColor: "rgba(247, 148, 30, 1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 1,
                    pointBorderColor: "rgba(247, 148, 30, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(247, 148, 30, 1)",
                    pointHoverBorderColor: "rgba(247, 148, 30, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 30, 81, 56, 55, 40],
                    spanGaps: false
                },
                {
                    label: "Downtime",               
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(145, 145, 145,0.6)",
                    borderColor: "rgba(145, 145, 145,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 1,
                    pointBorderColor: "rgba(145, 145, 145,1)",
                    pointBackgroundColor:"rgba(145, 145, 145,1)",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: brandPrimary,
                    pointHoverBorderColor: "rgba(145, 145, 145,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [50, 20, 40, 31, 32, 22, 10],
                    spanGaps: false
                }
            ]
        }
    });

    

    var statuschart = new Chart(STATUSCHART, {
        type: 'doughnut',
        data: {
            labels: [
                "Hours Worked",
                "Down Time",
                "Remaining"
            ],
            datasets: [
                {
                    data: [300, 50, 100],
                    borderWidth: [1, 1, 1],
                    backgroundColor: [
                        machineRunning,
                        "#e8a249",
                        "#a7a7a7"
                    ],
                    hoverBackgroundColor: [
                        brandPrimary,
                        "#e8a249",
                        "#a7a7a7"
                    ]
                }]
            }
    });

    var statuschart = {
        responsive: true
    };

    var barChartExample = new Chart(BARCHARTEXMPLE, {
        type: 'bar',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "Availability",
                    backgroundColor: [
                        'rgba(145, 145, 145, 0.6)',
                        'rgba(145, 145, 145, 0.6)',
                        'rgba(145, 145, 145, 0.6)',
                        'rgba(145, 145, 145, 0.6)',
                        'rgba(145, 145, 145, 0.6)',
                        'rgba(145, 145, 145, 0.6)',
                        'rgba(145, 145, 145, 0.6)'
                    ],
                    borderColor: [
                        'rgba(145, 145, 145, 1)',
                        'rgba(145, 145, 145, 1)',
                        'rgba(145, 145, 145, 1)',
                        'rgba(145, 145, 145, 1)',
                        'rgba(145, 145, 145, 1)',
                        'rgba(145, 145, 145, 1)',
                        'rgba(145, 145, 145, 1)'
                    ],
                    borderWidth: 1,
                    data: [65, 59, 80, 81, 56, 55, 40],
                },
                {
                    label: "Perform",
                    backgroundColor: [
                        'rgba(247, 148, 30, 0.6)',
                        'rgba(247, 148, 30, 0.6)',
                        'rgba(247, 148, 30, 0.6)',
                        'rgba(247, 148, 30, 0.6)',
                        'rgba(247, 148, 30, 0.6)',
                        'rgba(247, 148, 30, 0.6)',
                        'rgba(247, 148, 30, 0.6)'
                    ],
                    borderColor: [
                        'rgba(247, 148, 30, 1)',
                        'rgba(247, 148, 30, 1)',
                        'rgba(247, 148, 30, 1)',
                        'rgba(247, 148, 30, 1)',
                        'rgba(247, 148, 30, 1)',
                        'rgba(247, 148, 30, 1)',
                        'rgba(247, 148, 30, 1)'
                    ],
                    borderWidth: 1,
                    data: [35, 40, 60, 47, 88, 27, 30],
                }
            ]
        }
    });

    


});
