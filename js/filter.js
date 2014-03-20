/**
 * @author Jan-Philipp Heine
 * 
 * This class contains methods for creating the REST requests which queries the envirocar API. Spatial and temporal querying is contained.
 */

var startDate;	// Global variable containing the startDate based on the date-from element
var endDate;	// Global variable containing the endDate base on the date-to element
var baseUrl = "https://envirocar.org/api/stable/tracks?during=";	//Global variable specifying the URL for the temporal filter contributed by the envirocar API
var envirocarTrackUrl = "https://envirocar.org/api/stable/tracks/";	// Global variable specifying the URL which returns all recorded tracks by the envirocar API
var baseUrlBBox = "https://envirocar.org/api/stable/tracks?bbox=";	// Global variable specifying the URL for the spatial filter contributed by the envirocar API
var hyphen = "-";
var literalT = "T";
var literalZ = "Z";
var comma = ",";
var BBoxPrefix = "&bbox=";
var doublePoint = ":";
var rectangleActive = false;	// Global variable which contains the boolean if a the rectangle is active or not

/*
 * getDateTime() This method gets the values from the date-from and date-to element. These values are used for building the string in order to start a temporal query. Afterwards it will 
 * query the envirocar API to get the tracks.
 * Additionally it is parsing the requested information, and the Car Model and track ID is displayed in the trackSelectionList element.
 * On change an alert will appear which displays additional information.
 * 
 * This method is NOT implemented
 * 
 * @return This method returns the requestUrlTemporal for a temporal query
 */

