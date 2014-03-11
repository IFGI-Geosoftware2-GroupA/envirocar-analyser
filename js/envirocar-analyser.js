/**
 * @author Marius Runde, Daniel Sawatzky, Thiemo Gaertner
 */
// ------------------------
// --- Phenomenon class ---
// ------------------------
// Constructor with limits
function Phenomenon(name, unit, lowerLimit, upperLimit) {
	try {
		this.name		= new String(name);
		this.unit		= new String(unit);
		this.lowerLimit	= new Number(lowerLimit);
		this.upperLimit	= new Number(upperLimit);
	} catch(e) {
		alert(e.message);
	}
}
// Constructor without limits (e.g. GPS Accuracy; limits will be set to -1)
function Phenomenon(name, unit) {
	try {
		this.name		= new String(name);
		this.unit		= new String(unit);
		this.lowerLimit	= -1;
		this.upperLimit	= -1;
	} catch(e) {
		alert(e.message);
	}
}

// Setting the variables
Phenomenon.prototype.name;
Phenomenon.prototype.unit;
Phenomenon.prototype.upperLimit;
Phenomenon.prototype.lowerLimit;

// --- Getter and setter ---
Phenomenon.prototype.getName		= function()			{ return this.name; };
Phenomenon.prototype.setName		= function(name)		{ this.name = name; };
Phenomenon.prototype.getUnit		= function()			{ return this.unit; };
Phenomenon.prototype.setUnit		= function(unit)		{ this.unit = unit; };
Phenomenon.prototype.getLowerLimit	= function()			{ return this.lowerLimit; };
Phenomenon.prototype.setLowerLimit	= function(lowerLimit)	{ this.lowerLimit = lowerLimit; };
Phenomenon.prototype.getUpperLimit	= function()			{ return this.upperLimit; };
Phenomenon.prototype.setUpperLimit	= function(upperLimit)	{ this.upperLimit = upperLimit; };
// --- End of getter and setter ---

// Phenomenon to string
Phenomenon.prototype.toString = function() {
	if (this.lowerLimit < 0 || this.upperLimit < 0) {
		return "(Phenomenon:" + this.name + ", Unit:" + this.unit + ")";
	} else {
		return "(Phenomenon:" + this.name + ", Unit:" + this.unit + ", LowerLimit:" + this.lowerLimit + ", UpperLimit:" + this.upperLimit + ")";
	}
};

/**
 * Phenomenon equals method
 * Return values:
 * -1: otherPhenomenon is not an object of the class Phenomenon
 *  0: the name and the unit of the otherPhenomenon differ from the source object
 *  1: the name and the unit of the otherPhenomenon are the same but the limits differ
 *  2: both objects are equal
 */
Phenomenon.prototype.equals = function(otherPhenomenon) {
	try {
		if (this.name.localeCompare(otherPhenomenon.getName()) == 0 && this.unit.localeCompare(otherPhenomenon.getUnit()) == 0) {
			if (this.lowerLimit == otherPhenomenon.getLowerLimit() && this.upperLimit == otherPhenomenon.getUpperLimit()) {
				return 2;
			} else {
				return 1;
			}
		} else {
			return 0;
		}
	} catch(e) {
		return -1;
	}
};
// -------------------------------
// --- End of Phenomenon class ---
// -------------------------------

