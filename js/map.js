/**
 * @author Marius Runde, Daniel Sawatzky, Thiemo Gaertner
 */
// ---------------------------
// --- Methods for the map ---
// ---------------------------
// Variables for the map, markers, markers bounds and BoundingBox
var map, nrwBounds, markers = [], mc, mcUsedBefore = true, maxZoomLevelForClusterer = 12, markersBounds = new google.maps.LatLngBounds();
BoundingBox = false;
// Variables for collecting Streetsegments
var path = new google.maps.MVCArray(), service = new google.maps.DirectionsService(), poly, streetmode = false, alerted = false, streetlistener, removepointlistener;
var polyexport = new google.maps.MVCArray();
var removepoints = [];
var idwmarkers = [];
var rectangle, measurements;
carModelsExists = false; // added
/**
 * Initialize the map
 */
function initMap() {
	var mapOptions = {
		center : new google.maps.LatLng(51.478333, 7.555), // center of North-Rhine-Westphalia)
		mapTypeControl : true,
		mapTypeControlOptions : {
			mapTypeIds : [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID, "OSM"],
			style : google.maps.MapTypeControlStyle.HORIZONTAL_BAR
		},
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		minZoom : 8,
		scaleControl : true,
		streetViewControl : false,
		zoomControl : true,
		zoomControlOptions : {
			style : google.maps.ZoomControlStyle.DEFAULT
		}
	};
	map = new google.maps.Map(document.getElementById("map"), mapOptions);

	//Define OSM map type pointing at the OpenStreetMap tile server
	map.mapTypes.set("OSM", new google.maps.ImageMapType({
		getTileUrl : function(coord, zoom) {
			return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
		},
		tileSize : new google.maps.Size(256, 256),
		name : "OSM",
		maxZoom : 18
	}));

	// Bounds for North-Rhine-Westphalia (NRW)
	nrwBounds = new google.maps.LatLngBounds(new google.maps.LatLng(50.3, 5.8), // south west
	new google.maps.LatLng(52.6, 9.5) // north east
	);
	map.fitBounds(nrwBounds);

	// Grey out the rest of the world
	var greyOutPolygon = new google.maps.Polygon({
		clickable : false,
		paths : [nrwBoundaries, everythingElse],
		strokeColor : 'grey',
		strokeOpacity : 0.85,
		strokeWeight : 2,
		fillColor : 'grey',
		fillOpacity : 0.7
	});
	greyOutPolygon.setMap(map);

	// Create the search box and link it to the UI element.
	var input = /** @type {HTMLInputElement} */(document.getElementById('search-input'));
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	var searchBox = new google.maps.places.SearchBox(/** @type {HTMLInputElement} */(input));

	// Listen for the 'center_changed' event to pan the map back to NRW
	google.maps.event.addListener(map, 'center_changed', function() {
		// Is the map still in our bounding box of North-Rhine-Westphalia?
		if (nrwBounds.contains(map.getCenter())) {
			// YES
			return;
		} else {
			// NO
			var c = map.getCenter(), x = c.lng(), y = c.lat(), maxX = nrwBounds.getNorthEast().lng(), maxY = nrwBounds.getNorthEast().lat(), minX = nrwBounds.getSouthWest().lng(), minY = nrwBounds.getSouthWest().lat();

			if (x < minX)
				x = minX;
			if (x > maxX)
				x = maxX;
			if (y < minY)
				y = minY;
			if (y > maxY)
				y = maxY;

			map.setCenter(new google.maps.LatLng(y, x));
		}
	});

	// Listen for the zoom_changed event to refresh the markers
	google.maps.event.addListener(map, 'zoom_changed', function() {
		refreshMarkers(map.getZoom());
	});

	// Listen for the search box results
	google.maps.event.addListener(searchBox, 'places_changed', function() {
		var places = searchBox.getPlaces();
		if (google.maps.geometry.poly.containsLocation(places[0].geometry.location, nrwPolygon)) {
			var bounds = new google.maps.LatLngBounds();
			map.setCenter(places[0].geometry.location);
			map.setZoom(14);
		} else {
			var l = getParam('lang');
			if (l == "en") {
				alert('The place you are searching for does not lie in the area of application.');
			} else {
				alert('Der gesuchte Ort liegt nicht im erfassten Anwendungsgebiet.');
			}
		}
	});

	// Bias the SearchBox results towards places that are within the bounds of the
	// current map's viewport.
	google.maps.event.addListener(map, 'bounds_changed', function() {
		var bounds = map.getBounds();
		searchBox.setBounds(bounds);
	});

	// Creates the polyline to hold the waypoints for displaying the overlay streetsegment selection
	poly = new google.maps.Polyline({
		map : map,
		editable : true,
		geodesic : true,
		strokeColor : "#CC33FF"
	});
}

// redraws markers, carSelection, chart, table and trackSelection
function redrawData(marker, cars, chart, table, tracks) {
	if(marker){
		clearOverlays();
		showMarkers();	
	}
	if(cars){
		// if no car Models Objects exists one is created
		if(carModelsExists == false){
			carModels = new loadCarModels();
			carModelsExists = true;
		// if a Object exists the array and the duallistbox should be cleared	
		}else{
			duallistbox_carmodels.empty();
			carModels.clearArray();
		}
	}
	if(chart)
		setChart('line');
	if(tracks)
		setTrackSelection();
	if(table){
		initTable();
		tablestyle();	
	}
}

// Delete all the markers on the map
function clearOverlays() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers.length = 0;
	if ( typeof (mc) != 'undefined'){
		mc.clearMarkers();	
	}
}

