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
        cutoutPercentage: 80,
        elements: {
            center: {
                text: '', // Data labels will be dynamically added
                fontStyle: 'Arial',
                sidePadding: 20
            }
        },
        plugins: false // Disable the external plugin (chartjs-plugin-datalabels)
    },
    // After the chart is drawn, calculate and display the data labels
    plugins: [
        {
            afterDraw: function (chart) {
                var width = chart.chart.width,
                    height = chart.chart.height,
                    ctx = chart.chart.ctx,
                    type = chart.config.type;

                if (type === 'doughnut') {
                    var fontSize = (height / 150).toFixed(2);
                    ctx.font = fontSize + 'em Arial';
                    ctx.textBaseline = 'middle';

                    var dataArr = chart.config.data.datasets[0].data,
                        sum = dataArr.reduce((a, b) => a + b, 0);

                    var position = 0; // Starting position for the data label
                    dataArr.forEach((value, index) => {
                        var percentage = ((value * 100) / sum).toFixed(2) + '%';
                        var textX = Math.round((width - ctx.measureText(percentage).width) / 2);
                        var textY = height / 2 + position;

                        ctx.fillText(percentage, textX, textY);

                        // Increase the position for the next data label
                        position += fontSize * 2;
                    });
                }
            }
        }
    ]
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