// Default phenomenons
defaultPhenomenons = [];
// 95 kg/h is the EU limit for 2021 and 130 for 2015.
defaultPhenomenons.push(new Phenomenon("CO2", "kg/h", 95, 130));
// defaultPhenomenons.push(new Phenomenon("Calculated MAF", "g/s", 0, 0));
// 5 l/h is the consumption of a economical car in average and 15 l/h of a non-economical car in the city and/or uphill.
defaultPhenomenons.push(new Phenomenon("Consumption", "l/h", 5, 15));
// 0% menas that the car is in no-load, 100% means full throttle
defaultPhenomenons.push(new Phenomenon("Engine Load", "%", 0, 100));
// defaultPhenomenons.push(new Phenomenon("GPS Accuracy", "%"));
// defaultPhenomenons.push(new Phenomenon("GPS Altitude", "m"));
// defaultPhenomenons.push(new Phenomenon("GPS Bearing", "deg"));
// defaultPhenomenons.push(new Phenomenon("GPS HDOP", "precision"));
// defaultPhenomenons.push(new Phenomenon("GPS PDOP", "precision"));
// defaultPhenomenons.push(new Phenomenon("GPS Speed", "km/h", 0, 0));
// defaultPhenomenons.push(new Phenomenon("GPS VDOP", "precision"));
// defaultPhenomenons.push(new Phenomenon("Intake Pressure", "kPa", 0, 0));
// defaultPhenomenons.push(new Phenomenon("Intake Temperature", "c", 0, 0));
// defaultPhenomenons.push(new Phenomenon("MAF", "l/s", 0, 0));
// Belor 1000 u/min normally means non-load, over 3000 normally means to run at too high revs
defaultPhenomenons.push(new Phenomenon("Rpm", "u/min", 1000, 3000));
// Below 40 km/h means slow city speed, above 130 km/h means above the German advisory speed limit
defaultPhenomenons.push(new Phenomenon("Speed", "km/h", 40, 130));
// defaultPhenomenons.push(new Phenomenon("Throttle Position", "%", 0, 0));
// defaultPhenomenons.push(new Phenomenon("Fuel System Loop", "boolean number", 0, 0));
// defaultPhenomenons.push(new Phenomenon("Fuel System Status Code", "category", 0, 0));
// defaultPhenomenons.push(new Phenomenon("Long-Term Fuel Trim 1", "%", 0, 0));
// defaultPhenomenons.push(new Phenomenon("O2 Lambda Current", "A", 0, 0));
// defaultPhenomenons.push(new Phenomenon("O2 Lambda Current ER", "ratio", 0, 0));
// defaultPhenomenons.push(new Phenomenon("O2 Lambda Voltage", "V", 0, 0));
// defaultPhenomenons.push(new Phenomenon("O2 Lambda Voltage ER", "ratio", 0, 0));
// defaultPhenomenons.push(new Phenomenon("Short-Term Fuel Trim 1", "%", 0, 0));

// --------------------
// --- Sensor class ---
// --------------------
// Constructor
function Sensor(type, id, model, fuelType, manufacturer, constructionYear) {
	try {
		if (type == "car") {
			// TODO Only allow 'gasoline' and 'diesel' as fuel types?
			if (fuelType == "gasoline" || fuelType == "diesel") {
				this.id					= new String(id);
				this.model				= new String(model);
				this.fuelType			= new String(fuelType);
				this.manufacturer		= new String(manufacturer);
				this.constructionYear	= new Number(constructionYear);
			} else {
				alert("Could not create Sensor. Fuel type " + fuelType + " is not accepted.");
			}
		} else {
			alert("Could not create Sensor. Sensor is not of type 'car'.");
		}
	} catch(e) {
		alert("Could not create Sensor. This is the error message: " + e.message);
	}
}

// Setting the variables
Sensor.prototype.id;
Sensor.prototype.model;
Sensor.prototype.fuelType;
Sensor.prototype.manufacturer;
Sensor.prototype.constructionYear;

// --- Getter ---
Sensor.prototype.getId					= function() { return this.id; };
Sensor.prototype.getModel				= function() { return this.model; };
Sensor.prototype.getFuelType			= function() { return this.fuelType; };
Sensor.prototype.getManufacturer		= function() { return this.manufacturer; };
Sensor.prototype.getConstructionYear	= function() { return this.constructionYear; };
// --- End of getter ---

// --- Setter ---
Sensor.prototype.setId = function(id) {
	try {
		this.id = new String(id);
	} catch(e) {
		alert("Could not change id. This is the error message: " + e.message);
	}
};
Sensor.prototype.setModel = function(model) {
	try {
		this.model = new String(model);
	} catch(e) {
		alert("Could not change model. This is the error message: " + e.message);
	}
};
Sensor.prototype.setFuelType = function(fuelType) {
	try {
		// TODO Only allow 'gasoline' and 'diesel' as fuel types?
		if (fuelType.equals("gasoline") || fuelType.equals("diesel")) {
			this.fuelType = new String(fuelType);
		} else {
			alert("Could not change fuel type. Fuel type " + fuelType + " is not accepted.");
		}
	} catch(e) {
		alert("Could not change fuel type. This is the error message: " + e.message);
	}
};
Sensor.prototype.setManufacturer = function(manufacturer) {
	try {
		this.manufacturer = new String(manufacturer);
	} catch(e) {
		alert("Could not change manufacturer. This is the error message: " + e.message);
	}
};
Sensor.prototype.setConstructionYear = function(constructionYear) {
	try {
		this.constructionYear = new Number(constructionYear);
	} catch(e) {
		alert("Could not change construction year. This is the error message: " + e.message);
	}
};
// --- End of setter ---

/**
 * Parse a JSON object into a Sensor object
 */