// load tracks into dropdown menu
function setTrackSelection() {
	var select = document.getElementById('trackSelectionList');
	var tracks = new Array();
	var tracksHTML = new Array();
	// collect all tracks
	for (var i = 0; i < measurements.length; i++) {
		if (tracks.indexOf(measurements[i].getTrackId()) == -1) {
			tracksHTML.push(measurements[i].getTrackId() + ' (' + measurements[i].sensors.manufacturer + ' ' + measurements[i].sensors.model + ')');
			tracks.push(measurements[i].getTrackId());
		}
	}
	// remove tracks of former requests
	while (select.length > 0)
	select.remove(0);
	// add an option to show all the tracks(default)
	var opt = document.createElement('option');
	opt.value = "Tracks";
	opt.innerHTML = "Tracks";
	select.appendChild(opt);
	// add all tracks requested
	for (var x = 0; x < tracks.length; x++) {
		var opt = document.createElement('option');
		opt.value =  tracks[x];
		opt.innerHTML = tracksHTML[x];
		select.appendChild(opt);
	}
}

// apply all Filter to map, chart and table
function applyAllFilter(){
	var measurementsTemp = measurements.slice();
	if(trackSelectionActive()){
		focusTrack();	
	}
	if(carSelectionActive()){
		applyCarSelection();
	}
	if(limitFilterActive()){
		// executeLimitFilter();
		redrawData(false, false, true,true,false);
		showMarkersClassified();	
	}
	if(!limitFilterActive()){
		redrawData(true, false, true,true,false);
		analyserMeasurements = measurements.slice();
	}
	setTimeout(function(){
		measurements = measurementsTemp.slice();
	}, 100);	
}

// check if a track is selected or if all tracks shall be displayed
function trackSelectionActive(){
	var select = document.getElementById('trackSelectionList');
	var selectedOption = select.options[select.selectedIndex].value;
	
	//show all tracks
	if(selectedOption === 'Tracks'){
		return false;
	}
	else return true;	
}

// called up whenever a track in the Track Selection List is selected
function focusTrack(){
	var select = document.getElementById('trackSelectionList');
	var selectedOption = select.options[select.selectedIndex].value;
	
	//show all tracks
	if(trackSelectionActive()){
		// delete all measurement objects which don't belong to the chosen track
		for(var i = 0; i < measurements.length; i++){
			if(measurements[i].getTrackId() != selectedOption){
				measurements.splice(i,1);
				i--;
			}
		}
	}	
}

// check if car filtering is necessary, returns true if measurements have to be filtered by car models
function carSelectionActive(){
	var nonselection = document.getElementById('bootstrap-duallistbox-nonselected-list_').options;
	if(nonselection.length == 0) return false;
	else return true;	
}

// filter measurements by car models selected
function applyCarSelection(){
	if(!carSelectionActive()) return;
	var selection = document.getElementById('bootstrap-duallistbox-selected-list_').options;
	for(var i = 0; i < measurements.length; i++){
		var carmodel = measurements[i].sensors.manufacturer + ' ' + measurements[i].sensors.model;
		var keep = false;
		for(var x = 0; x < selection.length; x++){
			if(carmodel == selection[x].value) keep = true;
		}
		if(!keep){
			measurements.splice(i,1);
			i--;
		} 
	}
}

// check if there is a filtering option active, return true if this is the case
function limitFilterActive(){
	if(limitFilterSettings[0] == "reset") return false;
	else return true;	
}

// take over settings from the limit filter popup and close popup
function applyLimitFilter(phen, minValue, maxValue){
	limitFilterSettings[0] = phen;
	limitFilterSettings[1] = minValue;
	limitFilterSettings[2] = maxValue;
	fenster1.close();
	applyAllFilter();
}

// delete all objects from measurement array which do not fit the filter
function executeLimitFilter(){	
	if(limitFilterActive()){
		// sort related measurements back to measurements array
		for (var i = 0; i < measurements.length; i++) {
			for (var j = 0 ; j < measurements[i].phenomenons.length ; j++) {				
				if (measurements[i].getPhenomenons()[j].name == limitFilterSettings[0] && (measurements[i].getValues()[j] < limitFilterSettings[1] || measurements[i].getValues()[j] > limitFilterSettings[2])) {
					measurements.splice(i,1);
					if(i > 0) i--;
				}			
			}
		}
		try{
			if(typeof(measurements[0]) == "undefined"){
			}
			else{
				for (var j = 0 ; j < measurements[0].phenomenons.length ; j++) {				
				if (measurements[0].getPhenomenons()[j].name == limitFilterSettings[0] && (measurements[0].getValues()[j] < limitFilterSettings[1] || measurements[0].getValues()[j] > limitFilterSettings[2])) {
					measurements.splice(0,1);
				}			
				}	
			}	
		}
		catch(e){
			console.log("Measurement could not be filtered! Error Message: " + e.message);
		}
	}
}

/*
 * Called when the map is resized
 * Bounds will be changed to contain all markers in the viewport
 */
function resizeMap() {
	google.maps.event.trigger(map, 'resize');
	if (markers.length > 0) {
		map.fitBounds(markersBounds);
	} else {
		map.setCenter(new google.maps.LatLng(51.478333, 7.555));
		// center of North-Rhine-Westphalia))
	}
}

/**
 *Show filtered measurements classified on the map 
 */