function getDateTime() {
	
	// clears the dropdown trackSelectionList element
	$('#trackSelectionList').empty();
	
	// Getting the values of the date-x element where the date and the time is displayed
	startDate = $('#date-from').val();
	endDate = $('#date-to').val();
	
	// Check if a start and end date is specifyed. If not the user gets an alert
	if (startDate == '' || endDate == '') {
		if (getParam('lang') == 'en') {
			alert('No start and / or end date selected');
		} else {
			alert('Kein Start- und / oder Endzeitpunkt ausgewählt');
		}
	} else {
		
		// Storing the value of the date-from box in a variable
		var startDate = $('#date-from').val();
		
		// Storing the value of the date-to box in a variable
		var endDate = $('#date-to').val();
		
		alert("Sie haben den Startzeitpunkt " + startDate + " und den Endzeitpunkt " + endDate + " ausgewählt.");
		
		// Getting the literals from the date-from box and start building the first part of the string
		// If used this unusual way to get the date and time because the functions contributed by the jQuery framework not worked properly for me
		
		// storing the literals for the start year
		var year = startDate.charAt(6);
		var year1 = startDate.charAt(7);
		var year2 = startDate.charAt(8);
		var year3 = startDate.charAt(9);
		
		// combining the baseUrl with the year
		var baseUrlYear = baseUrl.concat(year, year1, year2, year3,hyphen);
		
		// storing the literals for the start month
		var month = startDate.charAt(3);
		var month1 = startDate.charAt(4);
		
		// combining the baseUrlYear with the month
		var baseUrlYearMonth = baseUrlYear.concat(month, month1, hyphen);
		
		// storing the literals for the start day
		var day = startDate.charAt(0);
		var day1 = startDate.charAt(1);
		
		//combining the baseUrlYearMonth with the day
		var baseUrlYearMonthDay = baseUrlYearMonth.concat(day, day1, literalT);
		
		// storing the literals for the start hour, minute and second
		var hour = startDate.charAt(11);
		var hour1 = startDate.charAt(12);
		var minute = startDate.charAt(14);
		var minute1 = startDate.charAt(15);
		var seconds = "00";
		
		// combining the baseUrlYearMonthDay with hour, minute and second
		var baseUrlStartDate = baseUrlYearMonthDay.concat(hour, hour1, doublePoint, minute, minute1, doublePoint, seconds,literalZ , comma);
		// alert(baseUrlStartDate) should be https://envirocar.org/api/stable/tracks?during=YYYY-MM-DDTHH:MM:SSZ,
		
		//Getting the literals from the date-to box and start building the string for the endDate. Building the endDate follows the same schema used for building the startDate string
		var endYear = endDate.charAt(6);
		var endYear1 = endDate.charAt(7);
		var endYear2 = endDate.charAt(8);
		var endYear3 = endDate.charAt(9);
		
		var baseUrlEndDateYear = baseUrlStartDate.concat(endYear, endYear1, endYear2, endYear3,hyphen);
		
		var endMonth = endDate.charAt(3);
		var endMonth1 = endDate.charAt(4);
		
		var baseUrlEndDateYearMonth = baseUrlEndDateYear.concat(endMonth, endMonth1, hyphen);
		
		var endDay = endDate.charAt(0);
		var endDay1 = endDate.charAt(1);
		
		var baseUrlEndDateYearMonthDay = baseUrlEndDateYearMonth.concat(endDay, endDay1, literalT);
		
		var endHour = endDate.charAt(11);
		var endHour1 = endDate.charAt(12);
		var endMinute = endDate.charAt(14);
		var endMinute1 = endDate.charAt(15);
		var seconds = "00";
		
		//alert(baseUrlEndDate) should be https://envirocar.org/api/stable/tracks?during=YYYY-MM-DDTHH:MM:SSZ,YYYY-MM-DDTHH:MM:SSZ
		var baseUrlEndDate = baseUrlEndDateYearMonthDay.concat(endHour, endHour1, doublePoint, endMinute, endMinute1, doublePoint, seconds,literalZ);
		
		var requestUrlTemporal = baseUrlEndDate;
				
		// Requesting the temporal-filtered JSON File from the envirocar API with the use of the 		
		var json = (function () {
			var json = null;
			$.ajax({
				'async': false,
				'url': requestUrlTemporal,
				'dataType': "json",
				'beforeSend': function(){showProgressAnimation();},
				'complete': function(){hideProgressAnimation();},
				// If request succeeded the callback function stores the requested JSON to var = json 
				'success': function (data) {json = data;},
				'error': function(jqXHR, textStatus, errorThrown) {alert('Error ' + errorThrown);}

			});
			
			// returns the object
			return json;
		})();
			
		// stores the returned object in the variable JSONFile.
		var jsonTemporal = json;
		
		// Loops through the requested JSONFile and gets with the use of the trackID the additional information for all specified tracks					
		$.each(jsonTemporal.tracks, function (key, value) {
			trackURL = envirocarTrackUrl.concat(value.id);
			
			var json = (function () {
				var json = null;
				$.ajax({
					'async': false,
					'url': trackURL,
					'dataType': "json",
					// If request succeeded the callback function stores the requested JSON to var = json 
					'success': function (data) {json = data;},
					'error': function(jqXHR, textStatus, errorThrown) {alert('Error ' + errorThrown);}
				});
				
				// returns the object
				return json;
			})();
			
			// The requested JSON File is cast to a string
			var jsonTrackData = JSON.stringify(json);
			
			// The JSON File is now parsed and could be entered
			var jsonTrackDataObj = jQuery.parseJSON(jsonTrackData);
			
			// Text for the dropdown menu
            $("#trackSelectionList").append($('<option></option>').val(value.id).html(jsonTrackDataObj.properties.sensor.properties.manufacturer + " " + jsonTrackDataObj.properties.sensor.properties.model + " TrackID: " + value.id));
		});
		
		// onChange alert with more specific car data
		$('#trackSelectionList').change(function () {
			trackURL = envirocarTrackUrl.concat($(this).val());
			
			var json = (function () {
				var json = null;
				$.ajax({
					'async': false,
					// Requesting a local file due to the cross domain constrait explained above
					'url': trackURL,
					'dataType': "json",
					// If request succeeded the callback function stores the requested JSON to var = json 
					'success': function (data) {json = data;},
					'error': function(jqXHR, textStatus, errorThrown) {alert('Error ' + errorThrown);}
				});
				
				// returns the object
				return json;
			})();
			
			// The requested JSON File is cast to a string
			var jsonTrackData = JSON.stringify(json);
			
			// The JSON File is now parsed and could be entered
			var jsonTrackDataObj = jQuery.parseJSON(jsonTrackData);
			
			alert("Manufacturer: " + jsonTrackDataObj.properties.sensor.properties.manufacturer + "\n"
			+ "ModelType: " + jsonTrackDataObj.properties.sensor.properties.model + "\n"
			+ "FuelType: " + jsonTrackDataObj.properties.sensor.properties.fuelType + "\n"
			+ "ConstructionYear: " + jsonTrackDataObj.properties.sensor.properties.constructionYear);
		});
		
	}
	
	return requestUrlTemporal;
}
/*
 * getBBox() This method gets the tracks within the user specified bounding box by building string with the use of the bounding box coordinates contributed by the Google Maps API v3.
 * Afterwards it will query the envirocar API to get the tracks.
 * Additionally it is parsing the requested information, and the Car Model and track ID is displayed in the trackSelectionList element. 
 * On change an alert will appear which displays additional information.
 * 
 * This method is NOT implemented.
 * 
 * @return JSON
 */

