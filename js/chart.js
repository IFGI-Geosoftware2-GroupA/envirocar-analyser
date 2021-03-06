/**
 * @author Marius Runde, Axel Virnich
 */
// -----------------------------
// --- Methods for the chart ---
// -----------------------------
// global chart variables
var lineChart;
var barChart;
var activeChart = 'line';

// global function to set the chart needed
function setChart(type, json){
	if(type == 'line'){
		if(getParam('lang') == 'en')
			lineChart = new LineChart('en');
		else
			lineChart = new LineChart('de');
		lineChart.initChart();
		lineChart.createChartFromMeasurement(measurements);
		activeChart = 'line';
	}
	else if(type == 'bar'){
		if(getParam('lang') == 'en')
			barChart = new BarChart('en');
		else
			barChart = new BarChart('de');
		barChart.initChart();
		barChart.createChartFromAggregation(json);
		activeChart = 'bar';
	}
}

// -------------------
// - LineChart class -
// -------------------

// Constructor
function LineChart(language) {
	// default line chart options for time related data
	this.options = {
		chart : {
			renderTo : 'analyser-chart',
			type : 'line',
			zoomType : 'xy',
			reflow: true
		},
		xAxis : {
			id : 'x-Axis',
			type: 'datetime',
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
						 click: function() {
                            // console.log(this.name);
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
	this.language = language;
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
LineChart.prototype.getLanguage = function(){
	return this.language;
};
LineChart.prototype.setLanguage = function(language){
	this.language = language;
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
		data : data,
		turboThreshold : 0
	};
	this.chart.addSeries(options);
};

// remove all series displayed
LineChart.prototype.clearSeries = function(){
	while(this.chart.series.length > 0)
 		this.chart.series[0].remove();
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
		if(this.chart.get(series[i].options.id).visible && this.getChart().get(series[i].options.id + id) != null)
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

// compare function used by sort method for sorting the data arrays by date
LineChart.prototype.compare = function(a,b) {
  if (a.x < b.x)
     return -1;
  if (a.x > b.x)
    return 1;
  return 0;
};


// create LineChart from the data of the Measurement Object transferred
LineChart.prototype.createChartFromMeasurement = function(measurement){
	// Arrays to save the Phenomenon Values
	var speedA = new Array();
	var consumptionA = new Array();
	var engineLoadA = new Array();
	var rpmA = new Array();
	var co2A = new Array();	
	
	for (i=0, j=0; i< measurements.length; i++) {
			var utc = measurements[i].getTimestamp();
			var measurementId = measurements[i].getId() + '';
			for (j=0;j<measurements[i].phenomenons.length;j++) {
				
				if (measurements[i].getPhenomenons()[j].name == "Consumption") {
					consumptionA.push({x: utc, y: parseFloat(measurements[i].getValues()[j].toFixed(5)), name: measurementId, id: 'Consumption' +  measurementId, color : this.setColorByClassification(measurements[i].getValues()[j],'Consumption')});	
				} 
				
				else if (measurements[i].getPhenomenons()[j].name == "CO2") {
					co2A.push({x: utc, y: parseFloat(measurements[i].getValues()[j].toFixed(2)), name: measurementId, id: 'CO2' +  measurementId, color : this.setColorByClassification(measurements[i].getValues()[j],'CO2')});
				} 
				
				else if (measurements[i].getPhenomenons()[j].name == "Speed") {
					speedA.push({x: utc, y: parseFloat(measurements[i].getValues()[j].toFixed(2)), name: measurementId, id: 'Speed' +  measurementId, color : this.setColorByClassification(measurements[i].getValues()[j],'Speed')});	
				} 
				
				else if (measurements[i].getPhenomenons()[j].name == "Engine Load") {
					engineLoadA.push({x: utc, y: parseFloat(measurements[i].getValues()[j].toFixed(2)), name: measurementId, id: 'EngineLoad' +  measurementId, color : this.setColorByClassification(measurements[i].getValues()[j],'Engine Load')});	
				}
				
				else if (measurements[i].getPhenomenons()[j].name == "Rpm") {
					rpmA.push({x: utc, y: parseFloat(measurements[i].getValues()[j].toFixed(2)), name: measurementId, id: 'Rpm' +  measurementId, color : this.setColorByClassification(measurements[i].getValues()[j],'Rpm')});			
				}
			}
		}
		speedA.sort(this.compare);
		consumptionA.sort(this.compare);
		co2A.sort(this.compare);
		engineLoadA.sort(this.compare);
		rpmA.sort(this.compare);
		// display labels in chosen language
		if(this.getLanguage() == 'de'){
			this.setTitle('Messungen');
			this.setAxisTitle('x', 'Zeit');
			this.setAxisTitle('y', 'Werte');
			if(speedA.length > 0)			this.addSeries('Geschwindigkeit(km/h)', true, 'Speed', speedA);
			if(consumptionA.length > 0)		this.addSeries('Verbrauch(l/h)', true, 'Consumption', consumptionA);
			if(co2A.length > 0)				this.addSeries('CO2(g/h)', true, 'CO2',co2A);
			if(engineLoadA.length > 0)		this.addSeries('Motorlast(%)', true, 'EngineLoad', engineLoadA);
			if(rpmA.length > 0)				this.addSeries('Umdrehungen(u/min)', false, 'Rpm', rpmA);	
		}
		else if(this.getLanguage() == 'en'){
			this.setTitle('Measurements');
			this.setAxisTitle('x', 'Time');
			this.setAxisTitle('y', 'Values');
			if(speedA.length > 0)			this.addSeries('Speed(km/h)', true, 'Speed', speedA);
			if(consumptionA.length > 0)		this.addSeries('Consumption(l/h)', true, 'Consumption', consumptionA);
			if(co2A.length > 0)				this.addSeries('CO2(g/h)', true, 'CO2', co2A);
			if(engineLoadA.length > 0)		this.addSeries('Engine Load(%)', true, 'EngineLoad', engineLoadA);
			if(rpmA.length > 0)				this.addSeries('Revolutions(u/min)', false, 'Rpm', rpmA);	
		}	
		else{
			this.setTitle('Messungen');
			this.setAxisTitle('x', 'Zeit');
			this.setAxisTitle('y', 'Werte');
			if(speedA.length > 0)			this.addSeries('Geschwindigkeit(km/h)', true, 'Speed', speedA);
			if(consumptionA.length > 0)		this.addSeries('Verbrauch(l/h)', true, 'Consumption', consumptionA);
			if(co2A.length > 0)				this.addSeries('CO2(g/h)', true, 'CO2', sort(co2A));
			if(engineLoadA.length > 0)		this.addSeries('Motorlast(%)', true, 'EngineLoad', engineLoadA);
			if(rpmA.length > 0)				this.addSeries('Umdrehungen(u/min)', false, 'Rpm', rpmA);	
		}
		if(viewMode == "chart")	lineChart.getChart().setSize($("#map").width(), $("#map").height() / 1.5);
		if(viewMode == "dual")	lineChart.getChart().setSize($("#map").width(), $("#map").height() / 3);
};

//determine the color of the chart points if a classification is necessary(only if limit filter is active)
LineChart.prototype.setColorByClassification = function(value, phenomenon){
	if(phenomenon == limitFilterSettings[0]){
		var tolerance = (limitFilterSettings[2] - limitFilterSettings[1]) * 1/4;
		if(value > limitFilterSettings[2] || value < limitFilterSettings[1]) return "#FF0000";
		else if(value < limitFilterSettings[2]-tolerance && value > limitFilterSettings[1]+tolerance) return "#32CD32";
		else return "#FFD700";
	}
	else{
		return null;
	}
};

// --------------------------
// - End of LineChart class -
// --------------------------

// --------------------------
// ---- BarChart class ------
// --------------------------

// Constructor
function BarChart(language) {
	// default bar chart options for aggregation results
	this.options = {
		chart : {
			renderTo : 'analyser-chart',
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
			categories : ["Mean", "Standard Error", "Min", "Max"],
			title: {
				text : null
			}
		},
		yAxis : {
		},
		tooltip : {//displays information of the points when hovering over them
			formatter : function() {
				return '<b>' + this.x + '</b><br />' + this.y;
			}
		},
		legend : {
			layout : 'vertical',
			align : 'right',
			verticalAlign : 'middle',
			borderWidth : 1
		}
	};
	this.chart = new Highcharts.Chart(this.options);
	this.language = language;
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
BarChart.prototype.setLanguage = function(language){
	this.language = language;
};
BarChart.prototype.getLanguage = function(){
	return this.language;
};

// adds a new series to the chart
BarChart.prototype.addSeries = function(name, visible, data){
	var options = {
		name : name,
		visible : visible,
		data : data
	};
	this.chart.addSeries(options);
};


//creates the chart directly from the aggregation results
BarChart.prototype.createChartFromAggregation = function(json){
	//parse the json string returned from server to object
	var json = JSON.parse(json);
	
	//arrays to save the aggregation values
	var co2 = new Array();
	var speed = new Array();
	var consumption = new Array();
	var rpm = new Array();
	var engineLoad = new Array();
	
	//sort the values to the arrays, if phenomenon exists
	if(json[0]['CO2']['Mean'] != 'No Data'){
		co2.push(parseFloat(json[0]['CO2']['Mean'].toFixed(2)));
		co2.push(parseFloat(json[0]['CO2']['Standard Error'].toFixed(2)));
		co2.push(parseFloat(json[0]['CO2']['Min'].toFixed(2)));
		co2.push(parseFloat(json[0]['CO2']['Max'].toFixed(2)));	
	}
	
	if(json[1]['Consumption']['Mean'] != 'No Data'){
		consumption.push(parseFloat(json[1]['Consumption']['Mean'].toFixed(2)));
		consumption.push(parseFloat(json[1]['Consumption']['Standard Error'].toFixed(2)));
		consumption.push(parseFloat(json[1]['Consumption']['Min'].toFixed(2)));
		consumption.push(parseFloat(json[1]['Consumption']['Max'].toFixed(2)));	
	}
	
	if(json[2]['Engine Load']['Mean'] != 'No Data'){
		engineLoad.push(parseFloat(json[2]['Engine Load']['Mean'].toFixed(2)));
		engineLoad.push(parseFloat(json[2]['Engine Load']['Standard Error'].toFixed(2)));
		engineLoad.push(parseFloat(json[2]['Engine Load']['Min'].toFixed(2)));
		engineLoad.push(parseFloat(json[2]['Engine Load']['Max'].toFixed(2)));	
	}
	
	if(json[3]['Rpm']['Mean'] != 'No Data'){
		rpm.push(parseFloat(json[3]['Rpm']['Mean'].toFixed(2)));
		rpm.push(parseFloat(json[3]['Rpm']['Standard Error'].toFixed(2)));
		rpm.push(parseFloat(json[3]['Rpm']['Min'].toFixed(2)));
		rpm.push(parseFloat(json[3]['Rpm']['Max'].toFixed(2)));	
	}
	
	if(json[4]['Speed']['Mean'] != 'No Data'){
		speed.push(parseFloat(json[4]['Speed']['Mean'].toFixed(2)));
		speed.push(parseFloat(json[4]['Speed']['Standard Error'].toFixed(2)));
		speed.push(parseFloat(json[4]['Speed']['Min'].toFixed(2)));
		speed.push(parseFloat(json[4]['Speed']['Max'].toFixed(2)));	
	}
	
	//add information and series in the language selected
	if(this.getLanguage() == 'en'){
		this.setTitle('Aggregation Results');
		this.setAxisTitle('y', 'Values');
		this.setAxisCategories('x', ['Mean', 'Standard Error', 'Minimum', 'Maximum']);
		if(co2.length > 0) 			this.addSeries('CO2(g/h)', true, co2);
		if(speed.length > 0) 		this.addSeries('Speed(km/h)', true, speed);
		if(consumption.length > 0) 	this.addSeries('Consumption(l/h)', true, consumption);
		if(rpm.length > 0)		 	this.addSeries('Rpm(u/min)', true, rpm);
		if(engineLoad.length > 0) 	this.addSeries('Engine Load(%)', true, engineLoad);	
	}
	else if(this.getLanguage() == 'de'){
		this.setTitle('Aggregation Ergebnisse');
		this.setAxisTitle('y', 'Werte');
		this.setAxisCategories('x', ['Durchschnitt', 'Standardfehler', 'Minimum', 'Maximum']);
		if(co2.length > 0)			this.addSeries('CO2(g/h)', true, co2);
		if(speed.length > 0)		this.addSeries('Geschwindigkeit(km/h)', true, speed);
		if(consumption.length > 0)	this.addSeries('Verbrauch(l/h)', true, consumption);
		if(rpm.length > 0)			this.addSeries('Umdrehungen(u/min)', true, rpm);
		if(engineLoad.length > 0)	this.addSeries('Motorlast(%)', true, engineLoad);	
	}
	else{
		this.setTitle('Aggregation Ergebnisse');
		this.setAxisTitle('y', 'Werte');
		this.setAxisCategories('x', ['Durchschnitt', 'Standardfehler', 'Minimum', 'Maximum']);
		if(co2.length > 0)			this.addSeries('CO2(g/h)', true, co2);
		if(speed.length > 0)		this.addSeries('Geschwindigkeit(km/h)', true, speed);
		if(consumption.length > 0)	this.addSeries('Verbrauch(l/h)', true, consumption);
		if(rpm.length > 0)			this.addSeries('Umdrehungen(u/min)', true, rpm);
		if(engineLoad.length > 0)	this.addSeries('Motorlast(%)', true, engineLoad);
	}
	if(viewMode == "chart")	barChart.getChart().setSize($("#map").width(), $("#map").height() / 1.5);
	if(viewMode == "dual")	barChart.getChart().setSize($("#map").width(), $("#map").height() / 3);
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

