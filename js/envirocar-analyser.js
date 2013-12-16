/**
 * @author Marius Runde
 */

// ------------------------
// --- Phenomenon class ---
// ------------------------
// Constructor
function Phenomenon(name, unit, lowerLimit, upperLimit) {
	this.name		= name;
	this.unit		= unit;
	this.lowerLimit	= lowerLimit;
	this.upperLimit	= upperLimit;
}

// Setting the variables
Phenomenon.prototype.name;
Phenomenon.prototype.unit;
Phenomenon.prototype.upperLimit;
Phenomenon.prototype.lowerLimit;

// Get the name of the Phenomenon
Phenomenon.prototype.getName = function() {
	return this.name;
}

// Get the unit of the Phenomenon
Phenomenon.prototype.getUnit = function() {
	return this.unit;
}

// Get the lower limit of the Phenomenon
Phenomenon.prototype.getLowerLimit = function () {
	return this.lowerLimit;
}

// Get the upper limit of the Phenomenon
Phenomenon.prototype.getUpperLimit = function () {
	return this.upperLimit;
}
// -------------------------------
// --- End of Phenomenon class ---
// -------------------------------

// -------------------------
// --- Measurement class ---
// -------------------------
// Constructor
function Measurement (latitude, longitude, timestamp, phenomenons) {
	this.point			= new Point(latitude, longitude);
	this.timestamp		= timestamp;
	this.phenomenons	= phenomenons;
}

Measurement.prototype.point;
Measurement.prototype.timestamp;
Measurement.prototype.phenomenons;

Measurement.prototype.inLimitInterval = function() {
	var result = new Array(),
	j = 0;
	for (var i=0; i < this.phenomenons.length; i++) {
		if (this.phenomenons[i][0].getLowerLimit() <= this.phenomenons[i][1] && this.phenomenons[i][0].getUpperLimit() >= this.phenomenons[i][1]) {
			result[j] = this.phenomenons[i];
			j++;
		}
	}
	return result;
}

function outOfLimitInterval() {
	var result = new Array(),
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