/**
 * @author Marius Runde, Daniel Sawatzky, Thiemo Gaertner
 */
// ---------------------------
// --- Methods for the map ---
// ---------------------------
// Variables for the map, markers, markers bounds and BoundingBox
var map,
nrwBounds,
markers = [],
mc,
mcUsedBefore = true,
maxZoomLevelForClusterer = 12,
markersBounds = new google.maps.LatLngBounds();
BoundingBox = false;
// Variables for collecting Streetsegments
var path = new google.maps.MVCArray(),
service = new google.maps.DirectionsService(),
poly,
streetmode = false,
alerted = false,
streetlistener,
removepointlistener;
var polyexport = new google.maps.MVCArray();
var removepoints = [];
var idwmarkers = [];
var rectangle;
/**
 * Initialize the map
 */
function initMap() {
	var mapOptions = {
		center: new google.maps.LatLng(51.478333, 7.555), // center of North-Rhine-Westphalia)
		mapTypeControl: true,
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID, "OSM"],
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
		},
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		minZoom: 8,
		scaleControl: true,
		streetViewControl: false,
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.DEFAULT
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
	nrwBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(50.3, 5.8), // south west 
		new google.maps.LatLng(52.6, 9.5) // north east
	);
	map.fitBounds(nrwBounds);
	
	// Grey out the rest of the world
	var greyOutPolygon = new google.maps.Polygon({
		clickable: false,
		paths: [nrwBoundaries, everythingElse],
		strokeColor: 'grey',
		strokeOpacity: 0.85,
		strokeWeight: 2,
		fillColor: 'grey',
		fillOpacity: 0.7
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
			var c = map.getCenter(),
			x = c.lng(),
			y = c.lat(),
			maxX = nrwBounds.getNorthEast().lng(),
			maxY = nrwBounds.getNorthEast().lat(),
			minX = nrwBounds.getSouthWest().lng(),
			minY = nrwBounds.getSouthWest().lat();
			
			if (x < minX) x = minX;
			if (x > maxX) x = maxX;
			if (y < minY) y = minY;
			if (y > maxY) y = maxY;
			
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
	
	 // Create the DIV to hold the streetmode control and call the collectStreets() constructor
	 // passing in this DIV.
	 /*
	 var streetControlDiv = document.createElement('div');
	 var streetcontrol = new collectStreets(streetControlDiv, map);
	
	 streetControlDiv.index = 1;
	 map.controls[google.maps.ControlPosition.TOP_RIGHT].push(streetControlDiv);
	 */
	 
	 // Creates the polyline to hold the waypoints for displaying the overlay streetsegment selection
	 poly = new google.maps.Polyline({ map: map, editable: true, geodesic: true,strokeColor: "#CC33FF"});

	
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
     map.setCenter(new google.maps.LatLng(51.478333, 7.555)); // center of North-Rhine-Westphalia))
 }
}
 
/**
 * Show measurements as markers on the map
 * The measurements must be collected within 500ms
 */
function showMarkers(query) {
	try {
		var measurements = query.getData();
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
		}, 700);
	} catch(e) {
		alert(e.message);
	}
}

function createListenerForMarkers(marker) {
	google.maps.event.addListener(marker, 'click', function(){
		lineChart.highlight(marker.id);
		document.getElementById(marker.id).style.backgroundColor = '#66CCFF';
	});
}

/**
 * Refresh the markers on the map depending on the current zoom level:
 * Display markers on map for zoom levels higher than maxZoomLevelForClusterer, otherwise display them via MarkerClusterer
 */