function showMarkersClassified(){
	try {
		var measurementsTemp = measurements.slice();
		if(trackSelectionActive()){
			focusTrack();	
		}
		if(carSelectionActive()){
			applyCarSelection();
		}
		// clear 'old' markers
		clearOverlays();
		// Set timeout to wait for the map to be loaded
		setTimeout(function() {
			for (var i = 0; i < measurements.length; i++) {
				// Create marker for each measurement
				// if there is no filter set, all markers will be displayed as usual
				if(limitFilterSettings[0] == 'reset'){
					var marker = new google.maps.Marker({
						position : measurements[i].getPoint(),
						icon : 'img/circle.png'
					});	
					marker.id = '' + measurements[i].getId() + '';
					markers.push(marker);
					console.log("Nothing to filter here!");
				}
				else{
					// if there is a filter active, the points will be classified and colored in green, red or yellow
					var markerAdded = false;	
					var range = limitFilterSettings[2] - limitFilterSettings[1];
					// the tolerance used for classification
					var tolerance = range * 1/4;
					for (var j = 0 ; j < measurements[i].phenomenons.length ; j++) {			
						if (measurements[i].getPhenomenons()[j].name == limitFilterSettings[0] && (measurements[i].getValues()[j] < limitFilterSettings[1] || measurements[i].getValues()[j] > limitFilterSettings[2])) {
							var marker = new google.maps.Marker({
								position : measurements[i].getPoint(),
								icon : 'img/circle.png'
							});	
							markerAdded = true;
							marker.id = '' + measurements[i].getId() + '';
							markers.push(marker);
						}
						else if(measurements[i].getPhenomenons()[j].name == limitFilterSettings[0] && (measurements[i].getValues()[j] < limitFilterSettings[1]+tolerance || measurements[i].getValues()[j] > limitFilterSettings[2]-tolerance)){
							var marker = new google.maps.Marker({
								position : measurements[i].getPoint(),
								icon : 'img/circle_yellow.png'
							});	
							markerAdded = true;
							marker.id = '' + measurements[i].getId() + '';
							markers.push(marker);
						}									
					}
					if(!markerAdded){
						var marker = new google.maps.Marker({
							position : measurements[i].getPoint(),
							icon : 'img/circle_green.png'
						});
						markerAdded = true;
						marker.id = '' + measurements[i].getId() + '';
						markers.push(marker);
					}	
				}
				createListenerForMarkers(markers[i]);
				markersBounds.extend(measurements[i].getPoint());

				// Create infowindow for marker[i]/measurement[i]
				buildInfoWindow(markers[i], map, measurements[i]);	
			}

			var mcOptions = {
				gridSize : 50,
				maxZoom : maxZoomLevelForClusterer
			};
			mc = new MarkerClusterer(map, markers, mcOptions);
			// Only change the bounds when measurements have been collected
			if (measurements.length > 0) {
				map.fitBounds(markersBounds);
			}
		}, 50);
	} catch(e) {
		alert(e.message);
	}	
}

// shows the measurements classified by their co2 emission in relation to the speed measured
// measurements which do not provide co2 and speed values are displayed as usual
function displayCoSpeedRatioMarkers(){
	try {
		var measurementsTemp = measurements.slice();
		if(trackSelectionActive()){
			focusTrack();	
		}
		if(carSelectionActive()){
			applyCarSelection();
		}
		// clear 'old' markers
		clearOverlays();
		// Set timeout to wait for the map to be loaded
		setTimeout(function() {
			for (var i = 0; i < measurements.length; i++) {
				var speedTemp;
				var co2Temp = null;
				var ratio = null;
				for (var j = 0 ; j < measurements[i].phenomenons.length ; j++) {			
					if(measurements[i].getPhenomenons()[j].name == "Speed"){
						speedTemp = measurements[i].getValues()[j];
					}
					if(measurements[i].getPhenomenons()[j].name == "CO2"){
						co2Temp = measurements[i].getValues()[j];
					}											
				}
				
				if(speedTemp == null || co2Temp == null){
					var marker = new google.maps.Marker({
						position : measurements[i].getPoint(),
						icon : 'img/circle.png'
					});	
					marker.id = '' + measurements[i].getId() + '';
					markers.push(marker);	
				}
				else{
					// set speed minimum to 1
					if(speedTemp == 0) speedTemp += 1;
					// calculate ratio
					ratio = speedTemp / co2Temp;
					
					// display the measurements as green, red or yellow star
					if(ratio <= 3){
						var marker = new google.maps.Marker({
							position : measurements[i].getPoint(),
							icon : 'img/star_red.png'
						});	
						marker.id = '' + measurements[i].getId() + '';
						markers.push(marker);	
					}
					else if(ratio > 3 && ratio <= 6){
						var marker = new google.maps.Marker({
							position : measurements[i].getPoint(),
							icon : 'img/star_yellow.png'
						});	
						marker.id = '' + measurements[i].getId() + '';
						markers.push(marker);	
					}
					else{
						var marker = new google.maps.Marker({
							position : measurements[i].getPoint(),
							icon : 'img/star_green.png'
						});	
						marker.id = '' + measurements[i].getId() + '';
						markers.push(marker);	
					}
					createListenerForMarkers(markers[i]);
					markersBounds.extend(measurements[i].getPoint());
	
					// Create infowindow for marker[i]/measurement[i]
					buildInfoWindow(markers[i], map, measurements[i]);
				}
									
			}

			var mcOptions = {
				gridSize : 50,
				maxZoom : maxZoomLevelForClusterer
			};
			mc = new MarkerClusterer(map, markers, mcOptions);
			// Only change the bounds when measurements have been collected
			if (measurements.length > 0) {
				map.fitBounds(markersBounds);
			}
		}, 50);
	} catch(e) {
		alert(e.message);
	}	
}