Sensor.prototype.parseJSON = function(json) {
	var s;
	typeof s === Sensor;
	
	var tempId,
	tempModel,
	tempFuelType,
	tempManufacturer,
	tempConstructionYear;
	
	try {
		$.each(json, function(index, data) {
			var isCar = false;
			$.each(data, function(key, value) {
				if (key == "type" && value == "car") {
					isCar = true;
				}
				if (key == "properties" && isCar) {
					$.each(value, function(propKey, propValue) {
						if (propKey == "id") {
							tempId = new String(propValue);
						}
						
						if (propKey == "model") {
							tempModel = new String(propValue);
						}
						
						if (propKey == "fuelType") {
							// TODO Only allow 'gasoline' and 'diesel' as fuel types?
							if (fuelType.equals("gasoline") || fuelType.equals("diesel")) {
								tempFuelType = new String(propValue);
							} else {
								alert("Could not parse JSON object into a Sensor object. Fuel type " + fuelType + " is not accepted.");
								return;
							}
						}
						
						if (propKey == "manufacturer") {
							tempManufacturer = new String(propValue);
						}
						
						if (propKey == "constructionYear") {
							tempConstructionYear = new Number(propValue);
						}
					});
					
					s = new Sensor("car", tempId, tempModel, tempFuelType, tempManufacturer, tempConstructionYear);
				}
			});
		});
	} catch(e) {
		alert("Could not parse JSON object into a Sensor object. This is the error message: " + e.message);
		return;
	}
	
	return s;
};
// ---------------------------
// --- End of Sensor class ---
// ---------------------------

// -------------------------
// --- Measurement class ---
// -------------------------
// Constructor
function Measurement(id, point, timestamp, phenomenons, values, sensors) {
	try {
		this.id				= new String(id);
		this.point			= point;
		this.timestamp		= new Date(timestamp);
		this.phenomenons	= phenomenons;
		this.values			= values;
		this.sensors		= sensors;
	} catch(e) {
		alert("Could not create Measurement. This is the error message: " + e.message);
	}
}

// Setting the variables
Measurement.prototype.id;
Measurement.prototype.point;
Measurement.prototype.timestamp;
Measurement.prototype.phenomenons;
Measurement.prototype.values;
Measurement.prototype.sensors;

// --- Getter ---
Measurement.prototype.getId 			= function() { return this.id; };
Measurement.prototype.getPoint 			= function() { return this.point; };
Measurement.prototype.getTimestamp 		= function() { return this.timestamp; };
Measurement.prototype.getPhenomenons	= function() { return this.phenomenons; };
Measurement.prototype.getValues			= function() { return this.values; };
Measurement.prototype.getSensors		= function() { return this.sensors;};
// --- End of getter ---

// --- Setter ---
Measurement.prototype.setId	= function(id) {
	try {
		this.id = new String(id);
	} catch(e) {
		alert("Could not change id. This is the error message: " + e.message);
	}
};
Measurement.prototype.setPoint = function(point) {
	try {
		this.point = point;
	} catch(e) {
		alert("Could not change point. This is the error message: " + e.message);
	}
};
Measurement.prototype.setTimestamp = function(timestamp) {
	try {
		this.timestamp = new Date(timestamp);
	} catch(e) {
		alert("Could not change timestamp. This is the error message: " + e.message);
	}
};
Measurement.prototype.setPhenomenons = function(phenomenons) {
	try {
		this.phenomenons = phenomenons;
	} catch(e) {
		alert("Could not change phenomenons. This is the error message: " + e.message);
	}
};
Measurement.prototype.setValues = function(values) {
	try {
		this.values = values;
	} catch(e) {
		alert("Could not change values. This is the error message: " + e.message);
	}
};
Measurement.prototype.setSensors = function(sensors) {
	try {
		this.sensors = sensors;
	} catch(e) {
		alert("Could not change sensors. This is the error message: " + e.message);
	}
};
// --- End of setter ---

// Measurement to string
Measurement.prototype.toString = function() {
	var measurement = "(ID:" + this.id + ", Point:" + this.point + ", Timestamp:" + this.timestamp;
	for (var i=0; i < this.phenomenons.length; i++) {
		measurement = measurement + ", Phenomenon_" + i + ":" + this.phenomenons[i].toString() + ", Value_" + i + ":" + this.values[i];
	};
	return measurement + ")"; 
};

/**
 * Measurement equals method
 * Return values:
 * -1: otherMeasurement is not an object of the class Measurement
 *  0: the id of the otherMeasurement differs from the source object
 *  1: the id of both objects is the same but the point and/or the timestamp differ from the source object
 *  2: the id, point and timestamp of both objects are the same but at least one phenomenon's value of the otherMeasurement seems to differ from the source object
 *  3: the id, point, timestamp and phenomenons of both objects are the same but at least one values' value of the otherMeasurement seems to differ from the source object
 *  4: both objects are equal
 */
