/**
 * @author Marius Runde
 */
var map;
var markers = [];

// initialize the map
function initMap() {
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
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
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

// ------------------------
// --- Phenomenon class ---
// ------------------------
// Constructor with limits
function Phenomenon(name, unit, lowerLimit, upperLimit) {
	this.name		= name;
	this.unit		= unit;
	this.lowerLimit	= lowerLimit;
	this.upperLimit	= upperLimit;
}
// Constructor without limits (e.g. GPS Accuracy; limits will be set to -1)
function Phenomenon(name, unit) {
	this.name		= name;
	this.unit		= unit;
	this.lowerLimit	= -1;
	this.upperLimit	= -1;
}

// Setting the variables
Phenomenon.prototype.name;
Phenomenon.prototype.unit;
Phenomenon.prototype.upperLimit;
Phenomenon.prototype.lowerLimit;

// --- Getter and setter ---
Phenomenon.prototype.getName		= function()			{ return this.name; }
Phenomenon.prototype.setName		= function(name)		{ this.name = name; }
Phenomenon.prototype.getUnit		= function()			{ return this.unit; }
Phenomenon.prototype.setUnit		= function(unit)		{ this.unit = unit; }
Phenomenon.prototype.getLowerLimit	= function()			{ return this.lowerLimit; }
Phenomenon.prototype.setLowerLimit	= function(lowerLimit)	{ this.lowerLimit = lowerLimit; }
Phenomenon.prototype.getUpperLimit	= function()			{ return this.upperLimit; }
Phenomenon.prototype.setUpperLimit	= function(upperLimit)	{ this.upperLimit = upperLimit; }
// --- End of getter and setter ---

// Phenomenon to string
Phenomenon.prototype.toString = function() {
	if (this.lowerLimit < 0 || this.upperLimit < 0) {
		return "(Phenomenon:" + this.name + ", Unit:" + this.unit + ")";
	} else {
		return "(Phenomenon:" + this.name + ", Unit:" + this.unit + ", LowerLimit:" + this.lowerLimit + ", UpperLimit:" + this.upperLimit + ")";
	}
}
// -------------------------------
// --- End of Phenomenon class ---
// -------------------------------

// Default phenomenons
defaultPhenomenons = [];
defaultPhenomenons.push(new Phenomenon("CO2", "kg/h", 0, 0));
defaultPhenomenons.push(new Phenomenon("Calculated MAF", "g/s", 0, 0));
defaultPhenomenons.push(new Phenomenon("Consumption", "l/h", 0, 0));
defaultPhenomenons.push(new Phenomenon("Engine Load", "%", 0, 0));
defaultPhenomenons.push(new Phenomenon("GPS Accuracy", "%"));
defaultPhenomenons.push(new Phenomenon("GPS Altitude", "m"));
defaultPhenomenons.push(new Phenomenon("GPS Bearing", "deg"));
defaultPhenomenons.push(new Phenomenon("GPS HDOP", "precision"));
defaultPhenomenons.push(new Phenomenon("GPS PDOP", "precision"));
defaultPhenomenons.push(new Phenomenon("GPS Speed", "km/h", 0, 0));
defaultPhenomenons.push(new Phenomenon("GPS VDOP", "precision"));
defaultPhenomenons.push(new Phenomenon("Intake Pressure", "kPa", 0, 0));
defaultPhenomenons.push(new Phenomenon("Intake Temperature", "c", 0, 0));
defaultPhenomenons.push(new Phenomenon("MAF", "l/s", 0, 0));
defaultPhenomenons.push(new Phenomenon("Rpm", "u/min", 0, 0));
defaultPhenomenons.push(new Phenomenon("Speed", "km/h", 0, 0));
defaultPhenomenons.push(new Phenomenon("Throttle Position", "%", 0, 0));
defaultPhenomenons.push(new Phenomenon("Fuel System Loop", "boolean number", 0, 0));
defaultPhenomenons.push(new Phenomenon("Fuel System Status Code", "category", 0, 0));
defaultPhenomenons.push(new Phenomenon("Long-Term Fuel Trim 1", "%", 0, 0));
defaultPhenomenons.push(new Phenomenon("O2 Lambda Current", "A", 0, 0));
defaultPhenomenons.push(new Phenomenon("O2 Lambda Current ER", "ratio", 0, 0));
defaultPhenomenons.push(new Phenomenon("O2 Lambda Voltage", "V", 0, 0));
defaultPhenomenons.push(new Phenomenon("O2 Lambda Voltage ER", "ratio", 0, 0));
defaultPhenomenons.push(new Phenomenon("Short-Term Fuel Trim 1", "%", 0, 0));

// -------------------------
// --- Measurement class ---
// -------------------------
// Constructor
function Measurement(id, point, timestamp, phenomenons, values) {
	this.id				= id;
	this.point			= point;
	this.timestamp		= timestamp;
	this.phenomenons	= phenomenons;
	this.values			= values;
}

// Setting the variables
Measurement.prototype.id;
Measurement.prototype.point;
Measurement.prototype.timestamp;
Measurement.prototype.phenomenons;
Measurement.prototype.values;

// --- Getter and setter ---
Measurement.prototype.getId 			= function()			{ return this.id; }
Measurement.prototype.setId 			= function(id)			{ this.id = id; }
Measurement.prototype.getPoint 			= function()			{ return this.point; }
Measurement.prototype.setPoint 			= function(point)		{ this.point = point; }
Measurement.prototype.getTimestamp 		= function()			{ return this.timestamp; }
Measurement.prototype.setTimestamp 		= function(timestamp)	{ this.timestamp = timestamp; }
Measurement.prototype.getPhenomenons	= function()			{ return this.phenomenons; }
Measurement.prototype.setPhenomenons	= function(phenomenons)	{ this.phenomenons = phenomenons; }
Measurement.prototype.getValues			= function()			{ return this.values; }
Measurement.prototype.setValues			= function(values)		{ this.values = values; }
// --- End of getter and setter ---

// Measurement to string
Measurement.prototype.toString = function() {
	var measurement = "(ID:" + this.id + ", Point:" + this.point + ", Timestamp:" + this.timestamp;
	for (var i=0; i < this.phenomenons.length; i++) {
		measurement = measurement + ", Phenomenon_" + i + ":" + this.phenomenons[i].toString() + ", Value_" + i + ":" + this.values[i];
	};
	return measurement + ")"; 
}

// Get all phenomenons of a measurement that are in the limit interval
Measurement.prototype.inLimitInterval = function() {
	var result = [],
	j = 0;
	for (var i=0; i < this.phenomenons.length; i++) {
		if (this.phenomenons[i][0].getLowerLimit() <= this.phenomenons[i][1] && this.phenomenons[i][0].getUpperLimit() >= this.phenomenons[i][1]) {
			result[j] = this.phenomenons[i];
			j++;
		}
	}
	return result;
}

// Get all phenomenons of a measurement that are out of the limit interval
// true: more than upper limit, false: less than lower limit
Measurement.prototype.outOfLimitInterval = function() {
	var result = [],
	j = 0;
	for (var i=0; i < this.phenomenons.length; i++) {
		if (this.phenomenons[i][0].getLowerLimit() > this.phenomenons[i][1]) {
			result[j][0] = this.phenomenons[i];
			result[j][1] = false;
			j++;
		} else if (this.phenomenons[i][0].getUpperLimit() < this.phenomenons[i][1]) {
			result[j][0] = this.phenomenons[i];
			result[j][1] = true;
			j++;
		}
		return result;
	}
	return result;
}
// --------------------------------
// --- End of Measurement class ---
// --------------------------------

// --------------------
// --- Filter class ---
// --------------------
// Constructor
function Filter(parameters, track, startTime, endTime, vehicleManufacturer, fuelType) {
	this.parameters				= parameters;
	this.track					= track;
	this.startTime				= startTime;
	this.endTime				= endTime;
	this.vehicleManufacturer	= vehicleManufacturer;
	this.fuelType				= fuelType;
}

// Setting the variables
Filter.prototype.parameters;
Filter.prototype.track;
Filter.prototype.startTime;
Filter.prototype.endTime;
Filter.prototype.vehicleManufacturer;
Filter.prototype.fuelType;

// --- Getter and setter ---
Filter.prototype.getParameters			= function()					{ return this.parameters; }
Filter.prototype.setParameters			= function(parameters)			{ this.parameters = parameters; }
Filter.prototype.getTrack				= function()					{ return this.track; }
Filter.prototype.setTrack				= function(track)				{ this.track = track; }
Filter.prototype.getStartTime			= function()					{ return this.startTime; }
Filter.prototype.setStartTime			= function(startTime)			{ this.startTime = startTime; }
Filter.prototype.getEndTime				= function()					{ return this.endTime; }
Filter.prototype.setEndTime				= function(endTime)				{ this.endTime = endTime; }
Filter.prototype.getVehicleManufacturer	= function()					{ return this.vehicleManufacturer; }
Filter.prototype.setVehicleManufacturer	= function(vehicleManufacturer)	{ this.vehicleManufacturer = vehicleManufacturer; }
Filter.prototype.getFuelType			= function()					{ return this.fuelType; }
Filter.prototype.setFuelType			= function(fuelType)			{ this.fuelType = fuelType; }
// --- End of getter and setter ---
// ---------------------------
// --- End of Filter class ---
// ---------------------------

// -------------------
// --- Query class ---
// -------------------
// Constructor without filter

// Constructor with filter
function Query(filter) {
	this.filter	= filter;
}

// Setting the variables
Query.prototype.filter;

// Get the measurements from an URL and parse the JSON file into a Measurement array
Query.prototype.getMeasurements = function(url) {
	var result = [],
	tempId,
	tempPoint,
	tempTimestamp,
	tempPhenomenons = [],
	tempValues = [];
	$.getJSON(url, function(json) {
		$.each(json, function(index, data) {
			$.each(data, function(arrayIndex, arrayElement) {
				$.each(arrayElement, function(key, value) {
					// Get the geometry of the measurement
					if (key == "geometry") {
						$.each(value, function(geomKey, geomValue) {
							if (geomKey == "coordinates") {
								var lat = geomValue[1];
								var lng = geomValue[0];
								tempPoint = new google.maps.LatLng(lat, lng);
								/*markers.push(new google.maps.Marker({
									position: tempPoint,
									map: map
								}));*/ // TODO must be deleted lateron, only for testing purposes
							}
						});
					}
					// Get the properties of the measurement
					if (key == "properties") {
						$.each(value, function(propKey, propValue) {
							// Get the id of the measurement
							if (propKey == "id") {
								tempId = propValue;
							}
							// Get the timestamp of the measurement
							if (propKey == "time") {
								tempTimestamp = propValue;
							}
							// Get the sensor of the measurement
							if (propKey == "sensor") {
								// TODO
							}
							// Get the phenomenons of the measurement
							if (propKey == "phenomenons") {
								$.each(propValue, function(phenKey, phenValue) {
									var tempName = phenKey;
									$.each(phenValue, function(singlePhenKey, singlePhenValue) {
										if (singlePhenKey == "unit") {
											tempPhenomenons.push(new Phenomenon(tempName, singlePhenValue));
										}
										if (singlePhenKey == "value") {
											tempValues.push(singlePhenValue);
										}
									});
								});
							}
						});
					}
				});
				result.push(new Measurement(tempId, tempPoint, tempTimestamp, tempPhenomenons, tempValues));
			});
		});
	});
	return result;
}
// --------------------------
// --- End of Query class ---
// --------------------------