/**
 * Show measurements as markers on the map
 */
function showMarkers(query) {
	try {
		// measurements = query.getData();
		// Set timeout to wait for the map to be loaded
		setTimeout(function() {
			for (var i = 0; i < measurements.length; i++) {
				// Create marker for each measurement
				var marker = new google.maps.Marker({
					position : measurements[i].getPoint(),
					icon : 'img/circle.png'
				});
				marker.id = '' + measurements[i].getId() + '';
				markers.push(marker);
				createListenerForMarkers(markers[i]);
				markersBounds.extend(measurements[i].getPoint());

				// Create infowindow for marker[i]/measurement[i]
				buildInfoWindow(marker, map, measurements[i]);
			}

			var mcOptions = {
				gridSize : 50,
				maxZoom : maxZoomLevelForClusterer
			};
			mc = new MarkerClusterer(map, markers, mcOptions);
			// Only change the bounds when measurements have been collected
			if (measurements.length > 0) {
				map.fitBounds(markersBounds);
			}
		}, 50);
	} catch(e) {
		alert(e.message);
	}
}

function createListenerForMarkers(marker) {
	google.maps.event.addListener(marker, 'click', function() {
		// Highlight measurement in the chart
		lineChart.highlight(marker.id);
		// Highlight and go to measurement in the table
		document.getElementById(marker.id).style.backgroundColor = '#66CCFF';
		document.location.hash = "#" + marker.id;
	});
}

/**
 * Refresh the markers on the map depending on the current zoom level:
 * Display markers on map for zoom levels higher than maxZoomLevelForClusterer, otherwise display them via MarkerClusterer
 */
function refreshMarkers(zoom) {
	// Create a MarkerClusterer to display the measurements
	if (zoom > maxZoomLevelForClusterer && mcUsedBefore == false) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		};
		mcUsedBefore = true;
	}
	// Display the measurements directly via markers on the map
	if (zoom <= maxZoomLevelForClusterer && mcUsedBefore == true) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
		};
		mcUsedBefore = false;
	}
}

/**
 * Show InfoWindows on map
 * Creates InfoWindows for every marker on
 * map and in measurement and adds event Listener
 */
function buildInfoWindow(marker, map, measurements) {
	// Setting Content of Infowindow
	try {
		var content = '<div style="font-size:14px;text-align:center">' + '<b>' + "ID: " + measurements.id + '</br> ' + measurements.timestamp + '</br></br>';
		// Add Sensor Data of the measurement in german and english
		var l = getParam('lang');
		if(l == "en"){
			content += "Sensorinformation:" + '</br>' + "SensorId: " + '</b>' + measurements.sensors.id + '</br>' + '<b>' + "Vehicle: " + '</b>' + measurements.sensors.manufacturer + ": " + measurements.sensors.model + " (";
			if (measurements.sensors.fuelType == "gasoline") {
				content += "gasoline" + ")" + '</br></br>' + '<b>' + "Values: " + '</br></b>';
			} else if (measurements.sensors.fuelType == "diesel") {
				content += "diesel" + ")" + '</br></br>' + '<b>' + "Values: " + '</br></b>';
			} else {
				content += measurements.sensors.fuelType + ")" + '</br></br>' + '<b>' + "Messwerte: " + '</br></b>';
			}
			for ( i = 0; i < measurements.phenomenons.length; i++) {

				if (measurements.getPhenomenons()[i].name == "Consumption") {
					content += '<b>' + measurements.phenomenons[i].name + '</b> (' + measurements.phenomenons[i].unit + ')' + ": " + Number((measurements.values[i]).toFixed(6)) + '</br>';
				} else if (measurements.getPhenomenons()[i].name == "CO2") {
					content += '<b>' + measurements.phenomenons[i].name + '</b> (' + measurements.phenomenons[i].unit + ')' + ": " + Number((measurements.values[i]).toFixed(6)) + '</br>';
				} else if (measurements.getPhenomenons()[i].name == "Speed") {
					content += '<b>' + measurements.phenomenons[i].name + '</b> (' + measurements.phenomenons[i].unit + ')' + ": " + Number((measurements.values[i]).toFixed(6)) + '</br>';
				} else if (measurements.getPhenomenons()[i].name == "Engine Load") {
					content += '<b>' + measurements.phenomenons[i].name + '</b> (' + measurements.phenomenons[i].unit + ')' + ": " + Number((measurements.values[i]).toFixed(6)) + '</br>';
				} else if (measurements.getPhenomenons()[i].name == "Rpm") {
					content += '<b>' + measurements.phenomenons[i].name + '</b> (' + measurements.phenomenons[i].unit + ')' + ": " + Number((measurements.values[i]).toFixed(6)) + '</br>';
				}
			}	
		} else {
			content += "Sensorinformationen:" + '</br>' + "SensorId: " + '</b>' + measurements.sensors.id + '</br>' + '<b>' + "Fahrzeug: " + '</b>' + measurements.sensors.manufacturer + ": " + measurements.sensors.model + " (";
			if (measurements.sensors.fuelType == "gasoline") {
				content += "Benzin" + ")" + '</br></br>' + '<b>' + "Messwerte: " + '</br></b>';
			} else if (measurements.sensors.fuelType == "diesel") {
				content += "Diesel" + ")" + '</br></br>' + '<b>' + "Messwerte: " + '</br></b>';
			} else {
				content += measurements.sensors.fuelType + ")" + '</br></br>' + '<b>' + "Messwerte: " + '</br></b>';
			}
			// Add Phenomenons and values to the infoWindow
			for ( i = 0; i < measurements.phenomenons.length; i++) {

				if (measurements.getPhenomenons()[i].name == "Consumption") {
					content += '<b>' + 'Verbrauch' + '</b> (' + measurements.phenomenons[i].unit + ')' + ": " + Number((measurements.values[i]).toFixed(6)) + '</br>';
				} else if (measurements.getPhenomenons()[i].name == "CO2") {
					content += '<b>' + measurements.phenomenons[i].name + '</b> (' + measurements.phenomenons[i].unit + ')' + ": " + Number((measurements.values[i]).toFixed(6)) + '</br>';
				} else if (measurements.getPhenomenons()[i].name == "Speed") {
					content += '<b>' + 'Geschwindigkeit' + '</b> (' + measurements.phenomenons[i].unit + ')' + ": " + Number((measurements.values[i]).toFixed(6)) + '</br>';
				} else if (measurements.getPhenomenons()[i].name == "Engine Load") {
					content += '<b>' + 'Motorlast' + '</b> (' + measurements.phenomenons[i].unit + ')' + ": " + Number((measurements.values[i]).toFixed(6)) + '</br>';
				} else if (measurements.getPhenomenons()[i].name == "Rpm") {
					content += '<b>' + 'Motordrehzahl' + '</b> (' + measurements.phenomenons[i].unit + ')' + ": " + Number((measurements.values[i]).toFixed(6)) + '</br>';
				}
			}
		}		
		content = content + '</div>';

		// Open the InfoWindow when a marker is clicked and
		// closes if user "clicks" into map
		// Function to close infowindow is implemented in smartinfowindow.js
		google.maps.event.addListener(marker, 'click', function(e) {
			//Create a Smart Info Window with options
			new SmartInfoWindow({
				position : marker.getPosition(),
				map : map,
				content : content
			});
		});
	} catch(e) {
		alert(e.message);
	}
}

