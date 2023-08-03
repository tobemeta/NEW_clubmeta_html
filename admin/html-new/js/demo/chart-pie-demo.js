// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = 'Nunito'), '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById('myDnChart');
var myPieChart = new Chart(ctx, {
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
