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
	
}

// creates a LineChart from the Track requested
// trackId has to be passed as parameter
// VDOP,PDOP and GDOP are not visible in default
LineChart.prototype.createChartFromTrack = function(trackId){
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
		for(i = 0; i < features.length; i++){
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
		$(function () {
	        $('#chart').highcharts({
	            title: {
	                text: 'Track ID ' + trackId,
	                x: -20 //center
	            },
	            subtitle: {
	                text: 'Source: enviroCar',
	                x: -20
	            },
	            xAxis: {
	                type: 'datetime',
	               	labels: {
			            formatter: function() {
			                return Highcharts.dateFormat('%H:%M:%S', this.value); // time of x-axis is formatted as hh:mm:ss
			            }
			        }
	           	},
	            yAxis: {
	                title: {
	                    text: 'Track Information'
	                },
	                plotLines: [{
	                    value: 0,
	                    width: 1,
	                    color: '#808080'
	                }]
	            },
	            tooltip: { //displays information of the points when hovering over them
	                formatter: function() {
	                        return '<b>'+ this.series.name +'</b><br/>'+
	                        Highcharts.dateFormat('%a %d %b %H:%M:%S', this.x) +'<br/>'+ this.y;
	                }
	            },
	            legend: {
	                layout: 'vertical',
	                align: 'right',
	                verticalAlign: 'middle',
	                borderWidth: 0
	            },
	            series: [{
	                name: 'GPS Geschwindigkeit(km/h)',
	                data: gpsSpeed,
	        		pointInterval: 60
	            },
	            {
	            	name: 'GPS Genauigkeit(%)',
	            	data: gpsAccuracy
	            },
	            {
	            	name: 'GPS HDOP(precision)',
	            	data: gpsHDOP,
	            	visible: false
	            },
	            {
	            	name: 'GPS PDOP(precision)',
	            	data: gpsPDOP,
	            	visible: false
	            },
	            {
	            	name: 'GPS VDOP(precision)',
	            	data: gpsVDOP,
	            	visible: false
	            },
	            {
	            	name: 'GPS Höhe(m)',
	            	data: gpsAltitude
	            },
	            {
	            	name: 'GPS Peilung(deg)',
	            	data: gpsBearing
	            }
	            ]
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