/**
 * Function to enable the Streetmode.
 * Adds Listener, sets the map overlay and switches cursor to 'crosshair'
 */
function enableStreetmode() {
	// Streetmode on
	streetmode = true;

	// Set Crosshair as cursor
	map.setOptions({
		draggableCursor : 'crosshair'
	});

	// Clear the Exportarray if it is not empty
	if (polyexport.getLength() != 0) {
		polyexport.clear();
	}

	// Set Polyline to Map necessary for reactivating streetmode
	poly.setPath(path);
	poly.setVisible(true);

	// Setup the click event listeners: For Adding Listener to enable streetsegment selection
	streetlistener = google.maps.event.addListener(map, 'click', function(evt) {
		if (google.maps.geometry.poly.containsLocation(evt.latLng, nrwPolygon)) {
			// store actual length of array for adding a 'click' history
			// needed for removing the selection
			removepoints.push(path.length);
			if (path.getLength() == 0) {
				path.push(evt.latLng);
				// Holds the Content in an extra array to export data till user starts a new selection
				polyexport.push(evt.latLng);
				poly.setPath(path);
			} else {
				service.route({
					origin : path.getAt(path.getLength() - 1),
					destination : evt.latLng,
					//Using TravelMode Walking to avoid oneway problem
					travelMode : google.maps.DirectionsTravelMode.DRIVING
				}, function(result, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
							path.push(result.routes[0].overview_path[i]);
							polyexport.push(result.routes[0].overview_path[i]);
						}
					}
				});
			}
		} else {
			var l = getParam('lang');
			if (l == "en") {
				alert('The place you have selected does not lie in the area of application.');
			} else {
				alert('Der ausgewählte Ort liegt nicht im erfassten Anwendungsgebiet.');
			}
		}
	});
	// Setup the click event listener to undo user Selection
	removepointlistener = google.maps.event.addListener(map, 'rightclick', function() {
		if (path.length > 0) {
			// Removes the last 'click' action made by user
			while (path.length != removepoints[removepoints.length - 1]) {
				path.pop(path[path.length - 1]);
				polyexport.pop(polyexport[polyexport.length - 1]);
			}
			// set the path again
			poly.setPath(path);
			// Delete the last Element to step further back in history of clicks
			if (removepoints.length != 0) {
				removepoints.pop(removepoints[removepoints.length - 1]);
			}
		} else {
			var l = getParam('lang');
			if (l == "en") {
				alert("No point existing to remove. Please use leftclick to set a point.");
			} else {
				alert("Es ist kein Punkt mehr zum Entfernen vorhanden. Bitte setzen Sie mit Linksklick einen Punkt.");
			}
		}
	});
}

/**
 * Function to disable the Streetmode and export the collected Data.
 * Removes Listener, clears the map overlay and switches cursor back to 'hand'
 */
function disableStreetmode() {
	// Set Streetmode to false
	streetmode = false;
	// removing Listener
	google.maps.event.removeListener(streetlistener);
	google.maps.event.removeListener(removepointlistener);
	// removing polylines on mapoverlay
	poly.setVisible(false);
	// Clear MVCArray
	path = new google.maps.MVCArray();
	// Deactivate Crosshair
	map.setOptions({
		draggableCursor : null
	});
	// Clear the history array for a later selection
	removepoints = [];
}

/**
 * Function for exporting a Polyline Lat_Lng Element
 * from User Selection of Streetsegments
 * @Return: the underlying Lat_Lng Element at i
 */
function getPolylineAt(i) {
	if (i > polyexport.getLength()) {
		throw "Element not in range";
	} else if (i < 0) {
		throw "No negative Elements";
	} else if (polyexport.getLength() == 0) {
		throw "No Segments have been selected";
	} else {
		return polyexport.getAt(i);
	}
}