function getBBox() {
	
	// clears the dropdown trackSelectionList element
	$('#trackSelectionList').empty();
	
	// Get the coordinates of the BoundingBox
	pointNorthEast = rectangle.getBounds().getNorthEast();
	pointSouthWest = rectangle.getBounds().getSouthWest();
	
	// Store the x and y coordinates to a variable
	pointNorthEastX = pointNorthEast.lat();
	pointNorthEastY = pointNorthEast.lng();
	pointSouthWestX = pointSouthWest.lat();
	pointSouthWestY = pointSouthWest.lng();
	
	
	var BBoxUrl = baseUrlBBox.concat(pointSouthWestY, comma, pointSouthWestX, comma, pointNorthEastY, comma, pointNorthEastX);
	// alert(BBoxUrl) should look like this: https://envirocar.org/api/dev/tracks?bbox=7.559052,51.915829,7.684022,51.993903
	
	// Requesting the spatial-filtered JSON File from the envirocar API with the use of the 
	var json = (function () {
			var json = null;
			$.ajax({
				'async': false,
				'url': BBoxUrl,
				'dataType': "json",
				// If request succeeded the callback function stores the requested JSON to var = json 
				'success': function (data) {json = data;},
				'error': function(jqXHR, textStatus, errorThrown) {alert('Error ' + errorThrown);}
			});
			
			// returns the object
			return json;
		})();
		
		// stores the returned object in the variable jsonBBoxTracks.
		var jsonBBoxTracks = json;
		
		// Loops through the requested JSON File and gets with the use of the trackID the additional information for all specified tracks	
		$.each(jsonBBoxTracks.tracks, function (key, value) {
			trackUrl = envirocarTrackUrl.concat(value.id);
			
			var json = (function () {
				var json = null;
				$.ajax({
					'async': false,
					'url': trackUrl,
					'dataType': "json",
					// If request succeeded the callback function stores the requested JSON to var = json 
					'success': function (data) {json = data;},
					'error': function(jqXHR, textStatus, errorThrown) {alert('Error ' + errorThrown);}
				});
				
				// returns the object
				return json;
			})();
			
			// The requested JSON File is cast to a string
			var jsonTrackData = JSON.stringify(json);
			
			// The JSON File is now parsed and could be entered
			var jsonTrackDataObj = jQuery.parseJSON(jsonTrackData);
			
			// Text for the dropdown menu
            $("#trackSelectionList").append($('<option></option>').val(value.id).html(jsonTrackDataObj.properties.sensor.properties.manufacturer + " " + jsonTrackDataObj.properties.sensor.properties.model + " TrackID: " + value.id));
		});
		
		// onChange alert with more specific car data
		$('#trackSelectionList').change(function () {
			trackUrl = envirocarTrackUrl.concat($(this).val());
			
			var json = (function () {
				var json = null;
				$.ajax({
					'async': false,
					// Requesting a local file due to the cross domain constrait explained above
					'url': trackUrl,
					'dataType': "json",
					// If request succeeded the callback function stores the requested JSON to var = json 
					'success': function (data) {json = data;},
					'error': function(jqXHR, textStatus, errorThrown) {alert('Error ' + errorThrown);}
				});
				
				// returns the object
				return json;
			})();
			
			// The JSON File is now parsed and could be entered
			var jsonTrackData = JSON.stringify(json);
			
			// The requested JSON File is cast to a string
			var jsonTrackDataObj = jQuery.parseJSON(jsonTrackData);
			
			// If another element from the trackSelectionList is selected, an alert will popup embodying the information of the selected track
			alert("Manufacturer: " + jsonTrackDataObj.properties.sensor.properties.manufacturer + "\n"
			+ "ModelType: " + jsonTrackDataObj.properties.sensor.properties.model + "\n"
			+ "FuelType: " + jsonTrackDataObj.properties.sensor.properties.fuelType + "\n"
			+ "ConstructionYear: " + jsonTrackDataObj.properties.sensor.properties.constructionYear);
		});
	
		// return jsonBBoxTracks;	
}

