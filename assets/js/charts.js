// Pie the chart
Highcharts.chart('container1', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Total Transaction'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Payment Type',
        colorByPoint: true,
        data: [{
            name: 'Visa',
            y: 61.41,
            sliced: true,
            selected: true
        }, {
            name: 'AMEX',
            y: 11.84
        }, {
            name: 'MasterCard',
            y: 10.85
        }, {
            name: 'ACH',
            y: 4.67
        }, {
            name: 'Check',
            y: 4.18
        }, {
            name: 'Discover',
            y: 7.05
        }]
    }]
});

// Pie Chart End

// Line Chart
Highcharts.chart('container2', {

title: {
	text: 'Payment Method'
},

subtitle: {
	text: 'Source: OSGBilling.com'
},

yAxis: {
	title: {
		text: 'Number of Transactions'
	}
},
legend: {
	layout: 'vertical',
	align: 'right',
	verticalAlign: 'middle'
},

plotOptions: {
	series: {
		label: {
			connectorAllowed: false
		},
		pointStart: 2010
	}
},

series: [{
	name: 'Web',
	data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
}, {
	name: 'IVR',
	data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
}, {
	name: 'Lockbox',
	data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
}, {
	name: 'CSR',
	data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
}, {
	name: 'Other',
	data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
}],

responsive: {
	rules: [{
		condition: {
			maxWidth: 500
		},
		chartOptions: {
			legend: {
				layout: 'horizontal',
				align: 'center',
				verticalAlign: 'bottom'
			}
		}
	}]
}

});
// Line Chart End

// Stock Chart
Highcharts.chart('container3', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Total Processed'
    },
    xAxis: {
        categories: ['MasterCard', 'Discover', 'AMEX', 'Visa', 'Check']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Past 3 Months'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [{
        name: 'JUL',
        data: [5, 3, 4, 7, 2]
    }, {
        name: 'AUG',
        data: [2, 2, 3, 2, 1]
    }, {
        name: 'SEP',
        data: [3, 4, 4, 2, 5]
    }]
});
// Stock Chart End
// Branch Chart
Highcharts.chart('container4', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Efficiency Optimization by Branch'
    },
    xAxis: {
        categories: [
            'Seattle HQ',
            'San Francisco',
            'Tokyo'
        ]
    },
    yAxis: [{
        min: 0,
        title: {
            text: 'Employees'
        }
    }, {
        title: {
            text: 'Profit (millions)'
        },
        opposite: true
    }],
    legend: {
        shadow: false
    },
    tooltip: {
        shared: true
    },
    plotOptions: {
        column: {
            grouping: false,
            shadow: false,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Employees',
        color: '#70dbff',
        data: [150, 73, 20],
        pointPadding: 0.3,
        pointPlacement: -0.2
    }, {
        name: 'Employees Optimized',
        color: '#0096c9',
        data: [140, 90, 40],
        pointPadding: 0.4,
        pointPlacement: -0.2
    }, {
        name: 'Profit',
        color: '#ff95d4',
        data: [183.6, 178.8, 198.5],
        tooltip: {
            valuePrefix: '$',
            valueSuffix: ' M'
        },
        pointPadding: 0.3,
        pointPlacement: 0.2,
        yAxis: 1
    }, {
        name: 'Profit Optimized',
        color: '#ec008c',
        data: [203.6, 198.8, 208.5],
        tooltip: {
            valuePrefix: '$',
            valueSuffix: ' M'
        },
        pointPadding: 0.4,
        pointPlacement: 0.2,
        yAxis: 1
    }]
});
// Branch Chart End