/**
 * Function for exporting the whole Polyline representing
 * the user selected streets
 * @return the underlying Lat_Lng Array of the Polyline
 */
function getPolyline() {
	if (polyexport.getLength() == 0) {
		throw "No Segments have been selected";
	} else {
		return polyexport.getArray();
	}
}

/**
 * Function for creating a bounding box overlay on the map
 */
function initBoundingBox() {

	if (BoundingBox == false) {
		setRectangleActive();
		BoundingBox = true;
		var p1 = map.getBounds().getNorthEast();
		var p2 = map.getBounds().getSouthWest();

		var bounds = new google.maps.LatLngBounds(google.maps.geometry.spherical.interpolate(p2, p1, 1 / 3), google.maps.geometry.spherical.interpolate(p1, p2, 1 / 3));

		// Define the rectangle and set its editable property to true.
		rectangle = new google.maps.Rectangle({
			bounds : bounds,
			editable : true,
			draggable : true,
		});
		

		rectangle.setMap(map);
		
		showSize();
		
		//Eventlistener for changing the size of the BoundingBox
		google.maps.event.addListener(rectangle, 'bounds_changed', showSize);
		
	} else {
		setRectangleNonActive();
		BoundingBox = false;
		rectangle.setMap();

		/*if (getParam('lang') == 'en') {
		 alert('The bounding box has been saved successfully!');
		 } else {
		 alert('Die Boundingbox wurde erfolgreich gespeichert!');
		 }*/
	}
}

/**
 * Function for the Eventlistener of the BoundingBox
 */
function showSize(event){

	// Get the coordinates of the BoundingBox
	pointNorthEast = rectangle.getBounds().getNorthEast();
	pointSouthWest = rectangle.getBounds().getSouthWest();

	// Store the x and y coordinates to a variable
	pointNorthEastX = pointNorthEast.lat();
	pointNorthEastY = pointNorthEast.lng();
	pointSouthWestX = pointSouthWest.lat();
	pointSouthWestY = pointSouthWest.lng();
	
	//Investigates whether the BoundinBox is bigger than our defined size and changes
	//eventually the color of the Box and in conjunction with this hides or shows the 'Get Data' Button
	if((pointNorthEastX - pointSouthWestX) > 0.06 || (pointNorthEastY-pointSouthWestY) > 0.12 ){

		rectangle.setOptions({
			strokeColor: '#FF0000',
   			strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#FF0000',
    		fillOpacity: 0.35,
		});
		
		document.getElementById('selectTimeBtn').style.visibility = 'hidden';
	} else {
		rectangle.setOptions({	
			strokeColor: '#008800',
   			strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#00FF00',
    		fillOpacity: 0.35,
		});
    		
		document.getElementById('selectTimeBtn').style.visibility = 'visible';
	}
}

// ------------------------------------
// --- Methods for Interpolation ------
// ------------------------------------
/**
 * Helper/Starter Method for the interpolation
 * Checks which interpolation should be used and which parameters are set
 * Applies the filter to the measurement array
 */
function interpolate() {
	// var query = new Query('measurements');
	// measurements = query.getData();
	// Check wether bounding box is activated or not and trim the polyexport so that only measurements
	// in the bounding box are present
	
	var measurementsTemp = measurements.slice();
	// Check if trackSelection is active and edit the polyexport that only the track will be interpolated
	if(trackSelectionActive()){
		focusTrack();
		polyexport.clear();
		insertTrack();
	}
	if(limitFilterActive()){
		executeLimitFilter();
	}
	if(carSelectionActive()){
		applyCarSelection();
	}
	
	if (BoundingBox == true) {
		polyexport.clear();
		// Changes the polyexport, that it represents the measurements in the boundingbox
		for (var i = 0; i < measurements.length; i++) {
			if (rectangle.getBounds().contains(measurements[i].getPoint()) == true) {
				polyexport.push(measurements[i].getPoint());
			}
		}
	}
	if (polyexport.length == 0) {
		var l = getParam('lang');
		if (l == "en") {
			alert("Please select first street segments to interpolate or create a bounding box.");
		} else {
			alert("Bitte wählen Sie erst Straßensegmente aus um zu Interpolieren oder erstellen Sie eine Bounding Box.");
		}
	} else {

		try {
			// Stores every interpolation into an extra array for switching between selected interpolated phenomenon
			for(var i=0;i<measurements[0].phenomenons.length;i++){
				if(measurements[0].phenomenons[i].name == "Speed"){
					speedmarkers = interpolatePhen("Speed");
					var l = getParam('lang');
					if(l == "en"){
						alert("Speed interpolation completed");
					} else {
						alert("Geschwindigkeit interpoliert")
					}
				}
				else if(measurements[0].phenomenons[i].name == "CO2"){
					co2markers = interpolatePhen("CO2");
					var l = getParam('lang');
					if(l == "en"){
						alert("CO2 interpolation completed");
					} else {
						alert("CO2 interpoliert")
					}
				}
				else if(measurements[0].phenomenons[i].name == "Consumption"){
					consumptionmarkers = interpolatePhen("Consumption");
					var l = getParam('lang');
					if(l == "en"){
						alert("Consumption interpolation completed");
					} else {
						alert("Verbrauch interpoliert")
					}
				}
			}
			// alert("Interpolation succeeded. showIdwSpeed(), showIdwConsumption(), showIdwCo2(), clearIdwDisplay() will show the results.");
			document.getElementById("clearidw").style.display = "block";
			document.getElementById("idwid").style.display = "block";
			
		} catch(e) {
			alert("Could not perform Interpolation. This is the error message: " + e.message);
		}

	}
	measurements = measurementsTemp.slice();	
}
/**
 * Inserts the Track into the interpolation array polyexport
 * Only called when Track selection is active 
 */
