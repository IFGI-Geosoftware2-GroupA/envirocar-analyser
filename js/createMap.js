/**
 * @author Marius Runde
 */

// initialize the map
function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(51.478333, 7.555), // center of North-Rhine-Westphalia
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
		},
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scaleControl: true,
		streetViewControl: false,
		zoom: 9,
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.DEFAULT
		}
	};
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
	// Bounds for North-Rhine-Westphalia
	var nrwBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(50.3, 5.8), // south west 
		new google.maps.LatLng(52.6, 9.5) // north east
	);
	
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
}

// load the map when the rest of the window has been loaded
function loadScript() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?v=3.14&key=AIzaSyAmIbYf9N82UMsx0t2-CUCNmQLhG9asRlA&sensor=true&' +
		'callback=initialize';
	document.body.appendChild(script);
}