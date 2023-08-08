// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = 'Nunito'), '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Doughnut Chart
var ctx = document.getElementById('myDnChart');
var myDnChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['여성', '남성'],
        datasets: [
            {
                data: [70, 30],
                backgroundColor: ['#1cc88a', '#4e73df'],
                hoverBackgroundColor: ['#17a673', '#2e59d9'],
                hoverBorderColor: 'rgba(234, 236, 244, 1)'
            }
        ]
    },
    options: {
        maintainAspectRatio: false,
        tooltips: {
            backgroundColor: 'rgb(255,255,255)',
            bodyFontColor: '#858796',
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10
        },
        legend: {
            display: true,
            position: 'bottom'
        },
        cutoutPercentage: 80
    }
});

var ctx = document.getElementById('myDnChartSec');
var myDnChartSec = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['HIPHOP', 'K-POP', '동요', 'POP', 'JAZZ'],
        datasets: [
            {
                data: [40, 25, 18, 12, 5],
                backgroundColor: ['#2f92ff', '#4e73df', 'rgb(153, 158, 255)', 'rgb(149, 206, 255)', '#17dceb'],
                hoverBackgroundColor: ['#0079fd', '#2e59d9', 'rgb(128, 133, 233)', 'rgb(124, 181, 236)', '#009fab'],
                hoverBorderColor: 'rgba(234, 236, 244, 1)'
            }
        ]
    },
    options: {
        maintainAspectRatio: false,
        tooltips: {
            backgroundColor: 'rgb(255,255,255)',
            bodyFontColor: '#858796',
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10
        },
        legend: {
            display: true,
            position: 'bottom'
        },
        cutoutPercentage: 80
    }
});

// Pie Chart
var ctx = document.getElementById('myPieChart');
var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['AI챌린지', '음원챌린지', '일반'],
        datasets: [
            {
                label: '%',
                data: [60, 30, 10],
                backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                hoverBackgroundColor: ['#2e59d9', '#17a673'],
                hoverBorderColor: 'rgba(234, 236, 244, 1)'
            }
        ]
    },
    options: {
        maintainAspectRatio: false,
        tooltips: {
            backgroundColor: 'rgb(255,255,255)',
            bodyFontColor: '#858796',
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10
        },
        legend: {
            display: true,
            position: 'bottom'
        }
    }
});

// var ctx = document.getElementById('myPieChartSec');
// var myPieChartSec = new Chart(ctx, {
//     type: 'pie',
//     data: {
//         labels: ['K-POP', 'JAZZ', 'POP', 'HIPHOP', '동요'],
//         datasets: [
//             {
//                 label: '%',
//                 data: [57, 20, 13, 8, 2],
//                 backgroundColor: ['rgb(68,169,168)', '#1cc88a', 'rgb(153, 158, 255)', 'rgb(149, 206, 255)', '#17dceb'],
//                 hoverBackgroundColor: ['rgb(43,144,143)', 'rgb(128, 133, 233)', 'rgb(128, 133, 233)', 'rgb(124, 181, 236)', '#009fab'],
//                 hoverBorderColor: 'rgba(234, 236, 244, 1)'
//             }
//         ]
//     },
//     options: {
//         maintainAspectRatio: false,
//         tooltips: {
//             backgroundColor: 'rgb(255,255,255)',
//             bodyFontColor: '#858796',
//             borderColor: '#dddfeb',
//             borderWidth: 1,
//             xPadding: 15,
//             yPadding: 15,
//             displayColors: false,
//             caretPadding: 10
//         },
//         legend: {
//             display: true,
//             position: 'bottom'
//         }
//     }
// });

function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
        dec = typeof dec_point === 'undefined' ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

// Bar Chart
var ctx = document.getElementById('myBarChart');
var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['0~4', '4~8', '8~12', '12~16', '16~20', '20~24'],
        datasets: [
            {
                label: '명',
                backgroundColor: '#4e73df',
                hoverBackgroundColor: '#2e59d9',
                borderColor: '#4e73df',
                data: [4215, 5312, 1251, 7841, 6821, 3984]
            }
        ]
    },
    options: {
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 10,
                right: 25,
                top: 25,
                bottom: 0
            }
        },
        scales: {
            xAxes: [
                {
                    time: {
                        unit: 'month'
                    },
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 6
                    },
                    maxBarThickness: 25
                }
            ],
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        max: 15000,
                        display: false,
                        drawBorder: false,
                        callback: function (value, index, values) {
                            return number_format(value);
                        }
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }
            ]
        },
        legend: {
            display: false
        },
        tooltips: {
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            backgroundColor: 'rgb(255,255,255)',
            bodyFontColor: '#858796',
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
            callbacks: {
                label: function (tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return number_format(tooltipItem.yLabel) + ' ' + datasetLabel;
                }
            }
        }
    }
});

// Area Chart
var ctx = document.getElementById('myAreaChart');
var myAreaChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Earnings',
                lineTension: 0.3,
                backgroundColor: 'rgba(78, 115, 223, 0.05)',
                borderColor: 'rgba(78, 115, 223, 1)',
                pointRadius: 3,
                pointBackgroundColor: 'rgba(78, 115, 223, 1)',
                pointBorderColor: 'rgba(78, 115, 223, 1)',
                pointHoverRadius: 3,
                pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
                pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000]
            }
        ]
    },
    options: {
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 10,
                right: 25,
                top: 25,
                bottom: 0
            }
        },
        scales: {
            xAxes: [
                {
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: 7
                    }
                }
            ],
            yAxes: [
                {
                    ticks: {
                        maxTicksLimit: 5,
                        padding: 10,
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return '$' + number_format(value);
                        }
                    },
                    gridLines: {
                        color: 'rgb(234, 236, 244)',
                        zeroLineColor: 'rgb(234, 236, 244)',
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                    }
                }
            ]
        },
        legend: {
            display: false
        },
        tooltips: {
            backgroundColor: 'rgb(255,255,255)',
            bodyFontColor: '#858796',
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            intersect: false,
            mode: 'index',
            caretPadding: 10,
            callbacks: {
                label: function (tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
                }
            }
        }
    }
});