function refreshMarkers(zoom) {
	// Create a MarkerClusterer to display the measurements
	if (zoom > maxZoomLevelForClusterer && mcUsedBefore == false) {
		for (var i=0; i < markers.length; i++) {
			markers[i].setMap(null);
		};
		mcUsedBefore = true;
	}
	// Display the measurements directly via markers on the map
	if (zoom <= maxZoomLevelForClusterer && mcUsedBefore == true) {
		for (var i=0; i < markers.length; i++) {
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
function buildInfoWindow(marker,map,measurements){   
	// Setting Content of Infowindow
	try{
		var content = '<div style="font-size:14px;text-align:center">'+
						'<b>'+"ID: "+ measurements.id +
						'</br> '+ measurements.timestamp +'</br></br>';			
		// Add Sensor Data of the measurement
		content += 	"Sensorinformationen:"+'</br>'+
					"SensorId: "+'</b>'+measurements.sensors.id +'</br>'+
					'<b>' + "Fahrzeug: "+'</b>'+
				    measurements.sensors.manufacturer + ": "+
				    measurements.sensors.model + " (";
	    if (measurements.sensors.fuelType == "gasoline") {
	    	 content+= "Benzin" + ")"+'</br></br>'
				    + '<b>'+ "Messwerte: "+'</br></b>';
	    } else if (measurements.sensors.fuelType == "diesel") {
	    	content+= "Diesel" + ")"+'</br></br>'
				    + '<b>'+ "Messwerte: "+'</br></b>';
	    } else {
	    	 content+= measurements.sensors.fuelType + ")"+'</br></br>'
				    + '<b>'+ "Messwerte: "+'</br></b>';
	    }
		
		// Add Phenomenons and values to the infoWindow
		for(i=0;i<measurements.phenomenons.length;i++){
			content += '<b>' + measurements.phenomenons[i].name + '</b> (' + measurements.phenomenons[i].unit + ')'+
			": " + Number((measurements.values[i]).toFixed(6)) + '</br>';
		}
		content = content + '</div>';
		
        // Open the InfoWindow when a marker is clicked and
        // closes if user "clicks" into map
        // Function to close infowindow is implemented in smartinfowindow.js
		google.maps.event.addListener(marker, 'click', function(e) {
		//Create a Smart Info Window with options
			new SmartInfoWindow({position: marker.getPosition(),map: map,content: content});
		});
	} catch(e) {
		alert(e);
	}
}		

/**
 * Function to enable the Streetmode.
 * Adds Listener, sets the map overlay and switches cursor to 'crosshair'
 */
function enableStreetmode(){
	// Streetmode on
  	streetmode = true;
  	
  	// Set Crosshair as cursor
  	map.setOptions({draggableCursor:'crosshair'});
  	
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
			        origin: path.getAt(path.getLength() - 1),
			        destination: evt.latLng,
			        //Using TravelMode Walking to avoid oneway problem
			        travelMode: google.maps.DirectionsTravelMode.DRIVING
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
  	removepointlistener = google.maps.event.addListener(map, 'rightclick', function(){
		if (path.length > 0) {
			// Removes the last 'click' action made by user
	  		while(path.length != removepoints[removepoints.length-1]){
	  		path.pop(path[path.length-1]);
	  		polyexport.pop(polyexport[polyexport.length-1]);
	  		}
	  		// set the path again
	  		poly.setPath(path);
	  		// Delete the last Element to step further back in history of clicks
	  		if (removepoints.length!=0) {
	  			removepoints.pop(removepoints[removepoints.length-1]);
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
function disableStreetmode(){
 	// Set Streetmode to false
 	streetmode=false;
 	// removing Listener
 	google.maps.event.removeListener(streetlistener);
 	google.maps.event.removeListener(removepointlistener);
 	// removing polylines on mapoverlay
 	poly.setVisible(false);
 	// Clear MVCArray
 	path = new google.maps.MVCArray();
 	// Deactivate Crosshair
 	map.setOptions({draggableCursor:null});
 	// Clear the history array for a later selection
 	removepoints=[]; 
}

/**
 * Function for exporting a Polyline Lat_Lng Element 
 * from User Selection of Streetsegments
 * @Return: the underlying Lat_Lng Element at i
 */
function getPolylineAt(i){
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
function getPolyline(){
	if (polyexport.getLength() == 0) {
		throw "No Segments have been selected";
	} else{
		return polyexport.getArray();
	}
}

// Create a bounding box overlay on the map
function initBoundingBox(){
	if (BoundingBox == false) {
		BoundingBox = true;		
		var p1 = map.getBounds().getNorthEast();
	    var p2 = map.getBounds().getSouthWest();
		
		var bounds = new google.maps.LatLngBounds(
			google.maps.geometry.spherical.interpolate(p2,p1, 1/3),
			google.maps.geometry.spherical.interpolate(p1,p2, 1/3)
		);
		
		// Define the rectangle and set its editable property to true.
		rectangle = new google.maps.Rectangle({
			bounds: bounds,
			editable: true,
			draggable: true
		});
		
		rectangle.setMap(map);
	} else {
		BoundingBox = false;
		rectangle.setMap();
		
		if (getParam('lang') == 'en') {
			alert('The bounding box has been saved successfully!');
		} else {
			alert('Die Boundingbox wurde erfolgreich gespeichert!');
		}
	}
}

// ------------------------------------
// --- Methods for Interpolation ------
// ------------------------------------
/**
 * Interpolates the selected streetsegments for the phenomenon given
 * by idwkey. Creates marker along the polyline and sets a color for it specific
 * for the interpolated (Inverse Distance Weighting) value.
 * @param idwkey (phenomenon.name to interpolate)
 */
function interpolate(idwkey) {
	if (polyexport.length == 0) {
		var l = getParam('lang');
			if (l == "en") {
				alert("Please select first street segments to interpolate or create a bounding box.");
			} else {
				alert("Bitte wählen Sie erst Straßensegmente aus um zu Interpolieren oder erstellen Sie eine Bounding Box.");
			}	
	} else {
		this.idwkey = new String(idwkey);
		setTimeout(function(){
			var query = new Query('measurements');
			var measurements = query.getData();
		}, 500);
		// Classify the values
		var classarray = classifyValues(measurements, idwkey);
		//var measurements = query.getData();
		// Create the markers along the selected road segments
		for (var i=0, k=1; k < getPolyline().length; i++, k++){
			var origin = getPolylineAt(i);
			var destination = getPolylineAt(k);
			for (var j=1; j <= 25; j++){
				var step = (1/25);
				var interpolated= google.maps.geometry.spherical.interpolate(origin, destination, step * j);
				var numerator =0;
				var denominator = 0;
				// Define numerator of IDW
				for (var m=0; m < measurements.length; m++){
					var n = 0;
					while(measurements[m].phenomenons[n].name != idwkey){
						n++;
					}
					var alpha = measurements[m].values[n];
					var p1 = measurements[m].getPoint();
					var p2 = interpolated;
					var beta = Math.pow(distance(p1,p2), 2);
					var gamma = (alpha/beta);
					numerator = (numerator + gamma);
				}
				// Define denominator of IDW
				for (var m=0; m < measurements.length; m++){
					var alpha = 1;
					var p1 = measurements[m].getPoint();
					var p2 =interpolated;
					var beta = Math.pow(distance(p1, p2), 2);
					var gamma = (alpha/beta);
					denominator = (denominator + gamma);
				}
				// Calculate IDW Value for the actual marker
				var interpolatedValues=(numerator / denominator);
				console.log(interpolatedValues);
				
				// Decides in which class the value lies and return the corresponding color
				var getColor = function(){	
					for (var i=0; i<classarray.length; i++ || i<=0){
						if (interpolatedValues < classarray[i]) {
							var color = i.toString();
							return color;
						} else if (interpolatedValues > classarray[classarray.length-1]) {
							var color ="max";
							return color;
						} else {
							continue;
						}
						
						return color;
					}
				};
				
				var color = getColor();
				var idwicon = 'img/interpolated/'+color+'.png';
				var marker = new google.maps.Marker({
					position : interpolated,
					icon: idwicon	
				});
				buildSmallInfoWindow(marker, map, interpolatedValues);
					
				idwmarkers.push(marker);
			}
		}
		for (var i=0; i < idwmarkers.length; i++){
			idwmarkers[i].setMap(map);
		}
	}
}

// Calculates distance between 2 points
function distance(p1, p2) {
	var dist = google.maps.geometry.spherical.computeDistanceBetween(p1, p2);
	return dist;
}

/**
 * Classifies the Phenomenon given by @idwkey of a measurement object by standard deviation
 * and returns an array with the class breaks.
 * @param: measurement(Measurement object), idwkey (Phenomenon.name e.g. Speed)
 * @return: classes(Array with class breaks)
 */
function classifyValues(measurements, idwkey) {
	var mean = 0,
	sd=0,
	total=0,
	idwvalues = [];
	// Store values of the phenomenon in an extra Array
	for (var i=0; i < measurements.length; i++) {
		n=0;
		while(measurements[i].phenomenons[n].name != idwkey) {
			n++;
		}
		idwvalues.push(measurements[i].values[n]);
	}
	// Sort Array
	idwvalues.sort(numSort);
	// Calculate mean
	for (var i=0, n=idwvalues.length; i < n ;i++) {
		total += idwvalues[i];
	}
	mean = (total/idwvalues.length);
	// Calculates standarddeviation
	total = 0;
	for (var i=0; i < idwvalues.length; i++) {
		var deviation = idwvalues[i]-mean;
		total += deviation*deviation;
	}
	sd = Math.sqrt(total/(idwvalues.length -1));
	// Count the number of Intervals/classes
	var numIntervals = 0;
	while (numIntervals*sd < idwvalues[idwvalues.length-1]) {
		numIntervals++;
	}
	var classes = [];
		// Store the Interval breaks into an array
		for (var i=1; i < numIntervals; i++) {
			var val = (i*sd);
			classes.push(val);
		}
	return classes;
}

// Helper function to sort Numbers
function numSort(a, b) { 
   return (a - b);
} 

function buildSmallInfoWindow(marker, map, interpolatedValues){
	var contentString= '<div id="content">' +
		'<div id="siteNotice">' +
		'</div>' +
		interpolatedValues +
		'</div>' +
		'</div>';
	var infowindow = new google.maps.InfoWindow({
		content: contentString});
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});
}

/**
 * Changes the polyexport, that it represents the measurements in the boundingbox
 * @param {String} idwkey represents the Phenomenon which should be interpolated
 */
function interpolateBoundingBox(idwkey){
	this.idwkey = new String(idwkey);
	// Create a Polyline
	polyexport.clear();
	//Get all points in the boundingbox
	for(var i=0;i<measurements.length;i++){
		if(rectangle.getBounds().contains(measurements[i].getPoint()) == true){
			polyexport.push(measurements[i].getPoint());
		}	
	}
	interpolate(idwkey);
}

		// ----------------------------------------
        // --- End of methods for Interpolation ---
        // ----------------------------------------
        
// ----------------------------------
// --- End of methods for the map ---
// ----------------------------------