/*
 * setRectangleActive() This method sets the global variable rectangleActive to true if the user has selected the spatial filtering.
 *
 */

function setRectangleActive() {
	
	rectangleActive = true;
	
}

/*
 * setRectangleNonActive() This method sets the global variable rectangleActive to false if the user has deselected the spatial filtering.
 *
 */

function setRectangleNonActive() {
	
	rectangleActive = false;

}

/*
 * getDT() This method is a modification of the getDateTime() method. It gets the values from the date-from and date-to element. These values are used for building the string in order to start a temporal query. 
 * It only builds the URL for the temporal filtering.
 * 
 * @return This method returns the requestUrlTemporal for a temporal query.
 */

function getDT() {
	
	// storing the value of the date-from and date-to element to a variable
	startDate = $('#date-from').val();
	endDate = $('#date-to').val();
	
	// Check if a start and end date is specifyed. If not the user gets an alert
	if (startDate == '' || endDate == '') {
		if (getParam('lang') == 'en') {
			alert('No start and / or end date selected');
		} else {
			alert('Kein Start- und / oder Endzeitpunkt ausgewählt');
		}
	} else {
		
		// Storing the value of the date-from box in a variable
		var startDate = $('#date-from').val();
		
		// Storing the value of the date-to box in a variable
		var endDate = $('#date-to').val();
		
		alert("Sie haben den Startzeitpunkt " + startDate + " und den Endzeitpunkt " + endDate + " ausgewählt.");
		
		// Getting the literals from the date-from box and start building the first part of the string
		// If used this unusual way to get the date and time because the functions contributed by the jQuery framework not worked properly for me
		
		// storing the literals for the start year
		var year = startDate.charAt(6);
		var year1 = startDate.charAt(7);
		var year2 = startDate.charAt(8);
		var year3 = startDate.charAt(9);

		// combining the baseUrl with the year		
		var baseUrlYear = baseUrl.concat(year, year1, year2, year3,hyphen);
		
		// storing the literals for the start month
		var month = startDate.charAt(3);
		var month1 = startDate.charAt(4);
		
		// combining the baseUrlYear with the month
		var baseUrlYearMonth = baseUrlYear.concat(month, month1, hyphen);
		
		// storing the literals for the start day
		var day = startDate.charAt(0);
		var day1 = startDate.charAt(1);
		
		//combining the baseUrlYearMonth with the day
		var baseUrlYearMonthDay = baseUrlYearMonth.concat(day, day1, literalT);
		
		// storing the literals for the start hour, minute and second
		var hour = startDate.charAt(11);
		var hour1 = startDate.charAt(12);
		var minute = startDate.charAt(14);
		var minute1 = startDate.charAt(15);
		var seconds = "00";
		
		// combining the baseUrlYearMonthDay with hour, minute and second
		var baseUrlStartDate = baseUrlYearMonthDay.concat(hour, hour1, doublePoint, minute, minute1, doublePoint, seconds,literalZ , comma);
		//alert(baseUrlStartDate) should be https://envirocar.org/api/stable/tracks?during=YYYY-MM-DDTHH:MM:SSZ,
		
		//Getting the literals from the date-to box and start building the string for the endDate. Building the endDate follows the same schema used for building the startDate string
		var endYear = endDate.charAt(6);
		var endYear1 = endDate.charAt(7);
		var endYear2 = endDate.charAt(8);
		var endYear3 = endDate.charAt(9);
		
		var baseUrlEndDateYear = baseUrlStartDate.concat(endYear, endYear1, endYear2, endYear3,hyphen);
		
		var endMonth = endDate.charAt(3);
		var endMonth1 = endDate.charAt(4);
		
		var baseUrlEndDateYearMonth = baseUrlEndDateYear.concat(endMonth, endMonth1, hyphen);
		
		var endDay = endDate.charAt(0);
		var endDay1 = endDate.charAt(1);
		
		var baseUrlEndDateYearMonthDay = baseUrlEndDateYearMonth.concat(endDay, endDay1, literalT);
		
		var endHour = endDate.charAt(11);
		var endHour1 = endDate.charAt(12);
		var endMinute = endDate.charAt(14);
		var endMinute1 = endDate.charAt(15);
		var seconds = "00";
		
		var requestUrlTemporal = baseUrlEndDateYearMonthDay.concat(endHour, endHour1, doublePoint, endMinute, endMinute1, doublePoint, seconds,literalZ);
		//alert(requestUrlTemporal) should be https://envirocar.org/api/stable/tracks?during=YYYY-MM-DDTHH:MM:SSZ,YYYY-MM-DDTHH:MM:SSZ
		
		return requestUrlTemporal;
	
	}

}