Measurement.prototype.equals = function(otherMeasurement) {
	try {
		if (this.id.localeCompare(otherMeasurement.getId()) == 0) {
			if (this.point.equals(otherMeasurement.getPoint()) && this.timestamp.toString().localeCompare(otherMeasurement.getTimestamp().toString()) == 0) {
				if (this.phenomenons.length != otherMeasurement.getPhenomenons().length) {
					return 2;
				} else {
					for (var i=0; i < this.phenomenons.length; i++) {
						if (this.phenomenons[i].equals(otherMeasurement.getPhenomenons()[i]) <= 0) {
							return 2;
						}
					};
				}
				if (this.values.length != otherMeasurement.getValues().length) {
					return 3;
				} else {
					for (var i=0; i < this.values.length; i++) {
						if (this.values[i] != otherMeasurement.getValues()[i]) {
							return 3;
						}
					};
				}
				return 4;
			} else {
				return 1;
			}
		} else {
			return 0;
		}
	} catch(e) {
		return -1;
	}
};

/**
 * Get all phenomenons of a measurement that are in the limit interval
 */
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
};

/**
 * Get all phenomenons of a measurement that are out of the limit interval
 * Return values in 2nd dimension of the returned array:
 * true: value is higher than upper limit
 * false: value is less than lower limit
 */
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
};
// --------------------------------
// --- End of Measurement class ---
// --------------------------------

// --------------------
// --- Filter class ---
// --------------------
// Constructor with filter options
function Filter(fo) {
	try {
		// Spatial filter
		if (fo.bbox != null) {
			this.bbox = new Boundingbox(fo.bbox.minX, fo.bbox.minY, fo.bbox.maxX, fo.bbox.maxY);
		}
	} catch(e) {
		alert("Could not create Filter. This is the error message: " + e.message);
	}
	// this.parameters		= parameters;
	// this.track			= new String(track);
	// this.startTime		= new Date(startTime);
	// this.endTime			= new Date(endTime);
	// this.manufacturer	= new String(manufacturer);
	// this.fuelType		= new String(fuelType);
}

// Setting the variables
Filter.prototype.bbox;

// Create an URL readable String from the Filter
Filter.prototype.createUrlValue = function() {
	var url = "";
	
	// Spatial filter (bounding box)
	if (this.bbox != null) {
		url += this.bbox.toUrlValue();
	}
	
	// If the URL contains information put a question mark at the beginning
	if (url == "") {
		return url;
	} else {
		return "?" + url;
	}
};
// ---------------------------
// --- End of Filter class ---
// ---------------------------

// -------------------------
// --- Boundingbox class ---
// -------------------------
/*
 * Constructor with four points
 * If the points are different than from South-West to North-East
 * they will be swapped automatically
 */
function Boundingbox(minX, minY, maxX, maxY) {
	try {
		this.minX = new Number(minX);
		this.minY = new Number(minY);
		this.maxX = new Number(maxX);
		this.maxY = new Number(maxY);
		
		// Swap the points if necessary
		if (this.minX > this.maxX) {
			var tempX = this.minX;
			this.minX = this.maxX;
			this.maxX = tempX;
		}
		if (this.minY > this.maxY) {
			var tempY = this.minY;
			this.minY = this.maxY;
			this.maxY = tempY;
		}
	} catch(e) {
		alert("Could not create Boundingbox out of four points. This is the error message: " + e.message);
	}
}

// Constructor with google.maps.LatLngBounds
function Boundingbox(latLngBounds) {
	try {
		this.minX = latLngBounds.getSouthWest().lat();
		this.minY = latLngBounds.getSouthWest().lng();
		this.maxX = latLngBounds.getNorthEast().lat();
		this.maxY = latLngBounds.getNorthEast().lng();
	} catch(e) {
		alert("Could not create Boundingbox out of LatLngBounds. This is the error message: " + e.message);
	}
}

// Setting the variables
Boundingbox.prototype.minX;
Boundingbox.prototype.minY;
Boundingbox.prototype.maxX;
Boundingbox.prototype.maxY;

// Boundingbox to String
Boundingbox.prototype.toUrlValue = function() {
	return this.minX + "," + this.minY + "," + this.maxX + "," + this.maxY;
};
// --------------------------------
// --- End of Boundingbox class ---
// --------------------------------

