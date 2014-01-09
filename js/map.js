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
	
	// Bounds for North-Rhine-Westphalia
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
	
	// Listen for the event fired when the user selects an item from the
 	// pick list. Retrieve the matching places for that item.
 	google.maps.event.addListener(searchBox, 'places_changed', function() {
		var places = searchBox.getPlaces();
		
		// For each place, get the icon, place name, and location.
		var bounds = new google.maps.LatLngBounds();
		for (var i = 0, place; place = places[i]; i++) {
			var image = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			};
			bounds.extend(place.geometry.location);
		}
		map.fitBounds(bounds);
		map.setZoom(14);
	});
 	
	// Bias the SearchBox results towards places that are within the bounds of the
 	// current map's viewport.
 	google.maps.event.addListener(map, 'bounds_changed', function() {
		var bounds = map.getBounds();
		searchBox.setBounds(bounds);
	});
}

/**
 * Geocoding an address
 */
function codeAddress() {
	var address = document.getElementById('geocoding_address').value;
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (nrwBounds.contains(results[0].geometry.location)) {
				map.setCenter(results[0].geometry.location);
			} else {
				alert('Die gesuchte Stadt liegt nicht im erfassten Anwendungsgebiet.');
			}
		} else {
			alert('Die Suche war nicht erfolgreich.');
		}
	});
}

/**
 * Show measurements as markers on the map
 * The measurements must be collected within 1000ms
 */
function showMarkers(query) {
	try {
		var measurements = query.getMeasurements();
		setTimeout(function() {
			for (var i=0; i < measurements.length; i++) {
				var marker = new google.maps.Marker({
			  		position: measurements[i].getPoint(),
			  		map: map
				});
				markers.push(marker);
				markersBounds.extend(measurements[i].getPoint());
				
				// Call function to create infoWindow
				buildInfoWindow(marker,map,measurements[i]);
			};
			map.fitBounds(markersBounds);
		}, 500);
	} catch(e) {
		alert(e.message);
	}
}

/**
 * Show InfoWindows on map 
 * Creates InfoWindows for every marker on 
 * map and in measurement and adds event Listener 
 */
function buildInfoWindow(marker,map,measurements){   
	//Setting the content of the Infowindow
	var contentString = '<div id="content">' +
							'<div id="siteNotice">' +
							'</div>' +
							'<h4 id="firstHeading" class="firstHeading">'+"ID:" + measurements.id + '</h4>' +
							'<div id="bodyContent">' +
							"Timestamp:" + measurements.timestamp +
							measurements.values[0] +
							'</div>';
	// Declaring InfoWindow
	var infowindow = new google.maps.InfoWindow({
		content: contentString,
		maxWidth: 140
	});
	// Adding Listener
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
		console.log(marker);
	});
}
// ----------------------------------
// --- End of methods for the map ---
// ----------------------------------