/*
 * getBB() This method is a modification of getBBox(). This function gets the tracks within the user specified bounding box by building string with the use of the bounding box coordinates contributed by the Google Maps API v3.
 * It only builds a string containing the BoundingBox coordinates used for the spatial filtering.
 * 
 * @return String containing the coordinates from the user-specified BoundingBox
 * 
 */

function getBB() {
	
	// Get the coordinates of the BoundingBox
	pointNorthEast = rectangle.getBounds().getNorthEast();
	pointSouthWest = rectangle.getBounds().getSouthWest();
	
	// Store the x and y coordinates to a variable
	pointNorthEastX = pointNorthEast.lat();
	pointNorthEastY = pointNorthEast.lng();
	pointSouthWestX = pointSouthWest.lat();
	pointSouthWestY = pointSouthWest.lng();
	
	
	var coordBBox = pointSouthWestY + comma + pointSouthWestX + comma +pointNorthEastY + comma + pointNorthEastX;
	// alert(coordBBox) should look like https://envirocar.org/api/dev/tracks?bbox=7.559052,51.915829,7.684022,51.993903
	
	return coordBBox;
}

/*
 * getDateTimeBBox() This function is called by clicking on the "Daten abrufen / Select Time" button. First this function will check what type of filtering the user wants to use (solved by using a if-clause).
 * Afterwards it will call the getDT() and getBB() methods in order to create a string for the temporal-,spatial- or temporal-spatial- filter. 
 * 
 * @return dateTimeUrl, BBUrl, dateTimeBBoxUrl strings containing the URL which is used to query the envirocar API
 * 
 */

function getDateTimeBBox() {
	
	// Storing the value of the date-from and date-to element in a string
	startDate = $('#date-from').val();
	endDate = $('#date-to').val();
	
	// check if the user wants to perform a temporal-spatial filtering
	if(startDate != '' && endDate != '' && rectangleActive == true) {
		
	// calling getDT() in order to get the URL String for the temporal filter	
	var dateTimeUrl = getDT();
	// calling getBB() in order to get the bounding box coordinates
	var BBoxString = getBB();
	
	// creating the URL for the query
	var dateTimeBBoxUrl = dateTimeUrl + BBoxPrefix + BBoxString;
	
	// alert(dateTimeBBoxUrl);
	
	query = new Query();
	
	var inputUrl = dateTimeBBoxUrl;
	
	measurements = query.getMeasurements(inputUrl);
	
	redrawData();
	
		
	// check if the user wants to perform a temporal filtering	
	}else if(startDate != '' && endDate != '' && rectangleActive == false){
		
		// calling getDT() in order to get the URL string for the temporal filter
		var dateTimeUrl = getDT();
		
		// alert(dateTimeUrl);
		
		query = new Query();
	
		var inputUrl = dateTimeUrl;
		
		measurements = query.getMeasurements(inputUrl);
	
		redrawData();
		
	// check if the user wants to perform a spatial filtering
	}else if(startDate == '' && endDate == '' && rectangleActive == true) {
		
		// calling getBB() in order to get the bounding box coordiantes
		var BBoxString = getBB();
		
		var BBUrl = baseUrlBBox + BBoxString;
		
		// alert(BBUrl);
		
		query = new Query();
	
		var inputUrl = BBUrl;
		
		measurements = query.getMeasurements(inputUrl);
	
		redrawData();
	}
	
	
	
}

