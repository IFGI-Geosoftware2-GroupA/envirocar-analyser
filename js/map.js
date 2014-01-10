/**
 * @author Marius Runde, Daniel Sawatzky, Thiemo Gaertner
 */
// ---------------------------
// --- Methods for the map ---
// ---------------------------
// Variables for the map, markers and markers bounds
var map,
nrwBounds,
markers = [],
mc,
mcUsedBefore = true,
maxZoomLevelForClusterer = 12,
markersBounds = new google.maps.LatLngBounds(),
geocoder = new google.maps.Geocoder();

/**
 * Initialize the map
 */
function initMap() {
	var mapOptions = {
		// center: new google.maps.LatLng(51.478333, 7.555), // center of North-Rhine-Westphalia
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
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
	
	// Listen for the dragend event
	google.maps.event.addListener(map, 'dragend', function() {
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
	
	// Listen for the event fired when the user selects an item from the
	// pick list. Retrieve the matching places for that item.
	google.maps.event.addListener(searchBox, 'places_changed', function() {
		var places = searchBox.getPlaces();
		if (google.maps.geometry.poly.containsLocation(places[0].geometry.location, nrwPolygon)) {
			var bounds = new google.maps.LatLngBounds();
			map.setCenter(places[0].geometry.location);
			map.setZoom(14);
		} else {
			alert('Der gesuchte Ort liegt nicht im erfassten Anwendungsgebiet.');
		}
	});
	
	// Bias the SearchBox results towards places that are within the bounds of the
	// current map's viewport.
	google.maps.event.addListener(map, 'bounds_changed', function() {
		var bounds = map.getBounds();
		searchBox.setBounds(bounds);
	});
}

/**
 * Show measurements as markers on the map
 * The measurements must be collected within 500ms
 */
function showMarkers(query) {
	try {
		var measurements = query.getMeasurements();
		setTimeout(function() {
			for (var i=0, j=0, k=1,l=2,m=3; i < measurements.length; i++,j=j+4,k=k+4,l=l+4,m=m+4) {
				var marker = new google.maps.Marker({
					position: measurements[i].getPoint(),
					icon: 'img/circle.png'
				});
				markers.push(marker);
				markersBounds.extend(measurements[i].getPoint());
				
				// Variables for Infowindow
					// Create Variables for values 
					var val1 = measurements[i].values[j];
					var val2 = measurements[i].values[k];
					var val3 = measurements[i].values[l];
					var val4 = measurements[i].values[m];
					// Create Variables for Phenomenons
					var phen1 = measurements[i].phenomenons[j];
					var phen2 = measurements[i].phenomenons[k];
					var phen3 = measurements[i].phenomenons[l];
					var phen4 = measurements[i].phenomenons[m];
				// Create InfoWindow with the specific Pheonomenons and values to avoid 
				// arrangement problems of arrays and parsing
				buildInfoWindow(marker,map,measurements[i],val1,val2,val3,val4,phen1,phen2,phen3,phen4);
			};
			var mcOptions = {gridSize: 50, maxZoom: maxZoomLevelForClusterer};
			mc = new MarkerClusterer(map, markers, mcOptions);
			map.fitBounds(markersBounds);
		}, 500);
	} catch(e) {
		alert(e.message);
	}
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
function buildInfoWindow(marker,map,measurements,val1,val2,val3,val4,phen1,phen2,phen3,phen4){   
	// Setting Content of Infowindow
	var content = '<div style="text-align: center; font-size:14px;">'+
						'<center><b>'+"ID: "+ measurements.id +
						'</br> '+ measurements.timestamp +'</b></br>' +
						phen1+ " Value: " + val1+ " " + '</br>'+
						phen2+ " Value: " + val2+ " " + '</br>'+
						phen3+ " Value: " + val3+ " " + '</br>'+
						phen4+ " Value: " + val4+ " " + '</br>'+
						
					'</center>'+
				'</div>';
        // ------------------------------------
        // --- Listener for the InfoWindow ---
        // ------------------------------------
        // Open the InfoWindow when a marker is clicked and
        // closes if user "clicks" into map
        // Function to close infowindow is implemented in smartinfowindow.js
		google.maps.event.addListener(marker, 'click', function(e) {
		//Create a Smart Info Window with options
			new SmartInfoWindow({position: marker.getPosition(),map: map,content: content});
		});
		 // -----------------------------------------
        // --- End of Listener for the InfoWindow ---
        // ------------------------------------------
}
// ----------------------------------
// --- End of methods for the map ---
// ----------------------------------