function insertTrack(){
	for(var i=0; i<measurements.length; i++){
			polyexport.push(measurements[i].getPoint());
		}
}
/**
 * Displays the result of the Speed interpolation if there was speed data
 * if not function will throw an alert to inform the user that no speed data is available for his selection
 * Removes the overlays of the other Phenomenons CO2 and consumption if available
 */
function showIdwSpeed() {
	try {
		if(typeof(consumptionmarkers) != "undefined"){
			for (var i = 0; i < consumptionmarkers.length; i++) {
				consumptionmarkers[i].setMap(null);
			}	
		}
		if(typeof(co2markers) != "undefined"){
			for (var i = 0; i < co2markers.length; i++) {
				co2markers[i].setMap(null);
			}
		}
		if(typeof(speedmarkers) != "undefined"){
			for (var i = 0; i < speedmarkers.length; i++) {
				speedmarkers[i].setMap(map);
			}
		}
		else if(typeof(speedmarkers)== "undefined"){
			alert("Probably no Speed Data available.")
		}
	} catch(e) {
		alert("Probably no Speed Data available. This is the error message: " + e.message);
	}
}
/**
 * Displays the result of the CO2 interpolation if there is CO2 data
 * if not function will throw an alert to inform the user that no CO2 data is available for his selection
 * Removes the overlays of the other Phenomenons speed and consumption if available
 */
function showIdwCo2() {
	try {
		if(typeof(consumptionmarkers) != "undefined"){
			for (var i = 0; i < consumptionmarkers.length; i++) {
				consumptionmarkers[i].setMap(null);
			}	
		}
		if(typeof(speedmarkers) != "undefined"){
			for (var i = 0; i < speedmarkers.length; i++) {
			speedmarkers[i].setMap(null);
			}
		}
		if(typeof(co2markers) != "undefined"){
			for (var i = 0; i < co2markers.length; i++) {
				co2markers[i].setMap(map);
			}
		}
		else if(typeof(co2markers)== "undefined"){
			alert("Probably no CO2 Data available.")
		}
	} catch(e) {
		alert("Probably no CO2 Data available. This is the error message: " + e.message);
	}

}
/**
 * Displays the result of the Consumpotion interpolation if there is Consumption data
 * if not function will throw an alert to inform the user that no consumption data is available for his selection
 * Removes the overlays of the other Phenomenons speed and CO2 if available
 */
function showIdwConsumption() {
	try {
		if(typeof(co2markers) != "undefined"){
			for (var i = 0; i < co2markers.length; i++) {
				co2markers[i].setMap(null);
			}
		}
		if(typeof(speedmarkers) != "undefined"){
			for (var i = 0; i < speedmarkers.length; i++) {
			speedmarkers[i].setMap(null);
			}
		}
		if(typeof(consumptionmarkers) != "undefined"){
			for (var i = 0; i < consumptionmarkers.length; i++) {
				consumptionmarkers[i].setMap(map);
			}
		}
		else if(typeof(consumptionmarkers)== "undefined"){
			alert("Probably no Consumption Data available.")
		}
	} catch(e) {
		alert("Probably no Consumption Data available. This is the error message: " + e.message);
	}
}
/**
 * Removes all available interpolation overlays 
 */
function clearIdwDisplay() {
	try {
		if(typeof(co2markers) != "undefined"){
			for (var i = 0; i < co2markers.length; i++) {
				co2markers[i].setMap(null);
			}
		}
		if(typeof(speedmarkers) != "undefined"){
			for (var i = 0; i < speedmarkers.length; i++) {
			speedmarkers[i].setMap(null);
			}
		}
		if(typeof(consumptionmarkers) != "undefined"){
			for (var i = 0; i < consumptionmarkers.length; i++) {
				consumptionmarkers[i].setMap(null);
			}	
		}
	} catch(e) {
		alert(e.message);
	}
	document.getElementById("clearidw").style.display = "none";
	document.getElementById("idwid").style.display = "none";
}
/**
 * Helper Method for the selection
 */
function IDWSelection() {
	var idw = document.getElementById("idwid");
	var selected = idw.options[idw.selectedIndex].value;

	//alert(selected);
	if (selected == "co2") {
		showIdwCo2();
	} else if (selected == "consumption") {
		showIdwConsumption();

	} else if (selected == "speed") {
		showIdwSpeed();
	}
}

/**
 * Calculates distance between 2 points
 */ 
function distance(p1, p2) {
	var dist = google.maps.geometry.spherical.computeDistanceBetween(p1, p2);
	return dist;
}

/**
 * Interpolates the selected streetsegments for the phenomenon given
 * by idwkey. Creates marker along the polyline and sets a color for it specific
 * for the interpolated (Inverse Distance Weighting) value.
 * @param idwkey (phenomenon.name to interpolate)
 * @return idwmarkers (the marker array with the interpolated values)
 */