// -------------------
// --- Query class ---
// -------------------
/**
 * Constructor without filter
 * To see the possible keywords look at the function 'getData()'
 */
function Query(keyword) {
	try {
		this.url		= "https://envirocar.org/api/stable/";
		this.keyword	= new String(keyword);
		this.filter		= null;
	} catch(e) {
		alert("Could not create Query. This is the error message: " + e.message);
	}
}

/**
 * Constructor with filter
 * To see the possible keywords look at the function 'getData()'
 */
function Query(keyword, filter) {
	try {
		this.url		= "https://envirocar.org/api/stable/";
		this.keyword	= new String(keyword);
		this.filter		= filter;
	} catch(e) {
		alert("Could not create Query. This is the error message: " + e.message);
	}
}

// Setting the variables
Query.prototype.url;
Query.prototype.keyword;
Query.prototype.filter;

/**
 * Get the data depending on the used filter and keyword
 * Possible keywords:
 * - measurements
 * - sensors
 * - tracks (not implemented yet)
 */
Query.prototype.getData = function() {
	if (this.keyword == 'measurements') {
		return this.getMeasurements();
	}
	if (this.keyword == 'sensors') {
		return this.getSensors();
	}
};

// Get the measurements from an URL and parse the JSON file into a Measurement array
Query.prototype.getMeasurements = function() {
	// Create a temporal URL
	var queryURL = this.url + "measurements";
	if (this.filter != null) {
		queryURL += this.filter.createUrlValue();
	}
	
	var result = [];
	typeof result === Measurement;
	var tempId,
	tempPoint,
	tempTimestamp,
	tempPhenomenons,
	tempValues;
	
	var stempId,
	stempModel,
	stempFuelType,
	stempManufacturer,
	stempConstructionYear,
	stempSensor,
	stempType;
	
	var json = (function () {
		var requestedJson = null;
		$.ajax({
			'async': false,
			// Requesting a local file due to the cross domain constrait explained above
			'url': queryURL,
			'dataType': "json",
			// If request succeeded the callback function stores the requested JSON to var = json 
			'success': function (data) {requestedJson = data;},
			'error': function(jqXHR, textStatus, errorThrown) {alert('Error ' + errorThrown);}
		});
		return requestedJson;
	})();
	
	$.each(json.features, function(arrayIndex, arrayElement) {
		$.each(arrayElement, function(key, value) {
			// Get the geometry of the measurement
			if (key == "geometry") {
				$.each(value, function(geomKey, geomValue) {
					if (geomKey == "coordinates") {
						var lat = geomValue[1];
						var lng = geomValue[0];
						tempPoint = new google.maps.LatLng(lat, lng);
					}
				});
			}
			// Get the properties of the measurement
			if (key == "properties") {
				$.each(value, function(propKey, propValue) {
					// Get the id of the measurement
					if (propKey == "id") {
						tempId = propValue;
						tempPhenomenons=[];
						tempValues=[];
						tempSensors=[];
						var isCar = false;
					}
					// Get the timestamp of the measurement
					if (propKey == "time") {
						tempTimestamp = propValue;
					}
					// Get the sensor of the measurement
					if (propKey == "sensor") {
						$.each(propValue, function(senKey, senValue){
							if(senKey == "type"){
								stempType = senValue;
							}
							if(senKey == "properties"){
								$.each(senValue, function(singleSenKey, singleSenValue){
									if(singleSenKey == "id"){
										stempId = new String(singleSenValue);
									}
									if(singleSenKey == "model"){
										stempModel = new String(singleSenValue);
									}
									if(singleSenKey == "fuelType"){
							
										stempFuelType = new String(singleSenValue);
										
									}
									if (singleSenKey == "manufacturer") {
										stempManufacturer = new String(singleSenValue);
									}
									
									if (singleSenKey == "constructionYear") {
										stempConstructionYear = new Number(singleSenValue);
									}
								});
								stempSensor = new Sensor(stempType, stempId, stempModel, stempFuelType, stempManufacturer, stempConstructionYear);
							}
						});
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
		result.push(new Measurement(tempId, tempPoint, tempTimestamp, tempPhenomenons, tempValues, stempSensor));
	});
	return result;
};

/**
 * Get the sensors (the cars) from an URL and parse the JSON file into a Sensor array
 */
Query.prototype.getSensors = function() {
	var result = [];
	typeof result === Sensor;
	
	$.getJSON(this.url, function(json) {
		$.each(json, function(index, data) {
			result.push(new Sensor.parseJSON(data));
		});
	});
};
// --------------------------
// --- End of Query class ---
// --------------------------
