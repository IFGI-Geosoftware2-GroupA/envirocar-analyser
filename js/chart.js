/**
 * @author Marius Runde, Axel Virnich
 */

// -----------------------------
// --- Methods for the chart ---
// -----------------------------

// -------------------
// - LineChart class -
// -------------------

// Constructor
function LineChart() {
	// default line chart options for time related data
	this.options = {
		chart : {
			renderTo : 'chart',
			type : 'line',
			zoomType : 'xy'
		},
		title : {
			x : -20
		},
		subtitle : {
			x : -20,
			y : 30
		},
		xAxis : {
			labels : {
				formatter : function() {
					return Highcharts.dateFormat('%H:%M:%S', this.value);
					// time of x-axis is formatted as hh:mm:ss
				}
			}
		},
		yAxis : {
		},
		legend : {
			layout : 'vertical',
			align : 'right',
			verticalAlign : 'middle',
			borderWidth : 0
		},
		tooltip : {//displays information of the points when hovering over them
			formatter : function() {
				return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%a %d %b %H:%M:%S', this.x) + '<br/>' + this.y;
			}
		}
	};
	this.chart = new Highcharts.Chart(this.options);
}

// Setting the variables
LineChart.prototype.chart;
LineChart.prototype.options;

// --- Getter and setter ---
LineChart.prototype.getChart = function() {
	return this.chart;
};
LineChart.prototype.setChart = function(chart) {
	this.chart = chart;
};
LineChart.prototype.setOptions = function(options) {
	this.options = options;
};
LineChart.prototype.getOptions = function() {
	return this.options;
};

// set Title of the Chart
LineChart.prototype.setTitle = function(title) {
	this.chart.setTitle({
		text : title
	});
};

// set Subtitle of the Chart
LineChart.prototype.setSubtitle = function(subtitle) {
	this.chart.setTitle(null, {
		text : subtitle
	});
};

// redraws the chart - only necessary if data has been added!
LineChart.prototype.redraw = function() {
	this.chart.redraw();
};

// adds a new line to the chart - data array has to fit the current data scheme
// visible determnies whether the line should be displayed immediately
LineChart.prototype.addSeries = function(title, visible, data) {
	var options = {
		name : title,
		visible : visible,
		data : data
	};
	this.chart.addSeries(options);
};

// returns all the series of the chart as array
LineChart.prototype.getAllSeries = function() {
	return this.chart.series;
};

// returns the series with the name given
LineChart.prototype.getSeries = function(name) {
	return this.chart.series[name];
};

// adds a point to an existing series
// point has to fit the current data scheme
LineChart.prototype.addPoint = function(series, point) {
	this.chart.series[series].addPoint(options);
};

// renders the chart to the chart div
LineChart.prototype.initChart = function() {
	$(function() {
		this.chart;
	});
};

// set Title of the axes
// axis = x or y
LineChart.prototype.setAxisTitle = function(axis, title) {
	if (axis == 'x') {
		this.chart.xAxis[0].setTitle({
			text : title
		});
	} else if (axis == 'y') {
		this.chart.yAxis[0].setTitle({
			text : title
		});
	}
};

// set the categories of the axes
// axis = x or y, categories as array
LineChart.prototype.setAxisCategories = function(axis, categories) {
	if (axis == 'x') {
		this.chart.xAxis[0].setCategories(categories);
	} else if (axis == 'y') {
		this.chart.yAxis[0].setCategories(categories);
	}
};

// removes the chart
LineChart.prototype.remove = function() {
	return this.destroy();
	this.chart = new Highcharts.Chart(this.options);
};

// creates a LineChart from the Track requested
// trackId has to be passed as parameter
// VDOP,PDOP and GDOP are not visible in default
LineChart.prototype.createChartFromTrack = function(trackId) {
	$.getJSON('https://envirocar.org/api/stable/tracks/' + trackId, function(json) {
		// get Track Data
		var features = json.features;
		// Arrays to save the Phenomenon Values
		var gpsSpeed = new Array();
		var gpsAccuracy = new Array();
		var gpsBearing = new Array();
		var gpsVDOP = new Array();
		var gpsHDOP = new Array();
		var gpsAltitude = new Array();
		var gpsPDOP = new Array();
		// insert values to array, time is saved as UTC time
		for ( i = 0; i < features.length; i++) {
			var time = features[i].properties.time;
			var d = new Date(time);
			var utc = Date.UTC(d.getYear(), d.getMonth(), d.getDay(), d.getHours(), d.getMinutes(), d.getSeconds());
			gpsSpeed.push(new Array(utc, Math.round(features[i].properties.phenomenons['GPS Speed'].value * 100) / 100));
			gpsAccuracy.push(new Array(utc, features[i].properties.phenomenons['GPS Accuracy'].value));
			gpsBearing.push(new Array(utc, features[i].properties.phenomenons['GPS Bearing'].value));
			gpsVDOP.push(new Array(utc, features[i].properties.phenomenons['GPS VDOP'].value));
			gpsHDOP.push(new Array(utc, features[i].properties.phenomenons['GPS HDOP'].value));
			gpsPDOP.push(new Array(utc, features[i].properties.phenomenons['GPS PDOP'].value));
			gpsAltitude.push(new Array(utc, features[i].properties.phenomenons['GPS Altitude'].value));
		}
		//set Line Chart
		$(function() {
			$('#chart').highcharts({
				title : {
					text : 'Track ID ' + trackId,
					x : -20 //center
				},
				subtitle : {
					text : 'Source: enviroCar',
					x : -20
				},
				xAxis : {
					type : 'datetime',
					labels : {
						formatter : function() {
							return Highcharts.dateFormat('%H:%M:%S', this.value);
							// time of x-axis is formatted as hh:mm:ss
						}
					}
				},
				yAxis : {
					title : {
						text : 'Track Information'
					},
					plotLines : [{
						value : 0,
						width : 1,
						color : '#808080'
					}]
				},
				tooltip : {//displays information of the points when hovering over them
					formatter : function() {
						return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%a %d %b %H:%M:%S', this.x) + '<br/>' + this.y;
					}
				},
				legend : {
					layout : 'vertical',
					align : 'right',
					verticalAlign : 'middle',
					borderWidth : 0
				},
				series : [{
					name : 'GPS Geschwindigkeit(km/h)',
					data : gpsSpeed,
					pointInterval : 60
				}, {
					name : 'GPS Genauigkeit(%)',
					data : gpsAccuracy
				}, {
					name : 'GPS HDOP(precision)',
					data : gpsHDOP,
					visible : false
				}, {
					name : 'GPS PDOP(precision)',
					data : gpsPDOP,
					visible : false
				}, {
					name : 'GPS VDOP(precision)',
					data : gpsVDOP,
					visible : false
				}, {
					name : 'GPS Höhe(m)',
					data : gpsAltitude
				}, {
					name : 'GPS Peilung(deg)',
					data : gpsBearing
				}]
			});
		});
	});

};

// --------------------------
// - End of LineChart class -
// --------------------------

// ------------------------------------
// --- End of methods for the chart ---
// ------------------------------------