function interpolatePhen(idwkey) {
	var idwmarkers = [];
	this.idwkey = new String(idwkey);

	// Classify the values
	var classarray = classifyValues(measurements, idwkey);
	// var measurements = query.getData();
	// Create the markers along the selected road segments
	for (var i = 0, k = 1; k < getPolyline().length; i++, k++) {
		var origin = getPolylineAt(i);
		var destination = getPolylineAt(k);
		for (var j = 1; j <=25; j++) {
			var step = (1 / 25);
			var interpolated = google.maps.geometry.spherical.interpolate(origin, destination, step * j);
			var numerator = 0;
			var denominator = 0;
			// Define numerator of IDW
			for (var m = 0; m < measurements.length; m++) {
				for(var n = 0; n < measurements[m].phenomenons.length; n++){
					if(measurements[m].phenomenons[n].name == idwkey){
						var alpha = measurements[m].values[n];
						var p1 = measurements[m].getPoint();
						var p2 = interpolated;
						var beta = Math.pow(distance(p1, p2), 2);
						var gamma = (alpha / beta);
						numerator = (numerator + gamma);
						// console.log("numerator: " + numerator);
					}
				}
				
				
			}
			// Define denominator of IDW
			for (var m = 0; m < measurements.length; m++) {
				var alpha = 1;
				var p1 = measurements[m].getPoint();
				var p2 = interpolated;
				var beta = Math.pow(distance(p1, p2), 2);
				var gamma = (alpha / beta);
				denominator = (denominator + gamma);
				// console.log("denominator: " + denominator);
			}
			// Calculate IDW Value for the actual marker
			var interpolatedValues = (numerator / denominator);
			// console.log(interpolatedValues);
			
			/**
			 * Decides in which class the value lies and returns the corresponding color
			 * Chooses the corresponding classes folder depending on the number of classes
			 * to show better differences 
			 */
			var getColor = function() {
				for (var i = 0, n = classarray.length; i < classarray.length; i++ || i <= 0) {
					if (interpolatedValues <= classarray[i]) {
						var color = n.toString()+'/' + i.toString();
						return color;
					} else if (interpolatedValues > classarray[classarray.length - 1]) {
						var color = n.toString() + '/' + "max";
						return color;
					} else {
						continue;
					}
					return color;
				}
			};
			// bind the color to the marker specific to it's value'
			var color = getColor();
			// refers to the corresponding classes folder and builds the referer(uri) to the icon
			var idwicon = 'img/interpolated/' + color + '.png';
			// if color "undefined" is returned the interpolated Value is "NaN" and that is the case
			// for all points where the interpolated value is on exactly the same location as the measurement point
			// and no marker is needed and won't be created
			if(typeof(color)!= "undefined"){
				
				var idwmarker = new google.maps.Marker({
				position : interpolated,
				icon : idwicon
				});
				// Create a info window for the marker to see the specific value
				// bound to the marker
				buildSmallInfoWindow(idwmarker, map, interpolatedValues);

				idwmarkers.push(idwmarker);
			}
		}
	}
	// return the interpolated marker array
	return idwmarkers;
}

/**
 * Classifies the Phenomenon given by @idwkey of a measurement object by standard deviation
 * and returns an array with the class breaks.
 * @param: measurement(Measurement object), idwkey (Phenomenon.name e.g. Speed)
 * @return: classes(Array with class breaks)
 */
function classifyValues(measurements, idwkey) {
	var mean = 0, sd = 0, total = 0, idwvalues = [];
	// Store values of the phenomenon in an extra Array
	for (var i = 0; i < measurements.length; i++) {
		
		for(var n = 0; n < measurements[i].phenomenons.length; n++){
			if (measurements[i].phenomenons[n].name == idwkey){
				idwvalues.push(measurements[i].values[n]);
			}
		}	
	}
	// Sort Array
	idwvalues.sort(numSort);
	// Calculate mean
	for (var i = 0, n = idwvalues.length; i < n; i++) {
		total += idwvalues[i];
	}
	mean = (total / idwvalues.length);
	// Calculates standarddeviation
	total = 0;
	for (var i = 0; i < idwvalues.length; i++) {
		var deviation = idwvalues[i] - mean;
		total += deviation * deviation;
	}
	sd = Math.sqrt(total / (idwvalues.length - 1));
	// Count the number of Intervals/classes
	var numIntervals = 0;
	while (numIntervals * sd < idwvalues[idwvalues.length - 1]) {
		numIntervals++;
	}
	var classes = [];
	// Store the Interval breaks into an array
	for (var i = 1; i < numIntervals; i++) {
		var val = (i * sd);
		classes.push(val);
	}
	for (var i = 0; i < classes.length; i++) {
		console.log("Klasse " + i + " " + classes[i]);
	}
	return classes;

}

// Helper function to sort Numbers
function numSort(a, b) {
	return (a - b);
}
/**
 * Creates a small infoWindow for a marker to display the interpolated value 
 */
function buildSmallInfoWindow(idwmarker, map, interpolatedValues) {
	var contentString = '<div id="content">' + '<div id="siteNotice">' + '</div>' + interpolatedValues + '</div>' + '</div>';
	var infowindow = new google.maps.InfoWindow({
		content : contentString
	});
	google.maps.event.addListener(idwmarker, 'click', function() {
		infowindow.open(map, idwmarker);
	});
}

/**
 * Changes the polyexport, that it represents the measurements in the boundingbox
 * @param {String} idwkey represents the Phenomenon which should be interpolated
 */
// function interpolateBoundingBox(idwkey){
// this.idwkey = new String(idwkey);
// // Create a Polyline
// polyexport.clear();
// //Get all points in the boundingbox
// for(var i=0;i<measurements.length;i++){
// if(rectangle.getBounds().contains(measurements[i].getPoint()) == true){
// polyexport.push(measurements[i].getPoint());
// }
// }
// interpolate();
// }

// ----------------------------------------
// --- End of methods for Interpolation ---
// ----------------------------------------

// ----------------------------------
// --- End of methods for the map ---
// ----------------------------------