/*
 * getlatestTracks() This function builds a URL String containing the information to query the last measured 24 hours. It gets the JSON from the envirocar API containing all Tracks, stores the track ID of the
 * last measured track, using this track id, it gets the additional information about this track and therefore the time, too. The time is cast to a JS Date Object and 24hours are subtracted. Afterwards the
 * Date Object is cast to string and stored in a var. At least a URL string is build containing the information to a query the envirocar API in order to get the last measured 24 hours.
 * 
 * @return latest24H String stored in a var containing the information to a query the envirocar API in order to get the last measured 24 hours
 * 
 */

function getLatestTracks() {
	
	
	// getting latest 100 tracks from the envirocar API as JSON
	var json = (function () {
		var json = null;
		$.ajax({
			'async': false,
			// only requesting tracks within Northrhine-Westfalia
			'url': "https://envirocar.org/api/dev/tracks?bbox=5.472512722,49.200289241,10.4920501709,52.7186795024",
			'dataType': "json",
			// If request succeeded the callback function stores the requested JSON to var = json 
			'success': function (data) {json = data;},
			'error': function(jqXHR, textStatus, errorThrown) {alert('Error ' + errorThrown);}
		});
				
				// returns the object
		return json;
	})();
	
	// casting the object to a string
	var envirocarLatestTracks = JSON.stringify(json);
	
	// parsing the JSON object
	var envirocarTracksLatestObj = jQuery.parseJSON(envirocarLatestTracks);
	
	// getting the track ID from the zeroth track
	var trackId = JSON.stringify(envirocarTracksLatestObj.tracks[0].id);
	
	// building the URL to query the specific track information
	var trackIdUrl = envirocarTrackUrl + trackId.slice(1,25);
	
	// getting the specific track information in order to get the date and time of the track
	var json = (function () {
		var json = null;
		$.ajax({
			'async': false,
			'url': trackIdUrl,
			'dataType': "json",
			// If request succeeded the callback function stores the requested JSON to var = json 
			'success': function (data) {json = data;},
			'error': function(jqXHR, textStatus, errorThrown) {alert('Error ' + errorThrown);}
		});
				
				// returns the object
		return json;
	})();
	
	// casting the object to a string	
	var trackInformation = JSON.stringify(json);
	
	// parsing the JSON object
	var trackObj = jQuery.parseJSON(trackInformation);

	// storing the start time in a variable
	var trackStartTime = JSON.stringify(trackObj.features[0].properties.time);
	
	// getting the date of the track by slicing the year, month and day information
	trackStartTime = trackStartTime.slice(1,21);
	
	// creating a JS date object
	var trackStartTimeDateFormat = new Date(trackStartTime);
	
	// trackStartTimeDateFormat - 24 hours
	trackStartTimeDateFormat.setHours(trackStartTimeDateFormat.getHours() - 24);
	
	// casting the JS date object to a string
	var lastDateMinus24 = jQuery.datepicker.formatDate('yy-mm-dd',trackStartTimeDateFormat);
	
	// adding the hours, minutes and seconds to the date
	var trackStartTimeMinus24 = lastDateMinus24 + trackStartTime.slice(10,21);
	
	// alert("trackstart " + trackStartTime + "\n" + "trackende " + trackStartDateMinusDay);
	
	// combining the baseUrl with the calculated date and the real trackStartTime
	var latest24H = baseUrl + trackStartTimeMinus24 + comma + trackStartTime;
	
	return latest24H;

}
