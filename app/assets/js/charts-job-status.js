/*global $, document, LINECHARTEXMPLE*/
$(document).ready(function () {

    'use strict';

    var brandPrimary = '#f7941e';
    var machineRunning = '#2cbe63';

    var OPERATIONDETAIL    = $('#operationChart');


    

    var operationChart = new Chart(OPERATIONDETAIL, {
        type: 'bar',
        data: {
            labels: ["Job1", "Job2", "Job3", "Job4"],
            datasets: [
                {
                    label: "Produced",
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
                    data: [65, 59, 80, 81, 56, 55, 40],
                },
                {
                    label: "Remaining",
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
                    data: [35, 40, 60, 47, 88, 27, 30],
                }
            ]
        }
    });



   
});
