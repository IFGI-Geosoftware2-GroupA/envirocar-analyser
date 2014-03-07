/**
 * @author Marius Runde, Axel Virnich
 */

// -----------------------------
// --- Methods for the chart ---
// -----------------------------

// -------------------
// - LineChart class -
// -------------------

// (function (H) {
    // Highcharts.Chart.prototype.callbacks.push(function (chart) {
        // H.addEvent(chart.series.point, 'click', function (e) {
            // e = chart.pointer.normalize();
            // alert('Clicked chart at ' + e.chartX + ', ' + e.chartY);
        // });
        // // H.addEvent(chart.xAxis[0], 'afterSetExtremes', function (e) {
            // // alert('Set extremes to ' + e.min + ', ' + e.max);
        // // });
    // });
// }(Highcharts));


// Constructor
function LineChart() {
	// default line chart options for time related data
	this.options = {
		chart : {
			renderTo : 'analyser-chart',
			type : 'line',
			zoomType : 'xy'
		},
		// title : {
			// x : -20
		// },
		// subtitle : {
			// x : -20,
			// y : 30
		// },
		xAxis : {
			id : 'x-Axis',
			labels : {
				formatter : function() {
					return Highcharts.dateFormat('%H:%M:%S', this.value);
					// time of x-axis is formatted as hh:mm:ss
				}
			}
		},
		yAxis : {
			id : 'y-Axis',
			min: 0
		},
		plotOptions : {
			series : {
				point : {
					events : {
						 mouseOver: function() {
                            console.log(this.name);
                        }
					}
				}
			}
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


// adds a point to an existing series
// point has to fit the current data scheme
LineChart.prototype.addPoint = function(series, point) {
	this.chart.series[series].addPoint(point);
};

// adds a new line to the chart - data array has to fit the current data scheme
// visible determnies whether the line should be displayed immediately
LineChart.prototype.addSeries = function(title, visible, id, data) {
	var options = {
		name : title,
		visible : visible,
		id : id,
		data : data
	};
	this.chart.addSeries(options);
};

// returns all the series of the chart as array
LineChart.prototype.getAllSeries = function() {
	return this.chart.series;
};

// returns the current options of the Chart Object
LineChart.prototype.getChartOptions = function(){
	return this.chart.options;
};

// returns the series with the name given
LineChart.prototype.getSeries = function(name) {
	return this.chart.series[name];
};

// marks all Points of a certain id
LineChart.prototype.highlight = function(id){
	var series = this.getAllSeries();
	for(var i = 0; i < series.length; i++){
		if(this.chart.get(series[i].options.id).visible)
			this.getChart().get(series[i].options.id + id).select(true,true);
	}
};

// renders the chart to the chart div
LineChart.prototype.initChart = function() {
	$(function() {
		this.chart;
	});
};

// redraws the chart - only necessary if data has been added!
LineChart.prototype.redraw = function() {
	this.chart.redraw();
};

// removes the chart and saves the latest chart options
LineChart.prototype.remove = function() {
	this.setOptions(this.getChartOptions());
	this.chart.destroy();
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

// set Subtitle of the Chart
LineChart.prototype.setSubtitle = function(subtitle) {
	this.chart.setTitle(null, {
		text : subtitle
	});
};

// set Title of the Chart
LineChart.prototype.setTitle = function(title) {
	this.chart.setTitle({
		text : title
	});
};

// unselects all marked points
LineChart.prototype.unselect = function(){
	var selection = this.getChart().getSelectedPoints();
	for(var i = 0; i < selection.length; i++){
		selection[i].select(false);
	}
};



// creates a LineChart from a track json
// VDOP,PDOP and GDOP are not visible in default
// NOTE: This is just a test function, to show a sample chart
LineChart.prototype.createChartFromTrack = function() {
	// Arrays to save the Phenomenon Values
	var speedA = new Array();
	var consumptionA = new Array();
	var engineLoadA = new Array();
	var rpmA = new Array();
	var co2A = new Array();
	
	var chart = this;
	
	var query = new Query('measurements');
	var measurements = query.getData();
	setTimeout(function(){

		for (i=0, j=0; i< measurements.length; i++) {
			var d = measurements[i].getTimestamp();
			var utc = Date.UTC(d.getYear(), d.getMonth(), d.getDay(), d.getHours(), d.getMinutes(), d.getSeconds());
			var measurementId = measurements[i].getId() + '';
				for (j=0;j<measurements[i].phenomenons.length;j++) {
					
					if (measurements[i].getPhenomenons()[j].name == "Consumption") {
						consumptionA.push({x: utc, y: parseFloat(measurements[i].getValues()[j].toFixed(2)), name: measurementId, id: 'Consumption' +  measurementId});	
					} 
					
					else if (measurements[i].getPhenomenons()[j].name == "CO2") {
						co2A.push({x: utc, y: parseFloat(measurements[i].getValues()[j].toFixed(2)), name: measurementId, id: 'CO2' +  measurementId});
					} 
					
					else if (measurements[i].getPhenomenons()[j].name == "Speed") {
						speedA.push({x: utc, y: parseFloat(measurements[i].getValues()[j].toFixed(2)), name: measurementId, id: 'Speed' +  measurementId});	
					} 
					
					else if (measurements[i].getPhenomenons()[j].name == "Engine Load") {
						engineLoadA.push({x: utc, y: parseFloat(measurements[i].getValues()[j].toFixed(2)), name: measurementId, id: 'EngineLoad' +  measurementId});	
					}
					
					else if (measurements[i].getPhenomenons()[j].name == "Rpm") {
						rpmA.push({x: utc, y: parseFloat(measurements[i].getValues()[j].toFixed(2)), name: measurementId, id: 'Rpm' +  measurementId});			
					}
				}
			}
		chart.setTitle('Messungen');
		chart.setAxisTitle('x', 'Zeit');
		chart.setAxisTitle('y', 'Werte');
		if(speedA.length > 0)			chart.addSeries('Geschwindigkeit(km/h)', true, 'Speed', speedA);
		if(consumptionA.length > 0)		chart.addSeries('Verbrauch(l/h)', true, 'Consumption', consumptionA);
		if(co2A.length > 0)				chart.addSeries('CO2(kg/h)', true, 'CO2', co2A);
		if(engineLoadA.length > 0)		chart.addSeries('Motorlast(%)', true, 'EngineLoad', engineLoadA);
		if(rpmA.length > 0)				chart.addSeries('Umdrehungen(u/min)', true, 'Rpm', rpmA);
	}, 5000);
	
};

// --------------------------
// - End of LineChart class -
// --------------------------

// --------------------------
// ---- BarChart class ------
// --------------------------

// Constructor
function BarChart() {
	// default line chart options for time related data
	this.options = {
		chart : {
			renderTo : 'chart',
			type : 'bar',
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
		},
		yAxis : {
		},
		legend : {
			layout : 'vertical',
			align : 'right',
			verticalAlign : 'middle',
			borderWidth : 0
		}
	};
	this.chart = new Highcharts.Chart(this.options);
}

// Setting the variables
BarChart.prototype.chart;
BarChart.prototype.options;

// --- Getter and setter ---
BarChart.prototype.getChart = function() {
	return this.chart;
};
BarChart.prototype.setChart = function(chart) {
	this.chart = chart;
};
BarChart.prototype.setOptions = function(options) {
	this.options = options;
};
BarChart.prototype.getOptions = function() {
	return this.options;
};


// returns all the series of the chart as array
BarChart.prototype.getAllSeries = function() {
	return this.chart.series;
};

// returns the current options of the Chart Object
BarChart.prototype.getChartOptions = function(){
	return this.chart.options;
};

// returns the series with the name given
BarChart.prototype.getSeries = function(name) {
	return this.chart.series[name];
};

// renders the chart to the chart div
BarChart.prototype.initChart = function() {
	$(function() {
		this.chart;
	});
};

// redraws the chart - only necessary if data has been added!
BarChart.prototype.redraw = function() {
	this.chart.redraw();
};

// removes the chart while saving the latest chart options
BarChart.prototype.remove = function() {
	this.setOptions(this.getChartOptions());
	this.chart.destroy();
};

// set the categories of the axes
// axis = x or y, categories as array
BarChart.prototype.setAxisCategories = function(axis, categories) {
	if (axis == 'x') {
		this.chart.xAxis[0].setCategories(categories);
	} else if (axis == 'y') {
		this.chart.yAxis[0].setCategories(categories);
	}
};


// set Title of the axes
// axis = x or y
BarChart.prototype.setAxisTitle = function(axis, title) {
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

// set Subtitle of the Chart
BarChart.prototype.setSubtitle = function(subtitle) {
	this.chart.setTitle(null, {
		text : subtitle
	});
};

// set Title of the Chart
BarChart.prototype.setTitle = function(title) {
	this.chart.setTitle({
		text : title
	});
};

// --------------------------
// -- End of BarChart class -
// --------------------------

// ------------------------------------
// --- End of methods for the chart ---
// ------------------------------------

